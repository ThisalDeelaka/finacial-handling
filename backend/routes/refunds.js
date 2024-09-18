const express = require('express');
const multer = require('multer');
const Refund = require('../models/Refund'); // Import the Refund model

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Name files uniquely
  }
});

const upload = multer({ storage: storage });

// Route to handle refund requests
router.post('/request', upload.array('images', 3), async (req, res) => {
  try {
    // Extract the form data
    const { orderId, reason, amount, comments } = req.body;

    // Handle the case where no files are uploaded
    const images = req.files && req.files.length > 0 ? req.files.map(file => file.path) : [];

    // Create a new Refund document with the data
    const newRefund = new Refund({
      orderId,
      reason,
      amount,
      comments,
      images // This can be an empty array if no files are uploaded
    });

    // Save the new Refund document to the database
    await newRefund.save();

    // Respond with the created document
    res.status(201).json(newRefund);
  } catch (error) {
    console.error('Error saving refund request:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const refunds = await Refund.find(); // Fetch all refund requests
    res.status(200).json(refunds);
  } catch (error) {
    console.error('Error fetching refunds:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Route to update refund status (Accept/Reject)
router.put('/update-status/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const refund = await Refund.findById(req.params.id);
    if (!refund) {
      return res.status(404).json({ error: 'Refund request not found' });
    }

    refund.status = status;
    await refund.save();

    res.status(200).json({ message: 'Refund status updated successfully', refund });
  } catch (error) {
    console.error('Error updating refund status:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const refund = await Refund.findByIdAndDelete(req.params.id);
    if (!refund) {
      return res.status(404).json({ error: 'Refund request not found' });
    }
    res.status(200).json({ message: 'Refund deleted successfully' });
  } catch (error) {
    console.error('Error deleting refund:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
