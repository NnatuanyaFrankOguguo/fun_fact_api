"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunFact = exports.isPerfectSqr = exports.isArmstrong = exports.isPrime = void 0;
const axios_1 = __importDefault(require("axios"));
// check if a number is prime number
const isPrime = (num) => {
    if (num < 2)
        return false;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0)
            return false;
    }
    return true;
};
exports.isPrime = isPrime;
//check if a number is an armstrong number
const isArmstrong = (num) => {
    const digits = num.toString().split("").map(Number);
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
    return sum === num;
};
exports.isArmstrong = isArmstrong;
// check if a number is a perfect number
const isPerfectSqr = (num) => {
    if (num < 0)
        return false;
    return (Number.isInteger(Math.sqrt(num)));
};
exports.isPerfectSqr = isPerfectSqr;
const getFunFact = async (num) => {
    try {
        const response = await axios_1.default.get(`http://numbersapi.com/${num}/math?callback=showNumber`);
        return response.data;
    }
    catch (error) {
        return "No fun fact available";
    }
};
exports.getFunFact = getFunFact;
