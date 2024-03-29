import { Router } from "express";
import {
  createUser,
  readAllUsers,
  updateOneUser,
  readOneUser,
  deleteOneUser,
  login,
  getSecurityKeyHint,
  registerUser,
  createProfile,
} from "../controllers/user.controllers.js";

const router = Router();

// Landing Page
router.route('/').get(readAllUsers);
router.route('/expert');

// User Registration
router.route('/register').post(registerUser).get(readAllUsers)

// User Login
router.route('/login').post(login).get(readOneUser)

// Profile Creation
router.route("/profile/:userId").post(createProfile);

// Security Key Hint
router.route('/security_hint').get(getSecurityKeyHint);

// Other User Operations
router.route('/users').get(readAllUsers).post(createUser);
router.route('/edit').get(readOneUser).put(updateOneUser);
router.route('/delete/:userId').delete(deleteOneUser);
router.route('/dashboard').get(readAllUsers);

export default router;
