import express from 'express'
import { authenticateSeller } from '../middlewares/auth.middleware.js '
import { createProduct, getAllProduct, getSellerProduct , getProductDetails} from '../controllers/product.controller.js'
import multer from 'multer'

const upload = multer({
    storage: multer.memoryStorage(),
    limits:{
        fileSize: 5 * 1024 * 1024
    }
})

const router = express.Router()

router.post('/',authenticateSeller,upload.array('images',7),createProduct)

router.get('/getproduct',authenticateSeller,getSellerProduct)
router.get('/',getAllProduct)
router.get('/detail/:id',getProductDetails)

export default router