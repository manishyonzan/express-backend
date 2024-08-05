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

    async update(product) {

        try {
            const query = "";
            const parameters = [];
            const [response] = pool.query(query, parameters);

            if (response) {
                return response;
            }
            throw new AppError();

        } catch (error) {
            throw error
        }
    };

    async delete(id) {

        const query = "";
        const parameters = [];
        const [response] = pool.query(query, parameters);

        if (response) {
            return response;
        }
        throw new AppError();
    }
}

module.exports = new cartRepository();