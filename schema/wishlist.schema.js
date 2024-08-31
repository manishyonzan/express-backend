const { z } = require("zod");

const wishlistSchema = z.object({
    productId: z.string({
        required_error: `product id  is required`,
        invalid_type_error: "Provide valid type",
    }).min(1, { message: `product id is required` }),
})

module.exports = { wishlistSchema}