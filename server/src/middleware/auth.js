const { verify } = require("jsonwebtoken");
const User = require("../models/User");

const AuthMiddleware = async (req, res, next) => {
    const authHeader = req.get("authorization");
    const SECRET = process.env.SECRET || "PUBLIC_SECRET";
    console.log(SECRET);
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }

    const token = authHeader.split(" ")[1];
    if (!token || token === "") {
        req.isAuth = false;
        return next();
    }

    let decodedToken;
    try {
        decodedToken = verify(token, SECRET);
    } catch (err) {
        req.isAuth = false;
        return next();
    }

    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }

    let authUser = await User.findById(decodedToken.id);

    if (!authUser) {
        req.isAuth = false;
        return next();
    }

    req.isAuth = true;
    req.user = authUser;
    return next();
};

module.exports = AuthMiddleware;
