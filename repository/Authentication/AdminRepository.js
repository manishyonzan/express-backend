const pool = require("../../database");
const AppError = require("../../utils/appError");

class AdminRepository {
    async get() {

        try {
            const response = await pool.query("select name,position from admin");
            if (response) {
                return response[0]
            }
            throw new AppError();

        } catch (error) {
            throw error
        }
    };

    async create(admin) {
        try {
            const query = `insert into admin (${Object.keys(admin).map((item) => `${item}`).join(",")}) 
            values (${Object.keys(admin).map((item) => `?`).join(",")})
            `;
            console.log(query)
            const parameters = [...Object.values(admin)];
            const [response] = await pool.query(query, parameters);

            if (response.affectedRows > 0) {
                return admin;
            }

            throw new AppError();

        } catch (error) {
            throw error;
        }
    };



    async delete(name) {
        try {
            const query = "delete from admin where name=?";
            const parameters = [name]
            const [response] = pool.query(query,parameters);
            if (response.affectedRows > 0){
                return response;
            }
            throw  new AppError();
        } catch (error) {
            throw error
        }
    };
    async login(admin) {

        try {
            const query ="select * from admin where name=?"
            const parameters = admin.name;
            const [response] = await pool.query(query,parameters);
            if(response) return response;
            throw new AppError()
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AdminRepository();