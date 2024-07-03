const pool = require("../database");
const AppError = require("../utils/appError");

export const getUserFromToken = async (token) => {
    if (token) {
        try {
            const response = await pool.query(`select user FROM tablename where token=${token}`);
            return response;
        } catch (error) {
            const err = new AppError("something went wrong", 401);
            throw err;

        }
    }
}