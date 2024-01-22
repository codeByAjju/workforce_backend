import employee from './employee';
import media from './media'
import designation from "./designation"
import checkIn from "./checkIn"
import HttpStatus from 'http-status';
import { Router } from "express";

const router=Router();

const register = (app) => {
    app.use(router);
    router.use('/',[employee,media,designation,checkIn]);
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
  