const router = require('express').Router();
const { usersController } = require('../controllers');
const { requireAC } = require('../middlewares');

router
  .route('/')
  .get(requireAC('Users', 'readAny'), usersController.findAll)
  .post(requireAC('Users', 'createAny'), usersController.create);

router
  .route('/api-key')
  .post(requireAC('Users', 'createAny'), usersController.createApiKey)
  .put(usersController.removeApiKey); //TODO: check with Devin to see if this is correct

router
  .route('/random')
  .post(requireAC('Users', 'createAny'), usersController.randomUser);

router
  .route('/search')
  .get(requireAC('Users', 'readAny'), usersController.search);

router
  .route('/search-hosts')
  .get(requireAC('Hosts', 'readAny'), usersController.searchHosts);

router
  .route('/:id')
  .get(requireAC('Users', 'readAny'), usersController.findById)
  .put(requireAC('Users', 'updateAny'), usersController.update)
  .delete(requireAC('Users', 'deleteAny'), usersController.remove);

router
  .route('/:id/permission')
  .put(requireAC('Users', 'updateAny'), usersController.updatePermission);

module.exports = router;
