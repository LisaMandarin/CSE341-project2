const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const Moment = require("../models/momentModel")

exports.findAll = async (req, res, next) => {
    // #swagger.description = "Retrieve all moments in the moment collection"
    try {
        const result = await Moment.find()
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                data: result
            })
        } else {
            return res.status(200).json({
                success: true,
                data: [],
                message: "No moments found."
            })
        }
    } catch (error) {
        next(error)
    }
}
