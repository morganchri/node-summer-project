import * as followerDao from "./followers-dao.js"
import {getFollow} from "./followers-dao.js";

function userRoutes(app) {

	const getFollowers = async (req,res) => {
		const followed = req.params.userId;
		const followers = await followerDao.getFollowers(followed);
		res.json(followers);
	}

	const getFollowing = async (req,res) => {
		const follower = req.params.userId;
		const followed = await followerDao.getFollowing(follower);
		res.json(followed);
	}

	const getFollow = async (req, res) => {
		const currentUser = req.session.currentUser;
		if (!currentUser) {
			res.sendStatus(401);
			return;
		}
		const followerID = currentUser._id;
		// console.log(followerID);
		const followedID = req.params.userId;
		// console.log(followedID);

		const following = await followerDao.getFollow(followerID, followedID);

		if (!following) {
			res.sendStatus(420);
			return;
		}

		res.json(following);

	}

	const userFollowsUser = async (req, res) => {
		const currentUser = req.session.currentUser;
		if (!currentUser) {
			res.sendStatus(401);
			return;
		}
		const followerID = currentUser._id;
		// console.log(followerID);
		const followedID = req.params.followed;
		// console.log(followedID);

		const following = await followerDao.getFollow(followerID, followedID);
		// console.log("Following");
		// console.log(following);

		if (following.length > 0) {
			res.sendStatus(420);
			return;
		}

		const follow = await followerDao.followUser(followerID, followedID);
		res.json(follow);
	}

	app.post("/api/follow/:followed", userFollowsUser);
	app.get("/api/users/:userId/following", getFollowing);
	app.get("/api/users/:userId/followers", getFollowers);
	app.get("/api/users/:userId/follows", getFollow)
}

export default userRoutes;