/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Library:
 *       type: object
 *       required: [name,type]
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the artist, album or track
 *         resource:
 *           type: string
 *           description: The resource (Library, Playlists, etc.) to grant permissions to
 *         artist:
 *           type: string
 *           format: id
 *           description: Used by albums. The ID of the artist associated with the album.
 *         label:
 *           type: string
 *           description: Used by albums. The label that released the album
 *         genre:
 *           type: string
 *           format: id
 *           description: Used by albums. The genre of the album.
 *         compilation:
 *           type: boolean
 *           description: Used by albums. Whether or not the album is a compilation that was not released by a specific artist (such as a film soundtrack)
 *         album:
 *           type: string
 *           format: id
 *           description: Used by tracks. The album containing the track.
 *         artists:
 *           type: array
 *           items:
 *             type: string
 *             format: id
 *           description: "Used by tracks. The artists credited with the track (the order of the array matters: the artists will be displayed in that order)"
 *         track_number:
 *           type: integer
 *           description: Used by tracks. The track number in the track listing on the album's disc
 *         disk_number:
 *           type: integer
 *           description: Used by tracks. The disk number of the track within the album.
 *         duration_in_seconds:
 *           type: integer
 *           description: Used by tracks. The duration of the song, in seconds
 *       example:
 *         - type: album
 *           name: Flamenco On Fire
 *           artist: 5f35a3e7783e63454ccde9db
 *           label: null
 *           genre: null
 *           compilation: false
 *         - type: artist
 *           name: Sabicas
 *         - type: track
 *           artists:
 *           - 5f35a3e7783e63454ccde9db
 *           name: Fantasia Inca
 *           album: 5f35a495783e63454cd19670
 *           track_number: 4
 *           disk_number: 1
 *           duration_in_seconds: 237
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const keys = require('../config/keys');

//
// The model for artists, albums and tracks is combined into one entity so
// we can run a full-text search across the entire model
//

const librarySchema = new Schema(
  {
    // properties used by artists, albums and tracks

    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ['artist', 'album', 'track'],
      required: true,
    },

    popularity: {
      // ranges from 0-100, with 100 being most popular
      type: Number,
      default: 0,
    },

    custom: Schema.Types.Mixed, // this will be an object that can contain any number of custom properties

    created_at: {
      type: Date,
      default: Date.now,
    },

    updated_at: {
      type: Date,
      default: Date.now,
    },

    // properties used by albums
    artist: {
      type: Schema.Types.ObjectId,
      ref: 'Library',
    },

    label: {
      type: String,
    },

    genre: {
      type: Schema.Types.ObjectId,
      ref: 'Genre',
    },

    compilation: {
      type: Boolean,
    },

    // properties used by tracks

    album: {
      type: Schema.Types.ObjectId,
      ref: 'Library',
    },

    artists: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Library',
        },
      ],
      default: undefined,
    },

    track_number: {
      type: Number,
    },

    disk_number: {
      type: Number,
    },

    duration_in_seconds: {
      type: Number,
    },
  },
  { collection: 'library' },
);

// check if any additional keys should be included in the text index
let textIndex = { name: 'text' };
if ('album' in keys.modelCustomFields) {
  let fieldsForCustomIndex = keys.modelCustomFields.album.filter(
    a => a.includeInTextIndex,
  );
  fieldsForCustomIndex.forEach(a => {
    textIndex['custom.' + a.name] = 'text';
  });
}

librarySchema
  .index({ type: 1, updated_at: -1 }, { background: true })
  .index(textIndex, { background: true })
  .index({ artist: 1 }, { background: true })
  .index({ artists: 1 }, { background: true })
  .index({ album: 1, disk_number: 1, track_number: 1 }, { background: true })
  .index({ updated_at: -1 }, { background: true });

const Library = mongoose.model('Library', librarySchema);

module.exports = Library;
