"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
describe('GET /api/classify-number', () => {
    it('should return 200 and a valid response for a valid number', async () => {
        const res = await (0, supertest_1.default)(index_1.app).get('/api/classify-number?number=13');
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
    });
});
