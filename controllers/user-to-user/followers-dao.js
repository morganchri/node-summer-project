import followersModel from "./followers-model.js";

export const getFollowing = (followerID) => followersModel.find({follower: followerID}).populate("followed");

export const getFollowers = (followingID) => followersModel.find({followed: followingID}).populate("follower");

export const getFollow = (followerID, followedID) => followersModel.find({$and: [{follower: followerID}, {followed: followedID}]});

export const followUser = (followerID, followingID) => followersModel.create({follower: followerID, followed: followingID});

