const router = require('express').Router();
const { usersController } = require('../controllers');
const { requireAC } = require('../middlewares');

router.route('/').get(requireAC('Users', 'readAny'), usersController.findAll);

if (process.env.SHOW_DEVELOPMENT_SIGN_UP) {
  router.route('/').post(usersController.create);
} else {
  router
    .route('/')
    .post(requireAC('Users', 'createAny'), usersController.create);
}

router
  .route('/api-key/create')
  .put(requireAC('Users', 'createAny'), usersController.createApiKey);

router
  .route('/api-key/delete')
  .put(requireAC('Users', 'createAny'), usersController.removeApiKey);

router
  .route('/can-delete')
  .get(requireAC('Users', 'readAny'), usersController.canDelete);

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
  .get(requireAC('Users', 'readOwn'), usersController.findById)
  .put(requireAC('Users', 'updateOwn'), usersController.update)
  .delete(requireAC('Users', 'deleteAny'), usersController.remove);

module.exports = router;
