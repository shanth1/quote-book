const { verify } = require("jsonwebtoken");

const AuthMiddleware = async (req, res, next) => {
    const authHeader = req.get("authorization");
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }

    // Extract the token and check for token
    const token = authHeader.split(" ")[1];
    if (!token || token === "") {
        req.isAuth = false;
        return next();
    }

    // Verify the extracted token
    let decodedToken;
    try {
        decodedToken = verify(token, process.env.SECRET);
    } catch (err) {
        req.isAuth = false;
        return next();
    }

    // If decoded token is null then set authentication of the request false
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }

    // If the user has valid token then Find the user by decoded token's id
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
