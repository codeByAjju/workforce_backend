import user from './user';
import media from './media'
import HttpStatus from 'http-status';
import { Router } from "express";

const router=Router();

const register = (app) => {
    app.use(router);
    router.use('/api',[user,media]);
    app.use((req, res, next) => {
      const error = new Error('Not Found');
      error.status = HttpStatus.NOT_FOUND;
      res.status(error.status).json({
        success: false,
        data: null,
        error,
        message: error.message,
      });
    });
  };
  export default register;
  