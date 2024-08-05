
const cartRepository = require("../../repository/Order/cartRepository");
const AppError = require("../../utils/appError");



const CartController = {
    getCart: async (req, res, next) => {
        try {

            // const { id } = req.params
            const { id } = req.user;
            const response = await cartRepository.get(id);
            if (response) {
                return res.status(200).json({
                    message: "fetched successfully",
                    data: response,
                    success: true,
                })
            }
            throw new AppError();

        } catch (error) {
            next(error)
        }
    },
    createCart: async (req, res, next) => {
        try {

            let data = req.body;
            const { id } = req.user;
            data = { ...data, userId: id }
            const response = await cartRepository.create(data);

            if (response) {
                return res.status(200).json({
                    message: "cart created successfully",
                    data: { ...response, userId: undefined },
                    success: true,
                })
            }
            throw new AppError();

        } catch (error) {
            next(error)
        }
    },
    removeCart: async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await cartRepository.delete(id);
            if (response) {
                return res.status(200).json({
                    success: true,
                    message: "product removed successfully from cart"
                })
            }

            throw new AppError();

        } catch (error) {
            next(error)
        }
    },
    updateCart: async (req, res, next) => {
        try {
            const { id } = req.params;
            let data = req.body;
            const response = await cartRepository.update(data);

            if (response) {
                return res.status(200).json({
                    success: true,
                    message: "product update successfully",
                })

            }
            throw new AppError();

        } catch (error) {
            next(error);
        }
    }
}


module.exports = CartController;