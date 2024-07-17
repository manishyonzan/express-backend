const { z } = require('zod');

const loginSchema = z.object({
    id: z.number({
        required_error: "ID is reqired",
        invalid_type_error: "Invalid type"
    })
        .min(1, { message: "ID is required" }),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Provide valid type"
    })
        .min(6, { message: "Length odf 6 is required" })
})


module.exports = { loginSchema }