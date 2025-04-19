const request = require('supertest');
const app = require('../src/app');

jest.mock('../src/models/authModel');
const User = require('../src/models/authModel');

jest.mock('../src/utils/hash');
const { compareStrings } = require('../src/utils/hash');

jest.mock('../src/services/userServiceClient');
const userServiceClient = require('../src/services/userServiceClient');

jest.mock('../src/services/accountServiceClient');
const accountServiceClient = require('../src/services/accountServiceClient');

describe('POST /register', () => {

    afterEach(() => {
        jest.clearAllMocks();
      });

    it('should register a new user', async () => {
        User.findByEmail.mockResolvedValue(null);
        User.createUser.mockResolvedValue({ id: 1, name: "test", email: "test@example.com", phone: "0123456789" });
        userServiceClient.createUser.mockResolvedValue(20, 1, "Shahar");
        accountServiceClient.createUser.mockResolvedValue(20, 1, "Shahar");

        const res = await request(app)
        .post('/register')
        .send({ email: "test@example.com", password: "secret", name: "test", phone: "0123456789"});
  
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ message: "User registered successfully" });
    });

    it('should return 409 if email already exists', async () => {
        User.findByEmail.mockResolvedValue({ id: 1, email: "test@example.com" });
    
        const res = await request(app)
          .post('/register')
          .send({ email: "test@example.com", password: "secret", name: "test", phone: "0123456789" });
    
        expect(res.statusCode).toBe(409);
        expect(res.body).toEqual({ message: "Email already in use" });
      });

      it('should return 422 if email is missing', async () => {
        const res = await request(app)
          .post('/register')
          .send({ password: "secret", name: "test", phone: "0123456789" });
    
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual({ message: "Email is required" });

      });

      it('should return 422 if email is not valid', async () => {
        const res = await request(app)
          .post('/register')
          .send({ email: "test.com", password: "secret", name: "test", phone: "0123456789" });
    
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual({ message: "Please provide valid email" });

      });
    
      it('should return 422 if password is missing', async () => {
        const res = await request(app)
          .post('/register')
          .send({ email: "test@example.com", name: "test", phone: "0123456789"});
    
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual({ message: "Password is required" });
      });

      it('should return 422 if password is not string', async () => {
        const res = await request(app)
          .post('/register')
          .send({ email: "test@example.com", password: 123457, name: "test", phone: "0123456789"});
    
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual({ message: "Password should be string" });
      });

      it('should return 422 for password length smaller then 5', async () => {
        const res = await request(app)
            .post('/register')
            .send({email: "test@example.com", password: "1234", name: "test", phone: "0123456789"});
        
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual({message: "Password should be at least 5 characters and maximum 20 characters"});
    });

      it('should return 422 if name is missing', async () => {
        const res = await request(app)
          .post('/register')
          .send({ email: "test@example.com", password: "secret", phone: "0123456789"});
    
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual({ message: "Name is required" });
      });

      it('should return 422 if name is not string', async () => {
        const res = await request(app)
          .post('/register')
          .send({ email: "test@example.com", password: "secret", name: 123456, phone: "0123456789"});
    
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual({ message: "Name should be string" });
      });

      it('should return 422 on empty body', async () => {
    
        const res = await request(app)
          .post('/register')
          .send({  });
    
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual({ message: "Name is required" });
      });

      it('should return 500 on unexpected server error', async () => {
        User.findByEmail.mockRejectedValue(new Error('DB error'));
    
        const res = await request(app)
          .post('/register')
          .send({ email: "test@example.com", password: "secret", name: "test", phone: "0123456789" });
    
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({ message: "DB error" });
      });
});

describe('POST /login', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 200 for valid email', async () => {
        const user = { id: 1, email: "test@example.com", password: "hashed", name: "test" };
        User.findByEmail.mockResolvedValue(user);
        compareStrings.mockResolvedValue(true);

        const res = await request(app)
            .post('/login')
            .send({email: "test@example.com", password: "secret"});
        
        expect(res.statusCode).toBe(200);
    });

    it('should return 422 for missing email', async () => {
        const res = await request(app)
            .post('/login')
            .send({password: "secret"});
        
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual({message: "Email is required"});
    });

    it('should return 422 for not valid email', async () => {
        const res = await request(app)
            .post('/login')
            .send({email: "test.com", password: "secret"});
        
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual({message: "Please provide valid email"});
    });

    it('should return 422 for missing password', async () => {
        const res = await request(app)
            .post('/login')
            .send({email: "test@example.com"});
        
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual({message: "Password is required"});
    });

    it('should return 422 for not valid password', async () => {
        const res = await request(app)
            .post('/login')
            .send({email: "test@example.com", password: 123456});
        
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual({message: "Password should be string"});
    });

    it('should return 422 for password length smaller then 5', async () => {
        const res = await request(app)
            .post('/login')
            .send({email: "test@example.com", password: "1234"});
        
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual({message: "Password should be at least 5 characters and maximum 20 characters"});
    });

    it('should return 422 on empty body', async () => {    
        const res = await request(app)
          .post('/login')
          .send({  });
    
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual({ message: "Email is required" });
      });

      it('should return 500 on unexpected server error', async () => {
        User.findByEmail.mockRejectedValue(new Error('DB error'));
    
        const res = await request(app)
          .post('/login')
          .send({ email: "test@example.com", password: "secret", name: "test" });
    
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({ message: "DB error" });
      });
});