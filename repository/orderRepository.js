const pool = require("../database");
const AppError = require("../utils/appError");


class orderRepository {
    async getOrders(id) {
        try {
            const response = await pool.query("select * from ordertable where userId=?", [id]);
            pool.releaseConnection();

            return response[0];
            
        } catch (error) {
            const err = AppError("something went wrong", 401);
            pool.releaseConnection();
            throw err;

        }

    }
}


module.exports = new orderRepository();