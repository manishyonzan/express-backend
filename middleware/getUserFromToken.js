const pool = require("../database");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken")

const getUserFromToken = async (req, res, next) => {
    const token = req.header("authorization");
    if (token) {
        try {
            console.log(token)
            const [authToken, ...rest] = token.split(' ').reverse();


            const decoded = await jwt.verify(authToken, process.env.JWT_SECRET);

            console.log(decoded)


            const currentTime = Math.floor(Date.now() / 1000);

            if (decoded.exp < currentTime) {
                throw new AppError("Expired", 500);
            }

            req.user = {
                id: decoded.userId
            };
            // console.log(decoded.userId, "the response from the ")

            next()
        } catch (error) {
            console.log("error here")
            next(error);
        }
    }
    else {
        return res.status(500).json({
            message: "token is required",
            error: true
        })
    }
}


module.exports = {
    getUserFromToken
}