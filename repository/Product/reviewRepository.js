const pool = require("../../database");
const AppError = require("../../utils/appError");

class reviewRepository {
    async getReview(productId) {
        try {

            const query = `select rating,review,producttable.name from review  left join producttable on producttable.productId=review.productId where review.productId=?`;
            const parameters = [productId];
            const response = pool.query(query, parameters);

            if (response[0].length > 0) {
                return response[0];
            }
            throw new AppError()
        } catch (error) {
            throw error;
        }
    };
    async createReview(review) {
        try {
            const query = `insert into review (${Object.keys(review).map((item) => `${item}`).join(",")}) values (${Object.keys(review).map((item) => "?").join(",")})`;
            const parameters = [...Object.values(review)];

            const response = pool.query(query, parameters);

            if (response[0].affectedRows > 0) {
                return response[0];
            }

            if (response.affectedRows < 1) throw new AppError("Review not found");

            throw new AppError();

        } catch (error) {
            throw error;
        }
    }

    async updateReview(review,userId) {
        try {
            let reviewID = review.id;
            delete review.id;
            const query = `update review set  ${Object.keys(product).map((key) => `${key}=?`).join(",")} where id=? and userId=?`;
            const parameters = [...Object.values(review), reviewID,userId];


            const response = pool.query(query, parameters);

            if (response[0].affectedRows > 0) {
                return response[0];
            }

            if (response.affectedRows < 1) throw new AppError("Review not found");

            throw new AppError();

        } catch (error) {
            throw error;
        }
    }
    async deleteReview(id,userID) {
        try {
            const query = `delete from review where id=? and userId=?`
            const parameters = [id,userID];

            const response = pool.query(query, parameters);

            if (response[0].affectedRows > 0) {
                return response[0];
            }

            if (response.affectedRows < 1) throw new AppError("Review not found");

            throw new AppError();

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new reviewRepository();