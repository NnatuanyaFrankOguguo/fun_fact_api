import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from 'dotenv';
import {classifyNumber} from './classifier';
import compression from 'compression';


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
        const result = await classifyNumber(Number(num));
        res.json(result); // Send response properly

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


