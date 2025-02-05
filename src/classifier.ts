import {isPrime, isArmstrong, isPerfectSqr, getFunFact} from './utils'


export const classifyNumber = async (num: number): Promise<{number: number,
    is_prime: boolean,
    is_perfect: boolean,
    properties: string[],
    digit_sum: number,
    fun_fact: string} > => {
    const properties: string[] = [];
    
    if(isArmstrong(num)) properties.push("armstrong");
    properties.push(num % 2 === 0 ? "even" : "odd");

    return {
        number: num,
        is_prime: isPrime(num),
        is_perfect: isPerfectSqr(num),
        properties,
        digit_sum: num.toString().split("").reduce((sum, digit) => sum + parseInt(digit), 0),
        fun_fact: await getFunFact(num),
    };

    
};