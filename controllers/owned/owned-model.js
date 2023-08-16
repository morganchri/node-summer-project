import mongoose from "mongoose";
import ownedSchema from "./owned-schema.js";
const ownedModel = mongoose.model("Owned", ownedSchema);
export default ownedModel;