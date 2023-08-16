import mongoose from "mongoose";
import likesSchema from "./likes-schema.js";
const likesModel = mongoose.model("Likes", likesSchema);
export default likesModel;