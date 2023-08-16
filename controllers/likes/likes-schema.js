import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
											user: {type: String, required: true},
											stockTicker: {type: String, required: true},
											stockName: String
										}, {collections: "Likes"})

export default likesSchema;
