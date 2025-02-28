"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classifyNumber = void 0;
const utils_1 = require("./utils");
const classifyNumber = async (num) => {
    const properties = [];
    if ((0, utils_1.isArmstrong)(num))
        properties.push("armstrong");
    properties.push(num % 2 === 0 ? "even" : "odd");
    if ((0, utils_1.isArmstrong)(num))
        properties.push("armstrong");
    if ((0, utils_1.isFibonacci)(num))
        properties.push("fibonacci");
    if ((0, utils_1.isPalindrome)(num))
        properties.push("palindrome");
    if ((0, utils_1.isAbundant)(num))
        properties.push("abundant");
    if ((0, utils_1.isDeficient)(num))
        properties.push("deficient");
    const digitSum = (n) => {
        let sum = 0;
        let num = Math.abs(n);
        while (num > 0) {
            sum += num % 10;
            num = Math.floor(num / 10);
        }
        return sum;
    };
    return {
        number: num,
        is_prime: (0, utils_1.isPrime)(num),
        is_perfect: (0, utils_1.isPerfectSqr)(num),
        properties,
        digit_sum: digitSum(num),
        sum_of_divisors: (0, utils_1.sumOfDivisors)(num),
        fun_fact: await (0, utils_1.getFunFact)(num),
    };
};
exports.classifyNumber = classifyNumber;
