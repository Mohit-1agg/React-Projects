import bcrypt from 'bcryptjs';

/**
 * Generates a salt and hash for a given value synchronously.
 * Generate a salt with 10 rounds and Hash the value using the generated salt
 *
 * @param {string} value - The value to be hashed.
 * @return {string} - The hashed value.
 */
export const generateSaltHashSync = function (value) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(value, salt);
};

/**
 * Compares a plain text value with a hashed value to check for a match.
 */
export const compareHashedValue = function (value, hashValue) {
  return bcrypt.compareSync(value, hashValue); // true
}
;
