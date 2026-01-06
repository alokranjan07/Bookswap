import {Router} from 'express'
import {
registerUser,
getUser,
loginUser,
logoutUser ,

} from '../controllers/auth.controller.js'

const router=Router()

router.route("/login").post(loginUser)
router.route("/register").post(registerUser)
router.route("/me").get(getUser)
router.route("/logout").post(logoutUser)

export default router;