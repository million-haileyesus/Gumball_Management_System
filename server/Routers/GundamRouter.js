// GundamRouter.js
const express = require('express');
const router = express.Router();
const Gundam = require('../models/Gundam');

// Get all Gundams
router.get('/', async (req, res) => {
    try {
        const gundams = await Gundam.find({});
        res.json(gundams);
    } catch (err) {
        console.error('Error fetching Gundams:', err);
        res.status(500).json({ error: 'Failed to fetch Gundams' });
    }
});

// Add a new Gundam
router.post('/', async (req, res) => {
    const { ModelName, Grade, Scale, Progress } = req.body;
    const gundam = new Gundam({ ModelName, Grade, Scale, Progress });

    try {
        const newGundam = await gundam.save();
        res.status(201).json(newGundam);
    } catch (error) {
        console.error('Error adding new Gundam:', error);
        res.status(500).json({ error: 'Failed to add new Gundam' });
    }
});

// Update a Gundam
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { ModelName, Grade, Scale, Progress } = req.body;

    try {
        const updatedGundam = await Gundam.findByIdAndUpdate(
            id,
            { ModelName, Grade, Scale, Progress },
            { new: true } // Return the updated document
        );

        if (updatedGundam) {
            res.json(updatedGundam); // Respond with the updated Gundam object
        } else {
            res.status(404).json({ error: 'Gundam not found' }); // No matching Gundam found
        }
    } catch (error) {
        console.error('Error updating Gundam:', error);
        res.status(500).json({ error: 'Failed to update Gundam' }); // Internal server error
    }
});


// Delete a Gundam
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedGundam = await Gundam.findByIdAndDelete(id);

        if (deletedGundam) {
            res.status(204).send(deletedGundam);
        } else {
            res.status(404).send(`Gundam not found with ID:${id}`);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
