"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDeficient = exports.isAbundant = exports.sumOfDivisors = exports.isPalindrome = exports.isFibonacci = exports.getFunFact = exports.isPerfectSqr = exports.isArmstrong = exports.isPrime = void 0;
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
    let sum = 1;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) {
            sum += i;
            if (i !== num / i)
                sum += num / i;
        }
    }
    return sum === num && num !== 1;
};
exports.isPerfectSqr = isPerfectSqr;
const getFunFact = async (num) => {
    try {
        const response = await axios_1.default.get(`http://numbersapi.com/${num}/math`);
        return response.data;
    }
    catch (error) {
        return "No fun fact available";
    }
};
exports.getFunFact = getFunFact;
//Extra Requirement
const isFibonacci = (num) => {
    let a = 0, b = 1;
    if (num === a || num === b)
        return true;
    while (b < num) {
        const temp = b;
        b = a + b;
        a = temp;
        if (b === num)
            return true;
    }
    return false;
};
exports.isFibonacci = isFibonacci;
const isPalindrome = (num) => {
    const str = num.toString();
    return str === str.split("").reverse().join("");
};
exports.isPalindrome = isPalindrome;
const sumOfDivisors = (num) => {
    let sum = 1; // 1 is a divisor for any num > 1
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            sum += i;
            if (i !== num / i)
                sum += num / i; // if i is not equal to num/i, then num/i is also a divisor
        }
    }
    return sum;
};
exports.sumOfDivisors = sumOfDivisors;
const isAbundant = (num) => (0, exports.sumOfDivisors)(num) > num;
exports.isAbundant = isAbundant;
const isDeficient = (num) => (0, exports.sumOfDivisors)(num) < num;
exports.isDeficient = isDeficient;
