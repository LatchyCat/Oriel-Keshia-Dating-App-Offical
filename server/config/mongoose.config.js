import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
import coolDesign from "../emojis/emojisFunc.js";

async function dbConnect() {
  try {
    await connect(MONGODB_URI, {
      dbName: "lowered_expectationsDB",
    });
    console.log(
      "Pinged your deployment, and and instance was successfully create & connected to MongoDB!\n BasedGod"
    );
    console.log("Server is successfully launched and operational!\n");
    console.log("Port: 8000 / Dev Mode Activated");
    coolDesign();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export default dbConnect;
