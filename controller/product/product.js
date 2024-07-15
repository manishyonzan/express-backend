
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
    createProduct: async (req, res, next) => {
        try {
            console.log(req.productId,"the e")
            const res = await productRepository.createProducts({ ...req.body, productId: req.productId });
            if (res) {
                console.log("lksksksks")
                res.status(200).json({
                    success: true,
                    data: res,
                    error: null,
                    message: "proudcts successfully created"
                })
            }
            throw new AppError("Something went wrong");
        } catch (error) {
            next(error)
        }
    }

}

module.exports = productController;