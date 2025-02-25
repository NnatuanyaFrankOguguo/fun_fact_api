import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from 'dotenv';
import compression from 'compression';
import { classifyNumber } from "./classifier";
import { createGraphQLServer } from "./graphql";


dotenv.config();

const app = express();
const PORT  = process.env.PORT as string

createGraphQLServer(app)

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
            return; // na these return been give me a strong bug
        }

        const result = await classifyNumber(num);
        res.status(200).json(result);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


