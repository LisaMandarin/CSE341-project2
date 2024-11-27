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
            return res.status(404).json({
                success: true,
                data: [],
                message: "No moments found."
            })
        }
    } catch (error) {
        next(error)
    }
}

exports.findById = async (req, res, next) => {
    // #swagger.description = "Retrieve a particular moment by ID"
    try {
        const id = req.params.id
        if (!ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            })
        }
        const result = await Moment.findById(id)
        if (!result) {
            return res.status(400).json({
                success: false,
                message: "Moment not found"
            })
        }
        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

exports.findByQuery = async (req, res, next) => {
    // #swagger.description = 'Find a particular moment by query of {"key": "value"}'
    try {
        const query = req.body
        if (!query || Object.keys(query).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Query parameters are required"
            })
        }

        let momentQuery = {}

        for ( const key in query) {
            if (key === "actors") {
                momentQuery[key] = { $in: query[key]}
            } else {
                momentQuery[key] = query[key]
            }
        }

        const result = await Moment.find(momentQuery) 
        
        if (!result || result.length === 0){
            return res.status(404).json({
                success: false,
                message: "No moment(s) found"
            })
        }
        return res.status(200).json({
            success: true,
            data: result
        })
        
    } catch (error) {
        next(error)
    }
}

exports.createMoment = async (req, res, next) => {
    // #swagger.description = "Create a new moment"
    try {
        const {
            season,
            episode,
            title,
            airDate,
            plotSummary,
            youtubeURL,
            actors
        } = req.body

        if (!season || !episode || !title || !airDate || !plotSummary || !youtubeURL || !actors) {
            return res.status(400).json({
                success: false,
                message: "Invalid parameters: All fields are required"
            })
        }

        const newMoment = new Moment({
            season,
            episode,
            title,
            airDate,
            plotSummary,
            youtubeURL,
            actors
        })
        const result = await newMoment.save()
        return res.status(201).json({
            success: true,
            data: result
        })

    } catch (error) {
        next(error)
    }
}

exports.updateMomentById = async (req, res, next) => {
    // #swagger.description = "Update a particular moment by ID"
    try {
        const id = req.params.id
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            })
        }

        const {
            season,
            episode,
            title,
            airDate,
            plotSummary,
            youtubeURL,
            actors
        } = req.body

        if (!season || !episode || !title || !airDate || !plotSummary || !youtubeURL || !actors) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const moment = { season, episode, title, airDate, plotSummary, youtubeURL, actors}

        const result = await Moment.findByIdAndUpdate(id, moment, { new: true})

        if (!result) {
            return res.status(404).json({
                success: false,
                message: `Moment with ${id} not found`
            })
        }

        return res.status(200).json({
            success: true,
            data: result,
            message: `Moment with ID ${id} updated successfully`
        })

    } catch (error) {
        next(error)
    }
}

exports.deleteMomentById = async (req, res, next) => {
    // #swagger.description = "Delete a particular moment by ID"
    try {
        const id = req.params.id
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: true,
                message: "Invalid ID format"
            })
        }

        const result = await Moment.findByIdAndDelete(id)
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Moment not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: `Moment with ID ${id} deleted successfully`,
            result
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteAll = async (req, res, next) => {
    // #swagger.description = "Delete all moments in the moment collection"
    try {
        const result = await Moment.deleteMany({})

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "No moment found to delete"
            })
        }

        return res.status(200).json({
            success: true,
            message: "All moments deleted successfully",
            result
        })

    } catch (error) {
        next(error)
    }
}