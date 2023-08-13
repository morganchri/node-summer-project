import mongoose from "mongoose";
import usersSchema from "./user-schema.js";
const usersModel = mongoose.model("Users", usersSchema);
export default usersModel;