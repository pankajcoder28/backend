const {Router} = require('express')
const upload = require('../middlewares/song.middleware')
const songController = require('../controllers/song.controller')

const router = Router()

router.post('/',upload.single('song'),songController.uploadSong)

router.get('/',songController.getSong)

module.exports = router