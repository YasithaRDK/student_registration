import Router from "express";
import {
  addSubject,
  deleteSubject,
  disableSubject,
  enableSubject,
  getAllSubject,
  getSubject,
  updateSubject,
} from "../controllers/subject.controller.js";

const router = Router();

router.route("/").post(addSubject).get(getAllSubject);
router.route("/:id").get(getSubject).put(updateSubject).delete(deleteSubject);
router.route("/dis/:id").put(disableSubject);
router.route("/ena/:id").put(enableSubject);

export default router;
