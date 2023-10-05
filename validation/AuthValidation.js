const Joi = require("joi");

//Register validation
const registerUserValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(30).required(),
    email: Joi.string().min(6).required().email().lowercase(),
    mobile_no: Joi.string().min(10).max(10).required(),
    password: Joi.string()
      .min(8)
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    confirm_password: Joi.ref("password"),
  });

  //Validate data
  return schema.validate(data);
};

//Login validation
const loginUserValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  });

  //Validate data
  return schema.validate(data);
};

module.exports.loginUserValidation = loginUserValidation;
module.exports.registerUserValidation = registerUserValidation;
