const pool = require("../../database");
const AppError = require("../../utils/appError");

class couponRepository {
    async getCoupon() {
        try {
            console.log("run");
            const query = `select * from coupon`;
            // const params = [];
            const response = await pool.query(query);
            console.log(response)
            // if (response[0].length > 0) {
            //     return response[0];
            // }

            if (Array.isArray(response[0])) {
                if (response[0].length === 0) {
                    return response[0];
                }
                return response[0];
            }

            throw new AppError();
        } catch (error) {
            throw error
        }
    };

    async getSingleCoupon(id) {
        try {
            const query = `select productID, code, amount, startDate,endDate from coupon where code=?`;
            const params = [id];
            const response = await pool.query(query, params);
            if (response[0].length > 0) {
                return response[0];
            }
            throw new AppError();

        } catch (error) {
            throw error
        }
    };
    async createCoupon(coupon) {
        try {
            let create_coupon = {
                productID: coupon.productID,
                code: coupon.code,
                quantity: coupon.quantity,
                amount: coupon.amount,
                startDate: coupon.startDate,
                endDate: coupon.endDate
            }
            const query = `insert into coupon (productID, code,quantity, amount, startDate,endDate) values  (${Object.keys(create_coupon).map(key => `?`).join(", ")})`;
            const params = [...Object.values(create_coupon)];

            const response = await pool.query(query, params);
            if (response[0].length > 0) {
                return response[0];
            }
            throw new AppError();
        } catch (error) {
            throw error
        }
    }
    async deleteCoupon(id) {
        try {

            const query = `delete from coupon where code=?`;
            const params = [id];
            const response = await pool.query(query, params);

            if (response[0].affectedRows > 0) {
                return response[0];
            }
            throw new AppError();
        } catch (error) {
            throw error
        }
    }
    async updateCoupon(coupon) {
        try {
            let updateid = coupon.code;


            const query = `update coupon set ${Object.keys(coupon).map((key) => `${key}=?`).join(",")} where code=?`;
            const params = [...Object.values(coupon), updateid];


            const response = await pool.query(query, params);
            if (response[0].affectedRows > 0) {
                return response[0];
            }
            throw new AppError();

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new couponRepository();