import {Router} from 'react-router-dom'
import { userRegister } from '../controllers/auth.controller.js'
import { registerValidate } from '../validators/auth.validator.js'

const router = Router()

router.post('/register',registerValidate,register)

export default router

