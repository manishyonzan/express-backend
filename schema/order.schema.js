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
    userId: z.string({
        required_error: "user is required",
        invalid_type_error: "Provide valid type",
    }).min(1, { message: `user is required` }),
    stage: z.enum(["ordered", "cancelled", "pending", "completed"]),

    orderItems: z.array(z.string())
})

const changeOrderSchema = orderSchema.extend({
    changeType: z.enum(['increase', "decrease"], {
        required_error: `changetype is required`,
        invalid_type_error: "Provide valid type as increase or decrease",
    })
}).omit({
    quantity: true,
})



const orderItemsSchema = z.object({
    order_id: z.string({
        required_error: "Order id is required",
        invalid_type_error: "Provide valid type"
    }).min(1, { message: "Order id is required" }),

    product_id: z.string({
        required_error: "product id is required",
        invalid_type_error: "Provide valid type"
    }).min(1, { message: "Product id is required" }),

    quantity: z.number({
        required_error: "quantity is required",
        invalid_type_error: "Provide valid type"
    }).min(1, { message: "quantity is required" }),

    price_at_order: z.string({
        required_error: "quantity is required",
        invalid_type_error: "Provide valid type"
    }).min(1, { message: "Order id is required" }),
})


module.exports = { changeOrderSchema, orderSchema, orderItemsSchema }