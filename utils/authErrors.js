exports.signUpErrors = (err) => {
  // errors messages are 
  let errors = { pseudo: "", email: "", password: "" };
  let = errorMessage = err.errors[0].message;
  // the validation error concern the pseudo
  if (errorMessage.includes("pseudo")) {
    errors.pseudo = errorMessage;
  }
  // the validation error concern the email
  if (errorMessage.includes("email")) {
    errors.email = errorMessage;
  }
  // the validation error concern the password
  if (errorMessage.includes("password")) {
    errors.password = errorMessage;
  }
  return errors;
};
