const reviewRepository = require("../../repository/Product/reviewRepository");
const AppError = require("../../utils/appError");


const reviewController = {

    getReview: async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await reviewRepository.getReview(id);
            if (response) {
                return res.status(200).json({
                    data: response,
                    success: true,
                    message: "successfully fetched review"
                })
            }
            throw new AppError();

        } catch (error) {
            next(error);
        }
    },

    createReview: async (req, res, next) => {
        try {
            const review = req.body;
            const response = await reviewRepository.createReview(review);
            if (response) {
                return res.status(200).json({
                    success: true,
                    message: "successfully created review"
                })
            }
            throw new AppError();

        } catch (error) {
            next(error);
        }
    },

    updateReview: async (req, res, next) => {
        try {
            const review = req.body;
            const { id } = req.user
            const response = await reviewRepository.updateReview(review, id);

            if (response) {
                return res.status(200).json({
                    success: true,
                    message: "review updated successfully",
                })

            }
            throw new AppError();
        } catch (error) {
            throw error;
        }
    },

    deleteReview: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { id: userId } = req.user;

            const response = await reviewRepository.deleteReview(id, userId);

            if (response) {
                return res.status(200).json({
                    success: true,
                    message: "successfully deleted review"
                })
            }

        } catch (error) {
            next(error);
        }
    }
}

module.exports = reviewController;