import * as likesDao from "./likes-dao.js"
import * as ownedDao from "../owned/owned-dao.js";

function LikesRoutes(app) {
	const userLikesStock = async (req, res) => {
		const currentUser = req.session.currentUser;
		if (!currentUser) {
			res.sendStatus(401);
			return;
		}
		const userID = currentUser._id;
		// console.log("UserID")
		// console.log(userID);
		const stockTicker = req.params["stockTicker"];
		// console.log("Ticker");
		// console.log(req.params)

		const likes = await likesDao.getStock(userID, stockTicker);
		console.log("Already Liked")
		console.log(likes)
		if (likes) {
			res.sendStatus(200);
			return;
		}
		await likesDao.likeStock(userID, stockTicker);
	}

	const userBuysStock = async (req, res) => {
		const currentUser = req.session.currentUser;
		if (!currentUser) {
			res.sendStatus(401);
			return;
		}
		const userID = currentUser._id;
		console.log("BUY PARAMETERS")
		console.log(req.params)
		const stockTicker = req.params["stockTicker"];

		let owned = await ownedDao.getOwned(userID);

		if (!owned) {
			await ownedDao.generateOwned(userID, {[stockTicker]: 1});
			return;
		}
		if (owned.owned) {
			if (owned.owned[stockTicker] >= 0) {
				owned.owned[stockTicker] += 1;
				// console.log("Owned Stocks");
				// console.log(owned);
				await ownedDao.addOrRemoveStock(owned._id, owned);
				return;
			}
			// console.log("Owned Stocks");
			// console.log(owned);
			owned.owned = {...owned.owned, [stockTicker]: 1}
			await ownedDao.addOrRemoveStock(owned._id, owned);
		}
	}

	const userSellsStock = async (req, res) => {
		const currentUser = req.session.currentUser;
		// console.log("User");
		// console.log(currentUser);
		if (!currentUser) {
			res.sendStatus(401);
			return;
		}
		const userID = currentUser._id;
		const stockTicker = req.params["stockTicker"];

		let owned = await ownedDao.getOwned(userID);

		if (!owned) {
			res.sendStatus(420);
			return;
		}
		if (owned.owned[stockTicker] > 0) {
			owned.owned[stockTicker] -= 1;
		}
		// console.log("Owned");
		// console.log(owned.owned[stockTicker]);
		await ownedDao.addOrRemoveStock(owned._id, owned);
	}

	const getOwnedStocks = async (req, res) => {
		const userID = req.params.uid;
		// console.log(userID)
		if (!userID) {
			res.sendStatus(401);
			return;
		}
		let owned = await ownedDao.getOwned(userID);
		// console.log("Owned");
		// console.log(owned);
		res.json(owned);
	}

	const getAllLikes = async (req, res) => {
		const userID = req.params.uid;
		// console.log(userID);
		if (!userID) {
			res.sendStatus(401);
			return;
		}
		let likes = await likesDao.getAllStocks();
		// console.log(likes)
		if (!likes) {
			res.sendStatus(403);
			return;
		}
		// console.log("Likes");
		// console.log(likes);
		res.json(likes);
	}

	const getOwners = async (req, res) => {
		const ticker = req.params.stockTicker;
		if (!ticker) {
			res.sendStatus(401);
			return;
		}
		const stocks = await ownedDao.getAllOwned();
		// console.log("All owned")
		// console.log(stocks)
		let owners = [];
		for (let i=0;i<stocks.length;i++){
			if (stocks[i].owned[ticker] && stocks[i].owned[ticker] !== 0) {
				// console.log(stocks[i]._id)
				owners.push(stocks[i].user)
			}
		}
		res.json(owners)
	}

	app.post("/api/likes/like/:stockTicker", userLikesStock);
	app.post("/api/owned/buy/:stockTicker", userBuysStock);
	app.post("/api/owned/sell/:stockTicker", userSellsStock);
	app.get("/api/owned/:uid/get", getOwnedStocks);
	app.get("/api/likes/:uid/get", getAllLikes);
	app.get("/api/owned/get/:stockTicker", getOwners);
}

export default LikesRoutes;
