export const REGISTRATION_EMAIL_VALIDATION_QUERY = `SELECT * FROM users WHERE email = ? `;

export const USER_REGISTRATION_QUERY = `INSERT INTO users(username,email,password) VALUES(?,?,?)`;
