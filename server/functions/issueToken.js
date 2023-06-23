const { sign } = require("jsonwebtoken");

module.exports = async (username) => {
    const token = await sign({ username }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24,
    });
    return `Bearer ${token}`;
};
