// import { z } from "zod";
const { z } = require('zod');

// z

// creating a schema for strings
const signupSchema = z.object({
    id: z.number({
        required_error: `id is required`,
        invalid_type_error: `Provide valid type`,
    })
        .min(1, { message: "Must be a positive number" }),
    name: z.string(),
    password: z.string(),
    signedDate: z.string(),
});


const SignupSchemaInsert = signupSchema.omit({
    id: true,
})

module.exports = { signupSchema, SignupSchemaInsert }

