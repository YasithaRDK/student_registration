import Router from "express";
import {
  enableClassroom,
  addClassroom,
  deleteClassroom,
  disableClassroom,
  getAllClassroom,
  getClassroom,
  updateClassroom,
} from "../controllers/classroom.controllers.js";

const router = Router();

router.route("/").post(addClassroom).get(getAllClassroom);
router
  .route("/:id")
  .get(getClassroom)
  .put(updateClassroom)
  .delete(deleteClassroom);
router.route("/dis/:id").put(disableClassroom);
router.route("/ena/:id").put(enableClassroom);

export default router;
