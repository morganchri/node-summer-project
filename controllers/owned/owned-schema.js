import mongoose from "mongoose";

const ownedSchema = new mongoose.Schema({
											user: {type: String, required: true},
											owned: {type: Object, default: {}},
										}, {collections: "Owned"})

export default ownedSchema;