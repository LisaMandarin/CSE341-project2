const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const Actor = require("../models/actorModel")

exports.findAll = async (req, res, next) => {
    try {
        const result = await Actor.find()
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                data: result
            })
        } else {
            return res.status(200).json({
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
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"})
        }
        const id = new ObjectId(req.params.id)
        const result = await Actor.findById(id)
        if (!result) {
            return res.status(400).json({
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

exports.findByQuery = async (req, res, next) => {
    try {
        const query = req.body
        if (!query || Object.keys(query).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Query parameters are required"
            })
        }

        actorQuery = {}
        for (const key in query) {
            if (key === "seasons") {
                actorQuery[key] = { $in: query[key]}
            } else if ( key === "character") {
                actorQuery[key] = { $regex: query[key]}
            } else {
                {actorQuery[key] = query[key]}
            }
        }

        const result = await Actor.find(actorQuery)
        if (!result || result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No actor(s) found"
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

exports.createActor = async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            gender,
            character,
            dateOfBirth,
            nationality,
            firstAppear,
            seasons
        } = req.body
        if (!firstName || !lastName || !gender || !character || !firstAppear || !seasons) {
            return res.status(400).json({
                success: false,
                message: "Invalid parameters: firstName, lastName, gender, character, firstAppear and seasons fields are required"
            })
        }
        
        const newActor = new Actor({
            firstName,
            lastName,
            gender,
            character,
            dateOfBirth,
            nationality,
            firstAppear,
            seasons
        })
        const result = await newActor.save();
        return res.status(201).json({
            success: true,
            data: result
        })
        
    } catch (error) {
        next(error)
    }
}

exports.updateActorById = async (req, res, next) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            })
        }
        const id = new ObjectId(req.params.id)

        delete req.body._id  // Sanitize the req.body

        const result = await Actor.updateOne({ _id: id }, req.body)
        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: `Actor with ${req.params.id} not found`
            })
        }
        return res.status(200).json({
            success: true,
            data: result,
            message: `Actor with ID ${req.params.id} updated successfully`
        })

    } catch (error) {
        next(error)
    }
}

exports.deleteActorById = async (req, res, next) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            })
        }
    
        const id = new ObjectId(req.params.id)

        const result = await Actor.deleteOne({ _id: id })
        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Actor not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: `Actor with ID ${req.params.id} deleted successfully`,
            result
        })
        
    
    } catch (error) {
        next(error)
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        const result = await Actor.deleteMany({})
        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "No actors found to delete"
            })
        }
        return res.status(200).json({
            success: true,
            message: "All actors deleted successfully",
            result
        })

    } catch (error) {
        next(error)
    }
}