const orderRepository = require("../../repository/orderRepository");
const AppError = require("../../utils/appError");


const orderController = {
    getOrder: async (req, res, next) => {
        try {
            const { id } = req.user;
            console.log(id);
            const response = await orderRepository.getOrders(id);
            if (response) {
                res.status(200).send({ success: true, data: response, error: null });
            }
            throw new AppError("Something Went wrong", 401);

        } catch (error) {
            next(error);
        }
    },
    createOrder: async (req, res, next) => {
        try {
            const { id } = req.user;
            const orderData = {
                userID: req.user,
                productId: req.body.productId,
                quantity: req.body.quantity,
            }
            const response = await orderRepository.createOrder(orderData);
            if (response) {
                return res.status(200).json({
                    success: true,
                    error: null,
                    message: "successfully created order"
                })
            }
            throw new AppError("Something went wrong");

        } catch (error) {
            next(error)
        }
    },
    deleteOrder: async (req, res, next) => {
        try {
            const { id } = req.user;
            const response = await orderRepository.deleteOrder(id);

            if (response) return res.status(200).json({
                success: true,
                message: "Order deleter successfully"
            })
            throw new AppError("Something Went wrong");

        } catch (error) {
            next(error);

        }
    },
    removeProductFromOrder: async (req, res, next) => {
        try {
            const { id } = req.user;
            const { productId } = req.params;

            const response = await orderRepository.removeProductFromOrder(productId,id);
            if (response) return res.status(200).json({
                success: true,
                message: "item deleted successfully"
            })
            throw new AppError();
        } catch (error) {
            next(error)
        }
    }

}

module.exports = orderController;