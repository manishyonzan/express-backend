const pool = require("../../database");

class wishlistRepository {
    async get(id) {

        const query = "";
        const parameters = [];
        const response = pool.query(query, parameters)
    };

    async create(wishlist) {
        const query = "";
        const parameters = [];
        const response = pool.query(query, parameters)
    };

    async update(wishlist){
        
        const query = "";
        const parameters = [];
        const response = pool.query(query,parameters)
    };

    async delete(id){
        
        const query = "";
        const parameters = [];
        const response = pool.query(query,parameters)
    }
}

module.exports = new wishlistRepository();