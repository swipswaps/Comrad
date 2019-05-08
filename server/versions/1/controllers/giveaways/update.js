const db = require('../../models');

function update(req, res) {
  db.Giveaway.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then(dbGiveaway => res.json(dbGiveaway))
    .catch(err => res.status(422).json(err));
}

module.exports = update;
