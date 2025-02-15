// const pool = require("../database");

const { response } = require("express");
const pool = require("../../database");
const AppError = require("../../utils/appError");

class LoginRepository {
    async getLogin() {
        try {
            const response = await pool.query('select * FROM tablename');
            return response[0];

        } catch (error) {
            const err = new AppError("Something Went wrong", 401);
            throw err

        }
    };
    async createLogin(logindata) {
        try {
            const query = `
        insert into tablename (${Object.keys(logindata).map(key => `${key}`).join(", ")})
        values (${Object.keys(logindata).map(key => `?`).join(", ")})
    `;
            console.log("the query", query);
            const parameters = [...Object.values(logindata)];
            console.log(parameters)

            const response = await pool.query(query, parameters);

            return response[0];
        } catch (error) {
            if (error.code == "ER_DUP_ENTRY") {
                const err = new AppError(`Data with this id already exist`, 404);
                throw err;

            }
            throw error;
        }
    };

    async checklogin(data) {
        try {
            const query = `select * from tablename where id=?`;
            const parameters = [data.id];
            const response = await pool.query(query, parameters);
            console.log(response);
            return response[0];

        } catch (error) {
            console.log(error);
            const err = new AppError("something went wrong", 401);

            throw err;

        }
    }

}

module.exports = new LoginRepository();