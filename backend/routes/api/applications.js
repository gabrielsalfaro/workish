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


// Delete existing Application - DELETE /api/applications/:applicationId
router.delete(
    '/:applicationId', 
    requireAuth, 
    async (req, res) => {
        const { applicationId } = req.params;
        const userId = req.user.id;

        try {
            const application = await JobApplication.findByPk(applicationId);

            if (!application) {
                return res.status(404).json({ message: 'Application not found' });
            }

            if (application.userId !== userId) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            await application.destroy();

            return res.status(200).json({ message: 'Application deleted successfully' });
        } catch (error) {
            console.error('Error deleting application:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
});


// Update Application status - PUT /api/applications/:applicationId/status
router.put(
    '/:applicationId/status', 
    requireAuth, 
    async (req, res) => {
        const { applicationId } = req.params;
        const { status } = req.body;
        const userId = req.user.id;

        try {
            const application = await JobApplication.findByPk(applicationId);

            if (!application) {
                return res.status(404).json({ message: 'Application not found' });
            }

            const job = await JobListing.findByPk(application.jobListingId);

            if (job.employerId !== userId) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            application.status = status;
            await application.save();

            return res.status(200).json({ message: 'Application status updated', application });
        } catch (error) {
            console.error('Error updating status:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
});

module.exports = router;