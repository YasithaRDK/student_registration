import Router from "express";
import {
  addAllocateClassroom,
  deleteAllocateClassroom,
  getAllAllocateClassroom,
} from "../controllers/allocateClassroom.controllers.js";

const router = Router();

router.route("/").post(addAllocateClassroom).get(getAllAllocateClassroom);
router.route("/:id").delete(deleteAllocateClassroom);

export default router;
