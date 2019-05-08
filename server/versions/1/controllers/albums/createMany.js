const db = require('../../models');

function createMany(req, res) {
  db.Album.insertMany(req.body)
    .then(dbAlbum => res.json(dbAlbum))
    .catch(err => res.status(422).json(err));
}

module.exports = createMany;
