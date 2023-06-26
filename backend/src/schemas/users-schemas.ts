import Joi from 'joi';

export const createSignInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const createSignupSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    pictureUrl: Joi.string().required()
  });
  
