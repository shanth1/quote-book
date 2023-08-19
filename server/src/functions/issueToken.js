const { sign } = require("jsonwebtoken");

module.exports = async (userData) => {
    const SECRET = process.env.SECRET || "PUBLIC_SECRET";
    const token = await sign(userData, SECRET, {
        expiresIn: 60 * 60 * 24,
    });
    return `Bearer ${token}`;
};
