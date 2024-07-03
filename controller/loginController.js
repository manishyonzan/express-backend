const loginRepository = require("../repository/loginRepository");
const { loginSchema } = require("../schema/login.schema");
const { signupSchema } = require("../schema/signup.schema");
const { validateSchema } = require("../utils/helper");


const loginController = {
    getLogin: async (req, res) => {
        try {
            const response = await loginRepository.getLogin();
            if (response) {
                res.status(200).send(response);
            }

        } catch (error) {
            res.status(error.statusCode).send({
                message: error.message,
            })

        }
    },
    createLogin: async (req, res, next) => {
        try {

            const response = validateSchema(req.body, signupSchema);
            if (response.errors?.hasError) {
                return res.status(400).send(response.errors.error);

            }
            const returnResponse = await loginRepository.createLogin(response.data);

            res.status(200)
                .json({
                    message: "Login created successfully",
                    success: returnResponse.affectedRows > 0
                });

        } catch (error) {
            next(error);

        }
    },
    checklogin: async (req, res, next) => {
        try {
            const response = validateSchema(req.body, loginSchema);
            if (response.errors?.hasError) {
                return res.status(401).json(response.errors.error);
            }
            const returnResponse = await loginRepository.checklogin(response.data);

            const transformedData = returnResponse[0].map(item => ({
                name: item.name,
                password: item.password,
                signedDate: item.signedDate,
            }))
            return res.status(returnResponse[0].length > 0 ? 200 : 400).json(returnResponse[0].length > 0 ? {
                message: "Successfullly fetched",
                data: transformedData,
                error: null,
            } : {
                message: "NO data found",
                data: []
            });

        } catch (error) {
            next(error);

        }
    }
}


module.exports = loginController;