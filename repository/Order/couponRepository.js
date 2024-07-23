const pool = require("../../database");
const AppError = require("../../utils/appError");

class couponRepository {
    async getCoupon() {
        try {
            const query = ``;
            const params = [];
            const response = await pool.query(query, params);
            if (response[0].length > 0) {
                return response[0];
            }
            throw new AppError();
        } catch (error) {
            throw error
        }
    };

    async getSingleCoupon(id) {
        try {
            const query = ``;
            const params = [];
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
            const query = ``;
            const params = [];
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

            const query = ``;
            const params = [];
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
            const query = ``;
            const params = [];
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