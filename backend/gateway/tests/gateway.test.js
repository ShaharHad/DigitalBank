const request = require('supertest');
const app = require('../src/app');

describe("GET /api/v1/ping", () => {
    it("Should return message Gateway is alive", async () => {
        const res = await request(app).get("/api/v1/ping");
         expect(res.statusCode).toBe(200);
         expect(res.body).toEqual({message: "Gateway is alive"});
    });

    it("Should return status code 404'  ", async () => {
        const res = await request(app).get("/api/ping");
         expect(res.statusCode).toBe(404);
    });
});