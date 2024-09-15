// backend/routes/refunds.js
const express = require('express');
const Refund = require('../models/Refund');

const router = express.Router();

// Create a new refund request
router.post('/', async (req, res) => {
  try {
    const refund = new Refund(req.body);
    await refund.save();
    res.status(201).json(refund);
  } catch (error) {
    res.status(400).json({ message: 'Error creating refund', error });
  }
});

// Get all refunds
router.get('/', async (req, res) => {
  try {
    const refunds = await Refund.find();
    res.status(200).json(refunds);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching refunds', error });
  }
});

// Get a specific refund by ID
router.get('/:id', async (req, res) => {
  try {
    const refund = await Refund.findById(req.params.id);
    if (!refund) {
      return res.status(404).json({ message: 'Refund not found' });
    }
    res.status(200).json(refund);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching refund', error });
  }
});

// Update a refund request by ID
router.put('/:id', async (req, res) => {
  try {
    const refund = await Refund.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!refund) {
      return res.status(404).json({ message: 'Refund not found' });
    }
    res.status(200).json(refund);
  } catch (error) {
    res.status(400).json({ message: 'Error updating refund', error });
  }
});

// Delete a refund request by ID
router.delete('/:id', async (req, res) => {
  try {
    const refund = await Refund.findByIdAndDelete(req.params.id);
    if (!refund) {
      return res.status(404).json({ message: 'Refund not found' });
    }
    res.status(200).json({ message: 'Refund deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting refund', error });
  }
});

module.exports = router;
