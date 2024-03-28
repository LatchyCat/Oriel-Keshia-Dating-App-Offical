import { Router } from "express";
import {
  createUser,
  deleteOneUser,
  readAllUsers,
  readOneUser,
  updateOneUser,
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/users").get(readAllUsers).post(createUser);

router
  .route("/users/:id")
  .get(readOneUser)
  .put(updateOneUser)
  .delete(deleteOneUser);

// router.route("/show/:id").get(readOneUser).delete(deleteOneUser);

export default router;
