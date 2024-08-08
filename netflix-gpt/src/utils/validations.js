export const checkValidSignInData = (email, password) => {
  if (!checkEmail(email) || !checkPassword(password))
    return "Email ID or Password is not valid";

  return null;
};

export const checkValidSignUpData = (email, password, name) => {
  const isValidName = /^[A-Za-z\s]{3,}$/.test(name);

  if (name?.trim().length < 3 || !isValidName) return "Name id not valid";
  if (!checkEmail(email)) return "Email ID is not valid";
  if (!checkPassword(password)) return "Password is not valid";

  return null;
};

const checkEmail = (email) =>
  /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);

const checkPassword = (password) =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
