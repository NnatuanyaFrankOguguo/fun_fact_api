import axios from 'axios';

// check if a number is prime number
export const isPrime = (num: number) : boolean => {
    if(num < 2) return false;
    for (let i = 2; i * i <= num; i++){
        if(num % i === 0) return false;
    }
    return true;
    
}

//check if a number is an armstrong number
export const isArmstrong = (num: number) : boolean => {
    const digits = num.toString().split("").map(Number);
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
    return sum === num;
}

// check if a number is a perfect number

export const isPerfectSqr = (num: number) : boolean => {
    if (num < 0) return false
    return (Number.isInteger(Math.sqrt(num)))

}

export const getFunFact = async(num: number): Promise<string> => {
    try {
        const response = await axios.get(`http://numbersapi.com/${num}/math?callback=showNumber`);
        return response.data
    } catch (error) {
        return "No fun fact available"
    }
};