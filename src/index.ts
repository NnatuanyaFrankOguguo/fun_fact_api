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

app.get('/api/classify-number', async (req: Request, res: Response) => {
    try {
        const num = req.query.number;

        if (!num || isNaN(Number(num))) {
            res.status(400).json({
                number: num,
                error: true,
            });
        }
        const properties: string[] = [];
    
        if(isArmstrong(Number(num))) properties.push("armstrong");
        properties.push(Number(num) % 2 === 0 ? "even" : "odd");

        res.status(200).json({
            number: num,
            is_prime: isPrime(Number(num)),
            is_perfect: isPerfectSqr(Number(num)),
            properties,
            digit_sum: Number(num).toString().split("").reduce((sum, digit) => sum + parseInt(digit), 0),
            fun_fact: await getFunFact(Number(num)),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


