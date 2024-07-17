const dotenv = require('dotenv');
const mysql = require('mysql2/promise');

dotenv.config();


const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const createUniqueProductId = async (name, actualname, num) => {

    let productId = name;
    console.log(productId, "the product id")

    let query = "select * from producttable where productId = ?";
    let params = [productId]
    const response = await pool.query(query, params);

    if (response && response[0].length < 1) {
        console.log(productId, "the reu=turn")
        return productId;
    }
    else {

        let productId2 = `${actualname.split(" ").join("-")}-${num + 1}`;
        console.log(productId2)
        return createUniqueProductId(productId2, actualname, num + 1);
    }

}

const productService = {
    formatProductService: async (req, res, next) => {
        try {
            const res = await createUniqueProductId(req.body.name, req.body.name, 0);
            console.log(res, "the response from the function")
            req.productId = res;
            next();
        } catch (error) {
            next(error)
        }
    }
}

module.exports = productService;