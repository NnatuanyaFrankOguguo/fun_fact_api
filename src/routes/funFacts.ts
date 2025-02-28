import express, { Request, Response } from "express";
import { classifyNumber } from "../classifier";

const Router = express.Router();




Router.get('/classify-number', async (req: Request, res: Response)=> {
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

export default Router;