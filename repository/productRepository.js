const pool = require("../database");
const AppError = require("../utils/appError");

class ProductRepository{
    async getProducts(page){
        try {
            const offset = page ?? 0;
            console.log(offset,"the offset is")
            const response = await pool.query(`select * from producttable limit 20 offset ${offset * 20}`);
            if (response[0].length == 0 ) {
                throw new AppError("No data",402)                
            }
            if (!response) throw new AppError();
            console.log(response[0],"jsjdjd");
            return response[0];
            
        } catch (error) {
            throw error;
        }
    };
}

module.exports = new ProductRepository();