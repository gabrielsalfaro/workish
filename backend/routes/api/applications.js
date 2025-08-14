const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const { JobListing, JobApplication } = require('../../db/models');


// Create a new Application - POST /api/jobs/:jobId/apply
router.post(
    '/:jobId/apply', 
    requireAuth, 
    async (req, res) => {
  const { jobId } = req.params;
  const { status = 'pending' } = req.body;
  const userId = req.user.id;

  try {
    const job = await JobListing.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const newApplication = await JobApplication.create({
      userId,
      jobListingId: jobId,
      status
    });

    return res.status(201).json(newApplication);
  } catch (error) {
    console.error('Error creating job application:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;