const pool = require("../../database");

class cartRepository {


    async get(id) {

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

    async create(product) {
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