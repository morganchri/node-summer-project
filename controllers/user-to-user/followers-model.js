import mongoose from "mongoose";
import followersSchema from "./followers-schema.js";
const followersModel = mongoose.model("Followers", followersSchema);
export default followersModel;