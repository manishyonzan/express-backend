const pool = require("../../database");
const AppError = require("../../utils/appError");

class wishlistRepository {
    async get(id) {

        try {
            const query = "select * from wishlist where userID";
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

    async create(wishlist) {
        try {

            const query = `insert into wishlist (${Object.keys(wishlist).map((item)=> `${item}`).join(",")}) 
            values (${Object.keys(wishlist).map((item) => `?`).join(",")})
            `;
            const parameters = [...Object.values(wishlist)];
            const [response] = pool.query(query, parameters);
            if (response) {
                return response;
            }
            throw new AppError();

        } catch (error) {
            throw error
        }
    };

    async update(wishlist) {

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

module.exports = new wishlistRepository();