const request = require("supertest");

const app = require("../src/app");

jest.mock("../src/models/userModel");
const User = require("../src/models/userModel");


describe("POST /", () => {
    it("should create a new user", async () => {
        User.findById.mockResolvedValue(undefined);
        User.create.mockResolvedValue({ id: "123", name: "Test", phone: "1234567890" });

        const res = await request(app)
            .post("/")
            .send({ id: "123", name: "Test", phone: "1234567890" });

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ id: "123", name: "Test", phone: "1234567890" });
    });

    it("should return 409 if user exists", async () => {
        User.findById.mockResolvedValue({ id: "123" });

        const res = await request(app)
            .post("/")
            .send({ id: "123", name: "Test", phone: "1234567890" });

        expect(res.statusCode).toBe(409);
        expect(res.body).toEqual({message: "Id already exists"});
    });

    it("should return 422 if id is missing", async () => {

        const res = await request(app)
            .post("/")
            .send({ name: "Test", phone: "1234567890" });

        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual({message: "Id is required"});
    });

    it("should return 422 if phone is missing", async () => {

        const res = await request(app)
            .post("/")
            .send({ id: 123, name: "Test"});

        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual({message: "Phone is required"});
    });

    it("should return 422 if name is missing", async () => {

        const res = await request(app)
            .post("/")
            .send({ id: 123, phone: "0123456789"});

        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual({message: "Name is required"});
    });

    it("should return 422 if all parameter missing", async () => {

        const res = await request(app)
            .post("/")
            .send({ });

        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual({message: "Id is required"});
    });

    it('should return 500 on unexpected server error', async () => {
        User.findById.mockRejectedValue(new Error('DB error'));
    
        const res = await request(app)
            .post('/')
            .send({ id: "123", name: "Test", phone: "1234567890" });
    
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({ message: "DB error" });
    });
});

describe("GET /:id", () => {
    it("should return user by id", async () => {
        User.findById.mockResolvedValue({ id: "123", name: "Test", phone: "1234567890" });

        const res = await request(app).get("/123");

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ id: "123", name: "Test", phone: "1234567890" });
    });

    it("should return 404 if user not found", async () => {
        User.findById.mockResolvedValue(null);

        const res = await request(app).get("/999");

        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({message: "User not found"});
    });

    it("should return 404 if id parameter is missing" + 
         "bacuse there are no api with get '/'", async () => {

        const res = await request(app).get("/");

        expect(res.statusCode).toBe(404);
    });

    it('should return 500 on unexpected server error', async () => {
        User.findById.mockRejectedValue(new Error('DB error'));
    
        const res = await request(app).get('/999')
    
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({ message: "DB error" });
    });
});

describe("PUT /:id", () => {
    it("should update existing user", async () => {
        User.findById.mockResolvedValue({ id: "123", name: "Old", phone: "0000000000" });
        User.update.mockResolvedValue({ id: "123", name: "Updated", phone: "1111111111" });

        const res = await request(app)
            .put("/123")
            .send({ name: "Updated", phone: "1111111111" });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ id: "123", name: "Updated", phone: "1111111111" });
    });

    it("should return 404 if user not found", async () => {
        User.findById.mockResolvedValue(null);

        const res = await request(app)
            .put("/999")
            .send({ name: "Test" });

        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({message: "User not found"});
    });

    it('should return 500 on unexpected server error', async () => {
        User.findById.mockRejectedValue(new Error('DB error'));
    
        const res = await request(app).get('/999')
    
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({ message: "DB error" });
    });
});


