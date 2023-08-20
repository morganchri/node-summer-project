import mongoose from "mongoose";

const followersSchema=  new mongoose.Schema({
												follower: {type: String, required: true},
												followed: {type: String, required: true}
											}, {collections: "Followers"});

export default followersSchema;