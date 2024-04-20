const express = require('express')
const router = express.Router()

const stuffCtrl = require('../controllers/stuff')

const auth = require('../middleware/auth');
const multer = require('../middleware/muter-config');

router.get('/',auth , stuffCtrl.getAllThings);
router.post('/',auth ,multer ,stuffCtrl.createThing)
router.get('/:id',auth , stuffCtrl.getOneThing)
router.put('/:id',auth ,multer ,stuffCtrl.updateOneThing)
router.delete('/:id',auth ,stuffCtrl.deleteOneThing )


module.exports = router