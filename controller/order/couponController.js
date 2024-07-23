const couponRepository = require("../../repository/Order/couponRepository");
const AppError = require("../../utils/appError");



const couponController = {
    getCoupon: async (req, res, next) => {
        try {
            const response = await couponRepository.getCoupon();
            if (response) {
                return res.status(200).json({
                    message: "fetched successfully",
                    success: true,
                })
            }
            throw new AppError();

        } catch (error) {
            next(error)
        }
    },

    getSingleCoupon: async (req, res, next) => {
        try {
            const { id } = req.params
            const response = await couponRepository.getSingleCoupon(id);
            if (response) {
                return res.status(200).json({
                    message: "fetched successfully",
                    success: true,
                })
            }
            throw new AppError();

        } catch (error) {
            next(error)
        }
    },
    createCoupon: async (req, res, next) => {
        try {

            const data = req.body
            const response = await couponRepository.createCoupon(data);

            if (response) {
                return res.status(200).json({
                    success: true,
                    message: "coupon created successfully."
                })
            }

            throw new AppError();


        } catch (error) {
            next(error)
        }
    },
    removeCoupon: async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await couponRepository.deleteCoupon(id);
            if (response) {
                return res.status(200).json({
                    success: true,
                    message: "coupon removed successfully."
                })
            }

            throw new AppError();

        } catch (error) {
            next(error)
        }
    },
    updateCoupon: async (req, res, next) => {
        try {
            const { id } = req.params;
            let data = req.body;
            const response = await couponRepository.updateCoupon(data);

            if (response) {
                return res.status(200).json({
                    success: true,
                    message: "coupon update successfully",
                })

            }
            throw new AppError();

        } catch (error) {
            next(error);
        }
    }
}


module.exports = couponController;