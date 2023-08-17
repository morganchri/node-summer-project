import likesModel from "./likes-model.js";

export const getStock = (userID, stockTicker) => likesModel.findOne({userID: userID, stockTicker: stockTicker});

export const getAllStocks = () => likesModel.find();

export const likeStock = (user, stockTicker) => likesModel.create({user, stockTicker});

export const unlikeStock = (userID, stockTicker) => likesModel.deleteOne({user: userID, stockTicker});