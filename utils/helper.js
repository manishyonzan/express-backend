const { ZodError, } = require("zod")


const validateSchema = (data, schema) => {
    try {
        const response = schema.parse(data);

        return { data: response };
    } catch (error) {
        if (error instanceof ZodError) {
            let errorState = {};
            let hasError = false;
            error.errors.forEach(
                (err) => (errorState[err.path[0].toString()] = err.message)
            );
            error.errors.length > 0 && (hasError = true);

            return { data: data, errors: { error: errorState, hasError } };
        }

        throw error;
    }
};


module.exports = { validateSchema }