const wishlistRepository = require("../../repository/Order/wishlistRepository")



const controller = {
    getWishList: async (req, res, next) => {
        try {

            const { id } = req.params
            const response = await wishlistRepository.get(id);
            return response;

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
    }
}