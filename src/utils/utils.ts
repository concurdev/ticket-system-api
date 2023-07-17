/**
 * Generate a random deadline.
 * @returns {Date} - The generated random deadline.
 */
export const generateRandomDeadline = (): Date => {
  // Generate a random number between -2 and 2 (representing days)
  const randomDays = Math.floor(Math.random() * 5) - 2;

  // Set the deadline based on the random number of days
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + randomDays);

  return currentDate;
};

/**
 * Generate a random number with the specified number of digits.
 * @param {number} digits - The number of digits for the random number.
 * @returns {number} - The generated random number.
 */
export const generateRandomNumber = (digits: number): number => {
  const min = 10 ** (digits - 1);
  const max = 10 ** digits - 1;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Generate a random value from an object.
 * @param {object} enumObject - The object containing the enumeration values.
 * @returns {string} - The generated random value.
 */
export const generateRandomValue = (enumObject: object): string => {
  const enumKeys = Object.keys(enumObject);
  const randomIndex = Math.floor(Math.random() * enumKeys.length);
  return enumObject[enumKeys[randomIndex]];
};
