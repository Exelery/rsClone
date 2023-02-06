/* eslint-disable no-undef */
import express from "express";
import { config } from "dotenv";
import passport from "passport";
import { routes } from "./router/routes.js";
import { jwtPass } from "./middleware/passport.js";
config();

const PORT = process.env.PORT;
const app = express();

const start = async () => {
  try {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(passport.initialize());
    jwtPass(passport);
    routes(app);

    app.listen(PORT, () => {
      console.log(`App listen on port ${PORT}`)})
  } catch (e) {
    console.log(e);
  }
}

start()