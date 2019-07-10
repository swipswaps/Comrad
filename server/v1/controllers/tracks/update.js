const db = require('../../models');
const { validateEditData } = require('./utils');

function update(req, res) {
  validateEditData(req.body)
    .then(() =>
      db.Track.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
      })
        .populate('artists')
        .populate('album'),
    )

    .then(dbTrack => res.json(dbTrack))
    .catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = update;
