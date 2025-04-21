const db = require("../db/db");

exports.createAccount = async ( user_id, account_type = "personal", balance = 0 ) => {
  const [result] = await db.query(
    "INSERT INTO accounts (user_id, account_type, balance) VALUES (?, ?, ?)",
    [user_id, account_type, balance]
  );
  return { id: result.insertId, user_id, account_type, balance };
};

exports.getAccountByUserId = async (user_id) => {
  const [rows] = await db.query(
    "SELECT * FROM accounts WHERE user_id = ?", [user_id]
  );
  return rows[0];
};

exports.updateBalance = async ( user_id, balance ) => {
  const [result] = await db.query(
    "UPDATE accounts SET balance = ? WHERE user_id = ?",
    [balance, user_id]
  );
  return result.affectedRows > 0;
};

exports.deleteAccount = async (user_id) => {
  const [result] = await db.query(
    "DELETE FROM accounts WHERE user_id = ?",
    [user_id]
  );
  return result.affectedRows > 0;
};
