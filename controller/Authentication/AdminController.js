const AdminRepository = require("../../repository/Authentication/AdminRepository");
const loginRepository = require("../../repository/Authentication/loginRepository");
const { adminSchema, adminLoginSchema } = require("../../schema/admin.schema");
const { loginSchema } = require("../../schema/login.schema");
const { signupSchema } = require("../../schema/signup.schema");
const AppError = require("../../utils/appError");
const { validateSchema } = require("../../utils/helper");

const bcrypt = require('bcryptjs');

const AdminAuthenticationController = {
    getLogin: async (req, res,next) => {
        try {
            const response = await AdminRepository.getLogin();
            if (response) {


                console.log(response);

                res.status(200).send(response);
            }

        } catch (error) {
           next(error);

        }
    },
    createLogin: async (req, res, next) => {
        try {
            const response = validateSchema(req.body, adminSchema);
            if (response.errors?.hasError) {
                return res.status(400).send(response.errors.error);
            }

            let salt = bcrypt.genSaltSync(10);
            let hash = await bcrypt.hashSync(response.data.password, salt);
            let sendData = {
                ...response.data, token: hash, id : Date.now().toString(36)
            }
            delete sendData.password;
            console.log(sendData);
            const returnResponse = await AdminRepository.create(sendData);

            if (returnResponse) {
                return res.status(200).json({
                    message:'Admin created successfully',
                    success : true,
                })
            }
            throw new AppError("Failed to create Admin");

        } catch (error) {
            next(error);

        }
    },
    checklogin: async (req, res, next) => {
        try {
            const response = validateSchema(req.body, adminLoginSchema);
            if (response.errors?.hasError) {
                return res.status(401).json(response.errors.error);
            }
            let isValid = false;
            const returnResponse = await AdminRepository.login(response.data);

            console.log(returnResponse)

            const transformedData = {
                token: returnResponse[0].token,
            };

            isValid = await bcrypt.compare(response.data.password, returnResponse[0].token);

            return res.status(isValid ? 200 : 400).json(isValid > 0 ? {
                message: "Successfullly fetched",
                data: transformedData,
                error: null,
            } : {
                message: "login with correct credentials",
                data: []
            });

        } catch (error) {
            next(error);

        }
    }
}


module.exports = AdminAuthenticationController;