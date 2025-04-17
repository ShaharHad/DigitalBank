const db = require('../db/db');

exports.findByEmail = async (email) => {
    const [rows] = await db.execute(
        `SELECT * FROM auth_users WHERE email=?`, [email]
    );
    return rows[0];
};

exports.createUser = async (email, password) => {
    const [result] = await db.execute(
        'INSERT INTO auth_users (email, password) VALUES (?, ?)',
        [email, password]
    );

    return result.insertId;
};

exports.delete = async (email) => {
    await db.execute(
        'DELETE FROM auth_users WHERE email=? LIMIT 1',
        [email]
    );
}