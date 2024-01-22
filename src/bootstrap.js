import express from "express";
import models from "./models";
import routes from "./routes";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
export default class Bootstrap {
  constructor(app) {
    this.app = app;
    this.connectDb();
    this.middleware();
    this.routes();
    this.start();
  }
  middleware() {
    const { app } = this;
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, "public")));
  }
  connectDb() {
    const { sequelize } = models;
    sequelize
      .authenticate()
      .then(async () => {
        console.log("Database connected successfully");
        await sequelize
          .sync()
          .then(() => {
            console.log("Database sync successfully");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  routes() {
    routes(this.app);
  }

  start() {
    const { app } = this;
    app.listen(process.env.PORT, () => {
      console.log("Server started at :", process.env.PORT);
    });
  }
}
