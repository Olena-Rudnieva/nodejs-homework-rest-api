const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {
  handleMongooseError,
  runValidatorsAtUpdate,
} = require('../models/hooks');

const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set password for user'],
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

userSchema.pre('findOneAndUpdate', runValidatorsAtUpdate);

userSchema.post('findOneAndUpdate', handleMongooseError);

const userSignupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const userSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid('starter', 'pro', 'business')
    .default('starter')
    .messages({
      'any.only': 'Invalid subscription type',
    })
    .required(),
});

const schemas = {
  userSignupSchema,
  userSigninSchema,
  userSubscriptionSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
