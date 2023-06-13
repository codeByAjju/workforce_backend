import Joi from 'joi';

const userProfileUpdateSchema = Joi.object({
  firstname: Joi.string()
    .min(3)
    .max(20)
    .messages({
      'any.required': 'FIRST_NAME_REQUIRED',
      'string.empty': 'FIRST_NAME_REQUIRED',
      'string.min': 'FIRST_NAME_MIN_VALIDATION',
      'string.max': 'FIRST_NAME_MAX_VALIDATION',
    })
    .required(),
  lastname: Joi.string()
    .min(3)
    .max(20)
    .messages({
      'any.required': 'LAST_NAME_REQUIRED',
      'string.empty': 'LAST_NAME_REQUIRED',
      'string.min': 'LAST_NAME_MIN_VALIDATION',
      'string.max': 'LAST_NAME_MAX_VALIDATION',
    })
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .min(6)
    .max(50)
    .messages({
      'any.required': 'EMAIL_REQUIRED',
      'string.empty': 'EMAIL_REQUIRED',
      'string.email': 'VALID_EMAIL_ALLOWED',
      'string.min': 'EMAIL_MIN_VALIDATION',
      'string.max': 'EMAIL_MAX_VALIDATION',
    })
    .required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'))
    .label('Password')
    .messages({
      'string.pattern.base': 'Password must contain at least one letter and one number',
    })
    .required(),  
  phoneNumber: Joi.string()
    .regex(/^[0-9]{10,15}$/)
    .messages({
      'string.pattern.base': 'ONLY_NUMERIC_ALLOWED',
      'string.length': 'PHONE_MAX_VALIDATION',
    })
    .required()
});
export default {
  userProfileUpdateSchema,
};
