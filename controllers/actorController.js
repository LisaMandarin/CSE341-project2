const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const Actor = require("../models/actorModel")

exports.findAll = async (req, res, next) => {
    try {
        const result = await Actor.find()
        if (result.length > 0) {
            res.status(200).json({
                success: true,
                data: result
            })
        } else {
            res.status(200).json({
                success: true,
                data: [],
                message: "No actors found."})
        }
    } catch (error) {
        next(error)
    }
}

exports.findById = async (req, res, next) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({
                success: false,
                message: "Invalid ID format"})
        }
        const id = new ObjectId(req.params.id)
        const result = await Actor.findById(id)
        if (!result) {
            res.status(400).json({
                success: false,
                message: "Actor not found"})
        }
        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}