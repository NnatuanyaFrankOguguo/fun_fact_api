import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from 'dotenv';
import compression from 'compression';
import {isPrime, isArmstrong, isPerfectSqr, getFunFact} from './utils'


dotenv.config();

const app = express();
const PORT  = process.env.PORT as string 

app.use(cors());
app.use(express.json());
app.use(compression())

app.get('/api/classify-number', async (req: Request, res: Response)=> {
    try {
        const numStr = req.query.number;
        const num = Number(numStr)

        if (!numStr || isNaN(num)) {
            res.status(400).json({
                number: numStr,
                error: true,
            })
            return;
        }
        const properties: string[] = [];
    
        if(isArmstrong(num)) properties.push("armstrong");
        properties.push(num % 2 === 0 ? "even" : "odd");

        const digitSum = (n: number): number => {
            let sum = 0;
            let num = Math.abs(n);
            while (num > 0) {
                sum += num % 10;
                num = Math.floor(num / 10);
            }
            return sum;
        };

        res.status(200).json({
            number: num,
            is_prime: isPrime(num),
            is_perfect: isPerfectSqr(num),
            properties,
            digit_sum: digitSum(num),
            fun_fact: await getFunFact(num),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


