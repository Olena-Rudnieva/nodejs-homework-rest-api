const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {
  handleMongooseError,
  runValidatorsAtUpdate,
} = require('../models/hooks');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `missing required "name" field`,
  }),
  email: Joi.string().required().messages({
    'any.required': `missing required "email" field`,
  }),
  phone: Joi.string().required().messages({
    'any.required': `missing required "phone" field`,
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ 'any.required': `missing field favorite` }),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

contactSchema.post('save', handleMongooseError);

contactSchema.pre('findOneAndUpdate', runValidatorsAtUpdate);

contactSchema.post('findOneAndUpdate', handleMongooseError);

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
};
