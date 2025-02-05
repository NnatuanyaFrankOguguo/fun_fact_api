"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const classifier_1 = require("./classifier");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/classify-number', async (req, res) => {
    try {
        const num = parseInt(req.query.number); // Get number from query params
        if (isNaN(num)) {
            return res.status(400).json({ number: "alphabet", error: true });
        }
        const result = await (0, classifier_1.classifyNumber)(num);
        res.json(result); // Send response properly
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
