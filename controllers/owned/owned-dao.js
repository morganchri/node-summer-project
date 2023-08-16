import ownedModel from "./owned-model.js";

export const getOwned = (userID) => ownedModel.findOne({user: userID});

export const generateOwned = (user, owned) => ownedModel.create({user, owned});

export const addOrRemoveStock = (id, owned) => ownedModel.updateOne({_id: id}, {$set: owned});