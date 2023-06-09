import HttpStatus from 'http-status';

const validateRequest = (options) => async (req, res, next) => {
  try {
    await options.schema.validateAsync({
      ...req.query,
      ...req.body,
      ...req.params,
    });
    next();
  } catch (error) {
    const errors = [];
    if (error.isJoi) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        data: null,
        error: errors,
        message: 'inside the bad request',
      });
    }
  }
};

export default validateRequest;
