import Router from "express";
import {
  enableTeacher,
  addTeacher,
  deleteTeacher,
  disableTeacher,
  getAllTeachers,
  getTeacher,
  updateTeacher,
} from "../controllers/teacher.controllers.js";

const router = Router();

router.route("/").post(addTeacher).get(getAllTeachers);
router.route("/:id").get(getTeacher).put(updateTeacher).delete(deleteTeacher);
router.route("/dis/:id").put(disableTeacher);
router.route("/ena/:id").put(enableTeacher);

export default router;
