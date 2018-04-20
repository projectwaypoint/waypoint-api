const Work = require('../models/work.model.js');

// Create and Save a new Work
exports.create = (req, res) => {
    // Validate request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Work title cannot be empty"
        });
    }

    // Create a Work
    const work = new Work({
        title: req.body.title
    });

    // Save Work in the database
    work.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Work."
        });
    });
};

// Retrieve and return all works from the database.
exports.findAll = (req, res) => {
    Work.find()
    .then(works => {
        res.send(works);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving works."
        });
    });
};

// Find a single work with a workId
exports.findOne = (req, res) => {
    Work.findById(req.params.workId)
    .then(work => {
        if(!work) {
            return res.status(404).send({
                message: "Work not found with id " + req.params.workId
            });            
        }
        res.send(work);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Work not found with id " + req.params.workId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving work with id " + req.params.workId
        });
    });
};

// Update a work identified by the workId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Work title cannot be empty"
        });
    }

    // Find work and update it with the request body
    Work.findByIdAndUpdate(req.params.workId, {
        title: req.body.title
    }, {new: true})
    .then(work => {
        if(!work) {
            return res.status(404).send({
                message: "Work not found with id " + req.params.workId
            });
        }
        res.send(work);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Work not found with id " + req.params.workId
            });                
        }
        return res.status(500).send({
            message: "Error updating work with id " + req.params.workId
        });
    });
};

// Delete a work with the specified workId in the request
exports.delete = (req, res) => {
    Work.findByIdAndRemove(req.params.workId)
    .then(work => {
        if(!work) {
            return res.status(404).send({
                message: "Work not found with id " + req.params.workId
            });
        }
        res.send({message: "Work deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Work not found with id " + req.params.workId
            });                
        }
        return res.status(500).send({
            message: "Could not delete work with id " + req.params.workId
        });
    });
};