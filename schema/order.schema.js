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