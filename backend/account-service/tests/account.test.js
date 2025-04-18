const request = require("supertest");

const app = require("../src/app");

jest.mock("../src/services/accountService");
const accountService = require("../src/services/accountService");


describe("POST /", () => {
    it("should create an account", async () => {
        const account = { id: 1, user_id: 1, account_type: "personal", balance: 0 };
        accountService.createAccount.mockResolvedValue(account);

        const res = await request(app).post("/").send({
            user_id: 1,
            account_type: "personal",
            balance: 0
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(account);
    });

    it("should return 409 for account already exist", async () => {
        const error = new Error("Account already exists for this user");
        error.statusCode = 409;
        accountService.createAccount.mockRejectedValue(error);

        const res = await request(app).post("/").send({
            user_id: 1,
            account_type: "personal",
            balance: 0
        });
        expect(res.statusCode).toBe(409);
        expect(res.body).toEqual({message: "Account already exists for this user"});
    });

    it("should return 500 if there is DB error", async () => {
        accountService.createAccount.mockRejectedValue(new Error("DB Error"));

        const res = await request(app).post("/").send({
            user_id: 1,
            account_type: "personal",
            balance: 0
        });

        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({message: "DB Error"});
    });
});

describe("GET /:user_id", () => {
    it("should return account by user ID", async () => {
        const account = { id: 1, user_id: 1, account_type: "personal", balance: 100 };
        accountService.getAccount.mockResolvedValue(account);

        const res = await request(app).get("/1");

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(account);
    });

    it("should return 404 if account not found", async () => {
        const error = new Error("Account not found");
        error.statusCode = 404;
        accountService.getAccount.mockRejectedValue(error);

        const res = await request(app).get("/999");

        expect(res.statusCode).toBe(error.statusCode);
        expect(res.body.error).toBe(error.messgae);
    });

    it("should return 500 if there is DB error", async () => {
        accountService.getAccount.mockRejectedValue(new Error("DB Error"));

        const res = await request(app).get("/1");

        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({message: "DB Error"});
    });
});

  describe("PUT /:user_id/balance", () => {
    it("should update balance", async () => {
        accountService.updateAccountBalance.mockResolvedValue(true);

        const res = await request(app).put("/1/balance").send({ balance: 200 });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Balance updated");
    });

    it("should return 500 if account not found", async () => {
        accountService.updateAccountBalance.mockRejectedValue(new Error("Account not found"));

        const res = await request(app).put("/1/balance").send({ balance: 200 });

        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({message: "Account not found"});
    });

    it("should return 400 if balance unchanged", async () => {
        accountService.updateAccountBalance.mockRejectedValue(new Error("Balance unchanged"));

        const res = await request(app).put("/1/balance").send({ balance: 200 });

        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({message: "Balance unchanged"});
    });

    it("should return 500 if there is DB error", async () => {
        accountService.updateAccountBalance.mockRejectedValue(new Error("DB Error"));

        const res = await request(app).put("/1/balance").send({balance: 200});

        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({message: "DB Error"});
    });
});

describe("DELETE /:user_id", () => {
    it("should delete account", async () => {
        accountService.deleteAccount.mockResolvedValue(true);

        const res = await request(app).delete("/1");

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Account deleted");
        });

    it("should return 500 if deletion fails", async () => {
          accountService.deleteAccount.mockRejectedValue(new Error("Failed to delete account"));

        const res = await request(app).delete("/1");

        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({message: "Failed to delete account"});
    });

    it("should return 500 if there is DB error", async () => {
        accountService.deleteAccount.mockRejectedValue(new Error("DB Error"));

        const res = await request(app).delete("/1");

        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({message: "DB Error"});
    });
});