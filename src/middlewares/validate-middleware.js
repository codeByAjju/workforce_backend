import HttpStatus from 'http-status';

const validateRequest = (options) => async (req, res, next) => {
  try {
    console.log("Entered")
    await options.schema.validateAsync({
      ...req.query,
      ...req.body,
      ...req.params,
    });
    next();
  } catch (error) {
    console.log(error)
    const errors = [];
    if (error.isJoi) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        data: null,
        message: error.message
      });
    }
  }
};
export default validateRequest; 
