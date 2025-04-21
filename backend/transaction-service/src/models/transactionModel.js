const db = require("../db/db");

exports.insertTransaction = async (accountId, type, amount, description) => {
  const query = `
    INSERT INTO transactions (account_id, type, amount, description)
    VALUES (?, ?, ?, ?);`;

  const [result] = await db.query(query, [accountId, type, amount, description]);
  return result.insertId;
};

exports.getTransactionsByAccountId = async (accountId) => {
  const query = `
    SELECT * FROM transactions
    WHERE account_id = ?
    ORDER BY created_at DESC;
  `;
  const [rows] = await db.query(query, [accountId]);
  return rows;
};
