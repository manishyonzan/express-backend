const wishlistRepository = require("../../repository/Order/wishlistRepository");
const AppError = require("../../utils/appError");



const WishlistController = {
    getWishList: async (req, res, next) => {
        try {

            const { id } = req.params
            const response = await wishlistRepository.get(id);
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
    createWishList: async (req, res, next) => {
        try {

            const data = req.body
            const response = await wishlistRepository.create(data);
            return response;

        } catch (error) {
            next(error)
        }
    },
    removeWishlist: async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await wishlistRepository.delete(id);
            if (response) {
                return res.status(200).json({
                    success: true,
                    message: "product removed successfully from wishlist"
                })
            }

            throw new AppError();

        } catch (error) {
            next(error)
        }
    },
    updateWishList: async (req, res, next) => {
        try {
            const { id } = req.params;
            let data = req.body;
            const response = await wishlistRepository.update(data);

            if (response) {
                return res.status(200).json({
                    success: true,
                    message: "product update successfully",
                })

            }
            throw new AppError();

        } catch (error) {
            next(error);
        }
    }
}


module.exports = WishlistController;