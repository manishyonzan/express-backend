const pool = require("../database");
const AppError = require("../utils/appError");


class orderRepository {
    async getOrders(id) {
        try {
            // const response = await pool.query("select productId from ordertable where userId=?", [id]);
            // console.log("ok")
            // const getProduct = await pool.query(`select productId,name,image from producttable where productId in ( ${response[0].map((item) => `'${item.productId}'`).join(",")})`);
            // console.log(getProduct[0], "the gotten product");

            const response = await pool.query(` SELECT p.productId, p.name, p.image, o.quantity FROM producttable p  JOIN ordertable o ON p.productId = o.productId  WHERE o.userId = ?`, [id]);

            console.log(response,"the response")
            pool.releaseConnection();

            return response[0];

        } catch (error) {
            console.log(error)
            const err = new AppError("something went wrong", 401);
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