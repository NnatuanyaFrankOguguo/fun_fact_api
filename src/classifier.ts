import {isPrime, isArmstrong, isPerfectSqr, getFunFact, isFibonacci, isPalindrome, sumOfDivisors, isAbundant, isDeficient} from './utils'

export const classifyNumber = async (num: number) => {
    const properties: string[] = [];

    if (isArmstrong(num)) properties.push("armstrong");
    properties.push(num % 2 === 0 ? "even" : "odd");
    if(isArmstrong(num)) properties.push("armstrong");
    if(isFibonacci(num)) properties.push("fibonacci");
    if(isPalindrome(num)) properties.push("palindrome");
    if(isAbundant(num)) properties.push("abundant");
    if(isDeficient(num)) properties.push("deficient");

    const digitSum = (n: number): number => {
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
        is_prime: isPrime(num),
        is_perfect: isPerfectSqr(num),
        properties,
        digit_sum: digitSum(num),
        sum_of_divisors: sumOfDivisors(num),
        fun_fact: await getFunFact(num),
    };
};
