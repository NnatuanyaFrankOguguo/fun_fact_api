"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGraphQLServer = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const utils_1 = require("./utils");
const typeDefs = (0, apollo_server_express_1.gql) `
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
        classifyNumber: async (_, args) => {
            const num = args.number;
            const properties = [num % 2 === 0 ? "even" : "odd"];
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
            const funFact = await (0, utils_1.getFunFact)(num);
            const sumOfDivisor = (0, utils_1.sumOfDivisors)(num);
            const digitSum = num.toString().split('').reduce((sum, d) => sum + parseInt(d), 0);
            return {
                number: num,
                is_prime: (0, utils_1.isPrime)(num),
                is_perfect: (0, utils_1.isPerfectSqr)(num),
                properties,
                sumOfDivisors: sumOfDivisor,
                digit_sum: digitSum,
                funFact: funFact,
            };
        },
    },
};
const createGraphQLServer = async (app, httpServer) => {
    const server = new apollo_server_express_1.ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });
};
exports.createGraphQLServer = createGraphQLServer;
