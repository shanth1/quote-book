const { sign } = require("jsonwebtoken");

module.exports = async (userData) => {
    const token = await sign(userData, process.env.SECRET, {
        expiresIn: 60 * 60 * 24,
    });
    return `Bearer ${token}`;
};
