import { Router } from "express";
import authUser from '../middleware/auth.middleware.js'
import { sendMessage,getChats,getMessages ,deleteChat} from "../controllers/chat.controller.js";

const chatRouter = Router()

chatRouter.post('/message',authUser,sendMessage)

chatRouter.get('/',authUser,getChats)

chatRouter.get('/:chatId/getmessage',authUser,getMessages)

chatRouter.post('/delete/:chatId',authUser,deleteChat)

export default chatRouter