"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classifyNumber = void 0;
const utils_js_1 = require("./utils.js");
const classifyNumber = async (num) => {
    const properties = [];
    if ((0, utils_js_1.isArmstrong)(num))
        properties.push("armstrong");
    properties.push(num % 2 === 0 ? "even" : "odd");
    return {
        number: num,
        is_prime: (0, utils_js_1.isPrime)(num),
        is_perfect: (0, utils_js_1.isPerfectSqr)(num),
        properties,
        digit_sum: num.toString().split("").reduce((sum, digit) => sum + parseInt(digit), 0),
        fun_fact: await (0, utils_js_1.getFunFact)(num),
    };
};
exports.classifyNumber = classifyNumber;
