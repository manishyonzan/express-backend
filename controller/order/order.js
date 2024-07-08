const orderRepository = require("../../repository/orderRepository");
const AppError = require("../../utils/appError");


const orderController = {
    getOrder: async (req, res, next) => {
        try {
            const { id } = req.params;
            console.log(id);
            const response = await orderRepository.getOrders(id);
            if (response) {
                res.status(200).send({ success: true, data: response, error: null});
            }
            throw new AppError("Something Went wrong", 401);

        } catch (error) {
            next(error);

        }
    },
}

module.exports = orderController;