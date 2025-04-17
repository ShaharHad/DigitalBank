const db = require('../db/db');
const createError = require('../utils/createError');

exports.findById = async (id) => {
    const [rows] = await db.execute(
        `SELECT * FROM users WHERE id = ?`, [id]
    );
    return rows[0];
};

exports.create = async ( id, name, phone ) => {
    const [result] = await db.execute(
        'INSERT INTO users (id, name, phone) VALUES (?, ?, ?)',
        [id, name, phone]
    );
    return { id: result.insertId, name, phone };
};

exports.update = async (id, updates) => {
    const fields = [];
    const values = [];

    Object.entries(updates).forEach(([key, value]) => {
        fields.push(`${key} = ?`);
        values.push(value);
    });

    values.push(id);

    await db.execute(
        `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
        values
    );
};


