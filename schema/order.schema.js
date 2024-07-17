const { z } = require("zod");

const orderSchema = z.object({
    productId: z.string({
        required_error: `product id  is required`,
        invalid_type_error: "Provide valid type",
    })
        .min(1, { message: `product id is required` }),
    quantity: z.number({
        required_error: `quantity is required`,
        invalid_type_error: "Provide valid type",
    })
        .min(1, { message: `quantity is required` }),
})

const changeOrderSchema = orderSchema.extend({
    changeType: z.enum(['increase', "decrease"], {
        required_error: `changetype is required`,
        invalid_type_error: "Provide valid type as increase or decrease",
    })
}).omit({
    quantity: true,
})

module.exports = { changeOrderSchema,orderSchema}