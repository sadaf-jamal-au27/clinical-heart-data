const Joi = require('joi');

const validateHeartRateData = (req, res, next) => {
  const schema = Joi.object({
    clinical_data: Joi.object({
      HEART_RATE: Joi.object({
        uom: Joi.string().required(),
        data: Joi.array().items(
          Joi.object({
            on_date: Joi.date().iso().required(),
            measurement: Joi.number().required()
          })
        ).required()
      }).required()
    }).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateHeartRateData };
