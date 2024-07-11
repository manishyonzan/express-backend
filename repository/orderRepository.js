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

    };
    async createOrder(orderData) {
        try {
            const query = "insert into ordertable (userID,productId,quantity) values(?,?,?)"
            const parameters = [orderData.userID, orderData.productId, orderData.quantity]
            const response = await pool.query(query, parameters);

            if (response) {
                return response[0];
            }
            throw new AppError("Something went wrong");
        } catch (error) {

            throw err;

        }
    }

}


module.exports = new orderRepository();