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

            console.log(response, "the response")
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
            console.log(orderData, "the order data");
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
    };
    async changeProductQuantity(orderData) {
        // const query = `UPDATE ordertable SET quantity = quantity ${changeType === "increase" ? "+ 1" : "- 1"} WHERE userID = ? AND productId = ?`;
        try {
            const { changeType, userId, productId } = orderData;
            console.log(orderData,"the order data");

            const query = `update ordertable set quantity = quantity ${changeType =="increase" ? "+ 1" :"- 1"} where userID=? and productId=?`;

            console.log(query,"the query");

            const parameters = [userId.toString(), productId.toString()];

            const [response] = await pool.query(query,parameters);

            console.log(response,"the response");

            if (response.affectedRows > 0) return response;
            if(response.affectedRows < 1) throw new AppError("Product Not Found");
            throw new AppError();
        } catch (error) {
            throw error;
        }
    }
    async deleteOrder(userId) {
        try {
            const query = "delete from ordertable where userId = ?";
            const parameters = [userId.toString()];
            const [response] = await pool.query(query, parameters);
            console.log(response);

            if (response.affectedRows > 0) return response;
            throw new AppError("No Order remaining");

        } catch (error) {
            throw error;
        }
    };
    async removeProductFromOrder(productId, userId) {
        try {
            const query = "delete from ordertable where productId = ? and userId = ?";
            console.log(productId, userId, typeof productId, typeof userId.toString(), "product id and the user id")
            const parameters = [productId, userId.toString()];
            const [response] = await pool.query(query, parameters);

            console.log(response, "response form delete", response.affectedRows);
            if (response.affectedRows > 0) return response;
            throw new AppError("Product not in the cart");

        } catch (error) {
            throw error;
        }
    }

}


module.exports = new orderRepository();