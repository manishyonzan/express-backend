const orderRepository = require("../../repository/orderRepository");
const { changeOrderSchema } = require("../../schema/order.schema");
const { validateSchema } = require("../../utils/helper");

const changeOrderService = {
    validateChangeOrderSchema: async (req, res, next) => {

        try {
            let checkValue = {
                productId: req.body.productId,
                changeType: req.query.changeType,
            }
            const validate = validateSchema(checkValue, changeOrderSchema);
            if (validate.errors?.hasError) {
                return res.status(400).send(response.errors.error);
            }

            let orderData = {
                changeType: validate.data.changeType,
                productId: validate.data.productId,
                userId: req.user.id,
            }

            const response = await orderRepository.changeProductQuantity(orderData);
            if (response) return response;
        } catch (error) {
            next(error);
        }
    }

}

module.exports = changeOrderService;