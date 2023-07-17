"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomValue = exports.generateRandomNumber = exports.generateRandomDeadline = void 0;
const generateRandomDeadline = () => {
    const randomDays = Math.floor(Math.random() * 5) - 2;
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + randomDays);
    return currentDate;
};
exports.generateRandomDeadline = generateRandomDeadline;
const generateRandomNumber = (digits) => {
    const min = 10 ** (digits - 1);
    const max = 10 ** digits - 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.generateRandomNumber = generateRandomNumber;
const generateRandomValue = (enumObject) => {
    const enumKeys = Object.keys(enumObject);
    const randomIndex = Math.floor(Math.random() * enumKeys.length);
    return enumObject[enumKeys[randomIndex]];
};
exports.generateRandomValue = generateRandomValue;
//# sourceMappingURL=utils.js.map