const pool = require("../../database");

class cartRepository {


    async get(id) {

        try {
            const query = "select productId,quantity,image,productName,createdAt,updatedAt from cart where userId=?";
            const parameters = [id];
            console.log("kddj")
            const response = await pool.query(query, parameters);
            console.log(response)
            if (response) {
                return response[0];
            }
            throw new AppError();

        } catch (error) {
            console.log(error)
            throw error
        }
    };

    async create(product) {
        try {

            const query = `insert into cart (${Object.keys(product).map((item) => `${item}`).join(",")})  
             values (${Object.keys(product).map((item) => `?`).join(",")})`;

            const parameters = [...Object.values(product)];
            const response = await pool.query(query, parameters);

            if (response) {
                return product;
            }
            throw new AppError();

        } catch (error) {
            throw error
        }
    };

    async update(userId, productId, changeType) {

        try {
            const query = `update cart set quantity = quantity ${changeType == "increase" ? "+ 1" : "- 1"} where userID=? and productId=?`;
            const parameters = [userId, productId];
            const [response] = pool.query(query, parameters);

            if (response) {
                return response;
            }
            throw new AppError();

        } catch (error) {
            throw error
        }
    };

    async delete(userId, productId) {

        const query = "delete from cart where userId=? and productId=?";
        const parameters = [userId, productId];
        const [response] = pool.query(query, parameters);

        if (response) {
            return response;
        }
        throw new AppError();
    }
    async checkItemFOrUser(userId, productId) {
        try {
            const query = "select * from cart where userId=? and productId=? and quantity > 1"
            const parameters = [userId, productId];

            const response = pool.query(query, parameters);

            if (response) {
                return response[0];
            }
            throw new AppError();
        } catch (error) {
            throw error;
        }

    }
}

module.exports = new cartRepository();