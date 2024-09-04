const Joi = require("joi");

const validateCredentials = (email, password) => {
  const emailSchema = Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .required();
  const passwordSchema = Joi.string()
    .pattern(new RegExp("^(?=.*[!@#$%^&*])"))
    .min(6)
    .max(30)
    .required();

  const { error: emailError } = emailSchema.validate(email);
  if (emailError) {
    return { error: "Invalid email" };
  }

  const { error: passwordError } = passwordSchema.validate(password);
  if (passwordError) {
    return {
      error:
        "Password must be at least 6 characters, alphanumeric, and contain atleast one special character.",
    };
  }

  return { error: null };
};

module.exports = { validateCredentials };
