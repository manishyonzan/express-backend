
const productRepository = require("../../repository/productRepository");
const AppError = require("../../utils/appError");

const productController = {
    getProduct: async (req, res, next) => {
        try {
            const { page } = req.query ?? null;
            const response = await productRepository.getProducts(page);
            if (response) {
                res.status(200).send({ success: true, data: response, error: null });
            }
            throw new AppError("Something Went wrong", 401);

        } catch (error) {
            next(error);
        }
    },
  
}

module.exports = productController;