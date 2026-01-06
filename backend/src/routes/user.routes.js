import {Router} from 'express'
import {
     
     addLocation,
      updateName,
       updateProfilePic,
       updatePhone

 
} from '../controllers/user.controller.js'
import {AuthMiddleware} from '../middlewares/auth.middleware.js'

const router=Router();
router.route("/me/profilepic").patch(AuthMiddleware,updateProfilePic)
router.route("/me/location").patch(AuthMiddleware,addLocation)
router.route("/me/name").patch(AuthMiddleware,updateName)
router.route("/me/phone").patch(AuthMiddleware,updatePhone)

export default router

