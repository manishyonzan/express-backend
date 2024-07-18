
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
            console.log(req.productId, "the e")
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
    },
    deleteProduct: async (req, res, next) => {
        try {
            const { productId } = req.params;

            const response = await productRepository.deleteProduct(productId);

            if (response) return res.status(200).json({
                success: true,
                message: "Product deleted successfully"
            })
            throw new AppError();

        } catch (error) {
            next(error)
        }
    },
    updateProduct: async (req, res, next) => {
        try {
            let product = {
                price: req.body.price,
                image: req.body.image,
                name: req.body.name,
                productId: req.params.productId
            }
            let valueToPass = {
            }

            Object.entries(product).forEach(([key, val]) => {
                if (val) {
                    valueToPass[`${key}`] = val
                }
            }
            )

            const response = await productRepository.updateProduct(valueToPass);
            if (response) return res.status(200).json({
                message: "product updated successfully",
                success: true,
                error: null,
            })
            throw new AppError();

        } catch (error) {
            next(error)
        }
    }

}

module.exports = productController;