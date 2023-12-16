import Router from "express";
import {
  addStudent,
  deleteUser,
  disableStudent,
  enableStudent,
  getAllStudent,
  getSingleStudent,
  updateStudent,
} from "../controllers/student.controllers.js";

const router = Router();

router.route("/").post(addStudent).get(getAllStudent);
router
  .route("/:id")
  .get(getSingleStudent)
  .put(updateStudent)
  .delete(deleteUser);
router.route("/dis/:id").put(disableStudent);
router.route("/ena/:id").put(enableStudent);

export default router;
