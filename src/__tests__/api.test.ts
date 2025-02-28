import request from 'supertest';
import app from '../index';

describe('GET /api/classify-number', () => {
    it('should return 200 and a valid response for a valid number', async () => {
        const res = await request(app).get('/api/classify-number?number=13');
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
    } )
})