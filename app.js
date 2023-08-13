import express from 'express';
import UsersController from "./controllers/users/users-controller.js";
import cors from 'cors'
import session from "express-session";
import mongoose from "mongoose";
import AuthController from "./controllers/users/auth-controller.js";
import "dotenv/config"

const app = express();

const CONNECTION_STRING = process.env.CONNECT_DB || 'mongodb://127.0.0.1:27017/database';
mongoose.connect(CONNECTION_STRING);

app.use(express.json());

app.use(
	cors({
			 credentials: true,
			 origin: process.env.FRONT_URL_LOCAL
		 })
);

const sessionOptions = {
	secret: "any string",
	resave: false,
	saveUninitialized: false,
};
app.use(
	session(sessionOptions)
);

UsersController(app);
AuthController(app);
const port = process.env.PORT || 4000;
app.listen(port)
