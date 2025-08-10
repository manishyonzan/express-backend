const loginRepository = require("../../repository/Authentication/loginRepository");
const { loginSchema } = require("../../schema/login.schema");
const { signupSchema } = require("../../schema/signup.schema");
const { validateSchema } = require("../../utils/helper");

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');



function toMySQLDateLocal(date) {
    const pad = n => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
        `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}


const loginController = {
    getLogin: async (req, res) => {
        try {
            const response = await loginRepository.getLogin();
            if (response) {


                console.log(response);

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

            let data = {
                id: req.body.id,
                name: req.body.name,
                password: req.body.password,
                signedDate: toMySQLDateLocal(new Date()),
                email: req.body.email
            }

            const response = validateSchema(data, signupSchema);
            if (response.errors?.hasError) {
                return res.status(400).send(response.errors.error);
            }

            let salt = bcrypt.genSaltSync(10);
            let hash = await bcrypt.hashSync(response.data.password, salt);
            let sendData = {
                ...response.data, token: hash
            }
            const returnResponse = await loginRepository.createLogin(sendData);

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
            const response = await validateSchema(req.body, loginSchema);
            if (response.errors?.hasError) {
                return res.status(401).json(response.errors.error);
            }
            let isValid = false;
            const returnResponse = await loginRepository.checklogin(response.data);


            const jwt = require('jsonwebtoken');

            const token = jwt.sign(
                { userId: req.body.id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );


            const transformedData = {
                token: token,
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


module.exports = loginController;