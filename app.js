import express from 'express';
import UsersController from "./controllers/users/users-controller.js";
import cors from 'cors'
import session from "express-session";
import mongoose from "mongoose";
import AuthController from "./controllers/users/auth-controller.js";
import LikesRoutes from "./controllers/likes/Routes.js";
import "dotenv/config"
import userRoutes from "./controllers/user-to-user/UserRoutes.js";

const app = express();

const CONNECTION_STRING = process.env.CONNECT_DB;
mongoose.connect(CONNECTION_STRING);

app.use(express.json());

app.use(
	cors({
			 credentials: true,
			 origin: [process.env.FRONTEND_URL_LOCAL, process.env.FRONTEND_URL]
		 })
);

const sessionOptions = {
	secret: "any string",
	resave: false,
	saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
	sessionOptions.proxy = true;
	sessionOptions.cookie = {
		sameSite: "none",
		secure: true,
	};
}
app.use(session(sessionOptions));

UsersController(app);
AuthController(app);
LikesRoutes(app);
userRoutes(app);
const port = process.env.PORT || 4000;
app.listen(port)
