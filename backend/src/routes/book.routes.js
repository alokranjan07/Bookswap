import {Router} from 'express'
import {
  addBook ,
  deleteBook,
  getBook ,
  updateBookById ,
 

} from '../controllers/book.controller.js'
const router=Router()

router.route("/mybooks").get(getBook)
router.route("/deletebook").post(deleteBook)
router.route("/addBook").post(addBook)
router.route("/updateBook").put(updateBookById)


export default router;