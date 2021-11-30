const express = require ('express')
const router = express.Router();
const stuffCtrl = require ('../controllers/stuff')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.get('/', stuffCtrl.getThings);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.post('/', multer, stuffCtrl.createThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing );
router.delete('/:id', stuffCtrl.deleteThing);

module.exports = router;