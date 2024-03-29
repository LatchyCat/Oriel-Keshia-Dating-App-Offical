// routes/user.routes.js

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
  createOrUpdateProfile,
  createMatchRequest,
  readAllUserEmails,
} from "../controllers/user.controllers.js";

const router = Router();

// Landing Page
router.route('/').get(readAllUsers);
router.route('/expert');

// User Registration
router.route('/register').post(registerUser).get(readAllUsers)

// User Login
router.route('/login').post(login).get(readOneUser);

// Profile Creation or Update
router.route("/profile/:userId").post(createOrUpdateProfile)
router.route("/profile").post(createOrUpdateProfile).get(createOrUpdateProfile).get(readOneUser);

// Security Key Hint
router.route('/security_hint').get(getSecurityKeyHint);

// Match Requests
router.route('/match-request/:userId').post(createMatchRequest);

// Other User Operations
router.route('/users').get(readAllUsers).post(createUser);
router.route('/users/emails').get(readAllUserEmails).get(readAllUsers)
router.route('/edit').put(createOrUpdateProfile).post(createOrUpdateProfile).get(readOneUser);
router.route('/delete/:userId').delete(deleteOneUser);
router.route('/dashboard').get(readAllUsers).get(readOneUser).delete(deleteOneUser);
router.route('/send-match-request/:userId').get(readAllUsers).get(readOneUser).delete(deleteOneUser);
router.route('/delete-match/userId').get(readAllUsers).get(readOneUser).delete(deleteOneUser);


export default router;
