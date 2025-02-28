"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const compression_1 = __importDefault(require("compression"));
const classifier_1 = require("./classifier");
const graphql_1 = require("./graphql");
const http_1 = require("http"); // Create an HTTP server
const socket_io_1 = require("socket.io"); // Socket.IO server setup
const express_winston_1 = __importDefault(require("express-winston"));
const winston_1 = __importDefault(require("winston"));
const prom_client_1 = __importDefault(require("prom-client"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const PORT = process.env.PORT;
const httpServer = (0, http_1.createServer)(exports.app); //Wrap Express app in an HTTP server
const io = new socket_io_1.Server(httpServer); // Socket.IO server setup
// Initialize GraphQL and pass both `app` and `httpServer`
(0, graphql_1.createGraphQLServer)(exports.app, httpServer);
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use((0, compression_1.default)());
exports.app.use(express_winston_1.default.logger({
    transports: [new winston_1.default.transports.Console()],
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`), winston_1.default.format.colorize(), winston_1.default.format.json()),
    meta: true, //Logs request metadata
    expressFormat: true, // Logs in an Express-friendly format,
    colorize: false, // Colorize log output
}));
// Prometheus client setup
const collectDefaultMetrics = prom_client_1.default.collectDefaultMetrics;
collectDefaultMetrics(); // Automatically collects CPU, memory, and request metrics
exports.app.get("/metrics", async (req, res) => {
    res.set("Content-Type", prom_client_1.default.register.contentType);
    res.end(await prom_client_1.default.register.metrics()); // Returns API performance data
});
exports.app.get('/api/classify-number', async (req, res) => {
    try {
        const numStr = req.query.number;
        const num = Number(numStr);
        if (!numStr || isNaN(num)) {
            res.status(400).json({
                number: numStr,
                error: true,
            });
            return; // na these return been give me a strong bug
        }
        const result = await (0, classifier_1.classifyNumber)(num);
        res.status(200).json(result);
        // ✅ Emit real-time updates via WebSockets
        io.emit("numberClassified", result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// ✅ WebSocket connection event
io.on("connection", (socket) => {
    console.log("Client connected");
    // Emit a welcome message
    socket.emit("message", "Welcom to the Real-Time API!");
});
// ✅ Start the HTTP server (not `app.listen`)
httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
