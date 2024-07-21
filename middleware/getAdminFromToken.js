const pool = require("../database");
const AppError = require("../utils/appError");

const getAdminFromToken = async (req, res, next) => {
    const token = req.header("authorization");
    if (token) {
        try {
            console.log(token)
            const [authToken, ...rest] = token.split(' ').reverse();
            const query = `select * FROM admin where token=?`;
            const parameters = [authToken]
            const response = await pool.query(query, parameters);


            if (response[0].length < 1) {
                throw new AppError("Login with correct credentials", 500);
            }
            req.admin = response[0][0],
            console.log(response[0][0],"the response from the ")
                next()
        } catch (error) {
            const err = new AppError("something went wrong", 500);
            next(err);
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
    getAdminFromToken
}