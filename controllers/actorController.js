const mongoose = require("mongoose")
const Actor = require("../models/actorModel")

exports.findAll = async (req, res, next) => {
    try {
        const result = await Actor.find()
        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(400).json({ message: "No actor found."})
        }
    } catch (error) {
        next(error)
    }
}