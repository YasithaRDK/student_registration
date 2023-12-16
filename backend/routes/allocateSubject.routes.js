import Router from "express";
import {
  addAllocateSubject,
  deleteAllocateSubject,
  getAllAllocateSubject,
  getAllocateSubject,
  updateAllocateSubject,
} from "../controllers/allocateSubject.controllers.js";

const router = Router();

router.route("/").post(addAllocateSubject).get(getAllAllocateSubject);
router
  .route("/:id")
  .get(getAllocateSubject)
  .put(updateAllocateSubject)
  .delete(deleteAllocateSubject);

export default router;
