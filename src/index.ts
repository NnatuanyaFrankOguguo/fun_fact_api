import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from 'dotenv';
import compression from 'compression';
import { classifyNumber } from "./classifier";
import { createGraphQLServer } from "./graphql";
import { createServer } from "http"; // Create an HTTP server
import { Server } from "socket.io"; // Socket.IO server setup
import expressWinston from 'express-winston';
import winston from 'winston';
import client from "prom-client"
import { setupSwagger } from './swagger';
import  router  from './routes/funFacts';



dotenv.config();

const app = express();
const PORT  = process.env.PORT as string
const httpServer = createServer(app);  //Wrap Express app in an HTTP server
const io =  new Server(httpServer); // Socket.IO server setup


// Initialize GraphQL and pass both `app` and `httpServer`
createGraphQLServer(app, httpServer);

app.use(cors());
app.use(express.json());
app.use(compression())
app.use(expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
        winston.format.colorize(),
        winston.format.json()
    ),
    meta: true, //Logs request metadata
    expressFormat: true, // Logs in an Express-friendly format,
    colorize: false, // Colorize log output
}));
setupSwagger(app); // Set up Swagger documentation
// Prometheus client setup
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // Automatically collects CPU, memory, and request metrics

app.get("/metrics", async (req: Request, res: Response) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics()); // Returns API performance data
})

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

        // ✅ Emit real-time updates via WebSockets
        io.emit("numberClassified", result);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.use('/api/v1', router);

// ✅ WebSocket connection event
io.on("connection", (socket) => {
    console.log("Client connected");
    // Emit a welcome message
    socket.emit("message", "Welcom to the Real-Time API!");
})

// ✅ Start the HTTP server (not `app.listen`)
// ✅ Only start the server if this file is run directly
if (require.main === module) {
    httpServer.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}



export default app; // Export the Express app for testing purposes
