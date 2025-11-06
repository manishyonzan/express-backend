const { z } = require("zod");


const cartSchema = z.object({
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
})

const cartUpdateSchema = cartSchema.extend({
    direction : z.enum["increase", "decrease"],
}).omit({
    quantity: true,
})

module.exports = { cartSchema, cartUpdateSchema }