const { z } = require("zod");

const adminSchema = z.object({
    name: z.string({
        required_error: "name is required",
        invalid_type_error: "invalid type (string required)"
    }),
    password: z.string({
        required_error: "password is required",
        invalid_type_error: "invalid type"
    }),
    position: z.string({
        required_error: "position is required",
        invalid_type_error: "invalid type"
    }),

})

const adminLoginSchema = adminSchema.omit({
    position: true
})

module.exports = { adminSchema, adminLoginSchema }