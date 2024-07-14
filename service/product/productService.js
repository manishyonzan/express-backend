const { pool } = require("../../database");

const createUniqueProductId = async (body, num) => {

    let productId = body.name;

    const response = await pool.query(`select * from producttable where productId =${`${body.productId}`}`);
    if (response[0].length < 0) {
        req.body = { ...req.body, productId: productId };
    }
    else {

        let productId = `${req.body.name.split(" ").join("-")}-${num + 1}`;
        let body2 = { ...body, productId: productId }
        createUniqueProductId(body2, num + 1);
    }

}

const productService = {
    formatProductService: async (req, res, next) => {
        try {
            const res  = await createUniqueProductId(req.body,0);
            next();
        } catch (error) {
            next(error)
        }
    }
}

module.exports = productService;