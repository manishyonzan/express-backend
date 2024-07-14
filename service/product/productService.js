const { pool } = require("../../database")

const productService = {
    getProductService: async (req, res, next) => {
        try {
            let productId = req.body.name;
            let num = 0;
            while (true) {
                const response = pool.query(`select * from producttable where productId =${`${productId}`}`);
                if (response[0].length < 0) {
                    req.body  = {...req.body,productId:productId};
                    break;
                }
                productId = `${req.body.name.split(" ").join("-")}-${num + 1}`;
            }
            next();
        } catch (error) {
            next(error)
        }
    }
}

module.exports = productService;