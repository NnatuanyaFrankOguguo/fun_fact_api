import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import {isPrime, isArmstrong, isPerfectSqr, getFunFact, isFibonacci, isPalindrome, sumOfDivisors, isAbundant, isDeficient} from './utils'




const typeDefs = gql`
    type NumberFact {
    number: Int!
    properties: [String!]!
    is_prime: Boolean!
    is_perfect: Boolean!
    digit_sum: Int!
    sumOfDivisors: Int!
    funFact: String!
    }

    type Query {
    classifyNumber(number: Int!): NumberFact
    }`;

const resolvers = {
    Query: {
        classifyNumber: async (_: any, args: { number: number }) => {
            const num = args.number;
            const properties: string[] = [num % 2 === 0? "even" : "odd"  ];
            if(isArmstrong(num)) properties.push("armstrong");
            if(isFibonacci(num)) properties.push("fibonacci");
            if(isPalindrome(num)) properties.push("palindrome");
            if(isAbundant(num)) properties.push("abundant");
            if(isDeficient(num)) properties.push("deficient");

            const funFact = await getFunFact(num);
            const sumOfDivisor = sumOfDivisors(num);
            const digitSum = num.toString().split('').reduce((sum, d) => sum + parseInt(d), 0);



            return {
                number: num,
                is_prime: isPrime(num),
                is_perfect: isPerfectSqr(num),
                properties,
                sumOfDivisors : sumOfDivisor,
                digit_sum: digitSum,
                funFact: funFact,
            };
        },
    },
};


export const createGraphQLServer = async (app: express.Application) => {
     
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    
    server.applyMiddleware({ app, path: "/graphql"});

}