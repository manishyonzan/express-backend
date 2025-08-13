
const pool = require("../../database");
const orderRepository = require("../../repository/Order/orderRepository");
const { changeOrderSchema, orderSchema, orderItemsSchema } = require("../../schema/order.schema");
const { orderProductArraySchema } = require("../../schema/product.schema");
const AppError = require("../../utils/appError");
const { validateSchema } = require("../../utils/helper");
const SENDMAIL = require("./nodeMailer");


const orderController = {
    getOrder: async (req, res, next) => {
        try {
            const { id } = req.user;

            // console.log(id,"the id");

            const response = await orderRepository.getOrders(id);
            if (response) {
                return res.status(200).send({ success: true, data: response, error: null });
            }
            throw new AppError("Something Went wrong", 401);

        } catch (error) {
            next(error);
        }
    },
    createOrder: async (req, res, next) => {
        let orderItems = []


        try {
            const query = `select productId, price from producttable where productId in (${req.body.orderItems.map((item, index) => `?`).join(",")})`
            const parameters = [...req.body.orderItems.map((item, index) => item.id)]

            const response = await pool.query(query, parameters);

            const responseProductIdCheck = [...response[0].map((item, index) => item.productId)]


            const missingIds = parameters.filter(id => !responseProductIdCheck.includes(id));

            console.log(missingIds)
            if (missingIds.length > 0) {
                return res.status(400).json({
                    error: 'Some products not found',
                    missingProductIds: missingIds
                });
            }


            // secondMap is like a hashmap
            const secondMap = new Map(response[0].map(item => [item.productId, item.price]));

            orderItems = req.body.orderItems.map(item => ({
                id: item.id,
                price: secondMap.get(item.id) ?? 0,
                quantity: item.quantity
            }));




            // pool.releaseConnection();
            // response.release()


        } catch (error) {
            next(error)
        }

        try {
            // const { id } = req.user;
            const id = 12345
            const orderData = {
                userID: id,
                quantity: req.body.quantity,
                price_at_order: req.body.price_at_order,
                orderItems: orderItems
            }

            const validationSchema = validateSchema(orderData, orderSchema);

            if (!validationSchema) {
                return res.status(400).send(response.errors.error);
            }





            const response = await orderRepository.createOrder(orderData);
            if (response) {


                return res.status(200).json({
                    success: true,
                    message: "Order created successfully",
                    data: req.body.orderItems,
                    orderId: response
                })

                let mailOptions = {
                    from: "manish lama",
                    to: process.env.REMAIL,
                    subject: 'Order Created Successfully',
                    text: 'Your Product is ordered SuccessFully'
                };

                // the email sending is paused or commented for now

                // try {
                //     console.log("send email run")
                //     let mailsent = await SENDMAIL(mailOptions, (info) => {
                //         console.log("Email sent successfully");
                //         console.log("MESSAGE ID: ", info.messageId);
                //     });

                //     if (mailsent) {
                //         return res.status(200).json({
                //             success: true,
                //             error: null,
                //             message: "successfully created order"
                //         });
                //     }
                //     console.log("it is running")
                //     throw new AppError();
                // } catch (error) {
                //     next(error);
                // }
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


    },
    changeOrderStage: async (req, res, next) => {
        try {
            let userId = req.user.id;
            let productId = req.body.productId;

            // let response = await orderRepository.changeProductQuantity
            return res.status(200).json({
                success: true,
                message: "Updated Successfully"
            })

        } catch (error) {
            next(error)
        }
    }

}

module.exports = orderController;