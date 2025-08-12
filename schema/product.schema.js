const { z } = require("zod")


const productSchema = z.object({
    productId: z.string({
        required_error: `product id  is required`,
        invalid_type_error: "Provide valid type",
    })
        .min(1, { message: `product id is required` }),

    price_at_order: z.number({
        required_error: `price is required`,
        invalid_type_error: "Provide valid type",
    })
        .min(1, { message: `price is required` }),

    image: z.string({
        required_error: `image  is required`,
        invalid_type_error: "Provide valid type",
    })
        .min(1, { message: `image is required` }),

    createdAt: z.string({
        required_error: ` created at is required`,
        invalid_type_error: "Provide valid type",
    }),
    quantity : z.number({
        required_error: `price is required`,
        invalid_type_error: "Provide valid type",
    })
        .min(1, { message: `price is required` }),


    name: z.string({
        required_error: `name  is required`,
        invalid_type_error: "Provide valid type",
    })
        .min(1, { message: `name is required` }),
})


const orderProduct = productSchema.omit({
    createdAt:true,
    name:true,
    image:true,    
})

const orderProductArraySchema = z.array(orderProduct)

module.exports = { orderProduct, productSchema, orderProductArraySchema}