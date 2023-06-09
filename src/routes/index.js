import user from './user';
import HttpStatus from 'http-status';
import { Router } from "express";

const router=Router();

const register = (app) => {
    app.use(router);
    router.use('/api',[user]);
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
  
      // app.use((error, req, res, next) => {
      //   const internalError = HttpStatus.INTERNAL_SERVER_ERROR;
      //   if (error) {
      //     return res.status(500).json({ error: "internal server error", status: false });
      //   }
      //   let statusCode = error?.status
      //     ? HttpStatus.BAD_REQUEST
      //     : internalError;
      //   if (error?.status === HttpStatus.UNAUTHORIZED) {
      //     statusCode = HttpStatus.UNAUTHORIZED;
      //   }
      //   let errorMessage = statusCode === internalError
      //     ? utility.getMessage(req, false, 'INTERNAL_ERROR')
      //     : String(error?.message)
      //       ?.replace(new RegExp('Error:', 'g'), '')
      //       ?.trim();
      //   if (error.errorCode === 1) {
      //     errorMessage = String(error)
      //       ?.replace(new RegExp('Error:', 'g'), '')
      //       ?.trim();
      //   }
      //   res.status(statusCode).json({
      //     success: false,
      //     data: null,
      //     error,
      //     message: errorMessage,
      //   });
      // });
  };
  export default register;
  