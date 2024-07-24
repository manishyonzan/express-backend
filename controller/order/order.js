
const orderRepository = require("../../repository/Order/orderRepository");
const { changeOrderSchema } = require("../../schema/order.schema");
const AppError = require("../../utils/appError");
const { validateSchema } = require("../../utils/helper");
const SENDMAIL = require("./nodeMailer");


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
                userID: id,
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

            const response = await orderRepository.removeProductFromOrder(productId, id);
            if (response) return res.status(200).json({
                success: true,
                message: "item deleted successfully"
            })
            throw new AppError();
        } catch (error) {
            next(error)
        }
    },
    changeProductquantity: async (req, res, next) => {
        try {
            let checkValue = {
                productId: req.params.productId,
                changeType: req.query.changeType,
            }
            const validate = validateSchema(checkValue, changeOrderSchema);
            if (validate.errors?.hasError) {
                return res.status(400).send(validate.errors.error);
            }

            let orderData = {
                changeType: validate.data.changeType,
                productId: validate.data.productId,
                userId: req.user.id,
            }

            const response = await orderRepository.changeProductQuantity(orderData);
            if (response) return res.status(200).json({
                success: true,
                message: "Update Successfully"
            });
        } catch (error) {
            next(error);
        }
    },
    sendMessage: async (req, res, next) => {
        let mailOptions = {
            from: process.env.EMAIL,
            to: 'lmanish931@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };
        let i = await SENDMAIL(mailOptions, (info) => {
            console.log("Email sent successfully");
            console.log("MESSAGE ID: ", info.messageId);
        });

        if (i) {
            return res.status(200).josn({
                message: "email sent successfully",
            })
        }

    }

}

module.exports = orderController;