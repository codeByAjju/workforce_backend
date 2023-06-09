import express from 'express';
import models from './models'
import routes from './routes';
import bodyParser from 'body-parser';
export default class Bootstrap {
  constructor(app) {
    this.app = app;
    this.connectDb();
    this.middleware();
    this.routes();
    this.start();
    
  }
  connectDb() {
    const { sequelize } = models;
    sequelize.authenticate()
      .then(async () => {
        console.log('Database connected successfully');
        await sequelize.sync()
          .then(() => {
            console.log('Database sync successfully');
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  start() {
    const { app } = this;
    app.listen(process.env.PORT, () => {
      console.log('Server started');
    });
  }
  middleware() {
    const { app } = this;
    app.use(bodyParser.urlencoded({ extended: false, }),);
    app.use(bodyParser.json({ limit: '2000mb' }));
    app.use('/assets', express.static(`${__dirname}/uploads`));
    app.use('/images', express.static(`${__dirname}/images`));
    app.use('/public', express.static(`${__dirname}/../public`));
  }

  routes() {
    routes(this.app);
  }

}
