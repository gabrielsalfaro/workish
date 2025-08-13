const express = require('express');
const { JobListing, User, Company } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');


// Get JobListing by :jobId - GET /api/jobs/:jobId
router.get('/:jobId', async (req, res) => {
    try {
        let { jobId } = req.params;
        const job = await JobListing.findByPk(jobId, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'firstName', 'lastName', 'email']
                },
                {
                    model: Company,
                    attributes: ['id', 'name', 'city', 'state', 'website', 'email', 'phone']
                },
            ]
        });

        if (!job) {
            return res.status(404).json({ message: 'Job not found'});
        }
        return res.json(job)

        // const jobData = job.toJSON();
        // console.log(jobData);

        // const finalJob = {
        //     id: jobData.id,
        //     employerId: jobData.employerId,
        //     companyID: jobData.companyID,
        //     city: jobData.city,
        //     state: jobData.state,
        //     title: jobData.title,
        //     description: jobData.description,
        // }
        // return res.status(200).json(finalJob);
    } catch (error) {
        console.error('Error in /api/jobs/:jobId', error);
        return res.status(500).json({ message: 'Internal Server Error'})
    }

})


// Create a new job listing - POST /api/jobs/new
router.post(
  '/new', 
  requireAuth,
  async (req, res, next) => {
    try {
      const { title, description, city, state, companyId } = req.body;
      const employerId = req.user.id;

      const newJob = await JobListing.create({
        employerId,
        companyId,
        title,
        description,
        city,
        state
      });

      return res.status(201).json(newJob);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error'})
    }
});


// Update a job listing - PUT /api/jobs/:jobId
router.put('/:jobId', 
  requireAuth,
  async (req, res, next) => {
    try {
      const { jobId } = req.params;
      const { title, description, city, state, companyId } = req.body;
      const userId = req.user.id;

      const job = await JobListing.findByPk(jobId);

      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }

      if (job.employerId !== userId) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      // Update fields
      job.title = title;
      job.description = description;
      job.city = city;
      job.state = state;
      job.companyId = companyId;

      await job.save();

      return res.status(200).json(job);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error'})
    }
});


// Delete a job listing - DELETE /api/jobs/:jobId
router.delete('/:jobId', 
  requireAuth,
  async (req, res, next) => {
    try {
      const { jobId } = req.params;
      // const { title, description, city, state, companyId } = req.body;
      const userId = req.user.id;

      const job = await JobListing.findByPk(jobId);

      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }

      if (job.employerId !== userId) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      // Update fields
      // job.title = title;
      // job.description = description;
      // job.city = city;
      // job.state = state;
      // job.companyId = companyId;

      await job.destroy();

      return res.status(200).json({ message: 'Successfully deleted' });
    } catch (error) {
      console.error("Error in DELETE /api/spots/:spotId:", error);
      next(error);
      return res.status(500).json({ message: 'Internal Server Error'})
    }
});


module.exports = router;