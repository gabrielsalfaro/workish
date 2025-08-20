const express = require('express');
const { JobListing, User, Company, JobApplication } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
const { sequelize } = require('../../db/models');


// Get all JobListings created by current user - GET /api/jobs/created
router.get(
  '/created', 
  requireAuth, 
  async (req, res) => {
    try {
      const userId = req.user.id;

      const jobs = await JobListing.findAll({
        where: { employerId: userId },
        include: [
          {
            model: Company,
            attributes: ['id', 'name', 'city', 'state', 'website']
          },
          {
            model: JobApplication,
            attributes: ['id', 'status', 'userId']
          }
        ],
        order: [['createdAt', 'DESC']] // add sorting here or frontend?
      });

      return res.status(200).json(jobs);
    } catch (error) {
      console.error('Error fetching created jobs:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
});


// Create a new JobListing - POST /api/jobs/new
router.post(
  '/new', 
  requireAuth,
  async (req, res) => {
    try {
      const { title, description, city, state, companyName } = req.body;
      const employerId = req.user.id;

      // Check if company exists
      let company = await Company.findOne({ where: { name: companyName } });

      // If not, create a new company
      if (!company) {
        company = await Company.create({
          name: companyName,
          city: city || 'Unknown',
          state: state || 'Unknown',
          website: '#',
          email: 'placeholder@example.io',
          phone: '0000000000',
          logo: ''
        });
      }

      const newJob = await JobListing.create({
        employerId,
        companyId: company.id,
        title,
        description,
        city,
        state
      });

      return res.status(201).json(newJob);
    } catch (error) {
      console.error('Error creating job listing', error)
      return res.status(500).json({ message: 'Internal Server Error'})
    }
});


// Search JobListings - GET /api/jobs/search
router.get('/search', async (req, res) => {
  const { keyword, city, state } = req.query;
  const filters = [];
  const isPostgres = sequelize.getDialect() === 'postgres';
  const likeOperator = isPostgres ? Op.iLike : Op.like;

  if (keyword) {
    filters.push({
      [Op.or]: [
        { title: { [likeOperator]: `%${keyword}%` } },
        { description: { [likeOperator]: `%${keyword}%` } },
        { '$Company.name$': { [likeOperator]: `%${keyword}%` } } // add company name
      ]
    });
  }

  if (city) {
    filters.push({ city: { [likeOperator]: `%${city}%` } });
  }

  if (state) {
    filters.push({ state: state.toUpperCase() });
  }

  try {
    const jobListings = await JobListing.findAll({
      where: {
        [Op.and]: filters
      },
      include: [
        {
          model: Company,
          attributes: ['id', 'name', 'city', 'state', 'logo'],
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(jobListings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



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
        console.error('Error fetching job', error);
        return res.status(500).json({ message: 'Internal Server Error'})
    }

})


// Update a JobListing - PUT /api/jobs/:jobId
router.put('/:jobId', 
  requireAuth,
  async (req, res) => {
    try {
      const { jobId } = req.params;
      const { title, description, city, state, companyName } = req.body;
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
      job.companyName = companyName;

      await job.save();

      return res.status(200).json(job);
    } catch (error) {
      console.error('Cannot update job', error)
      return res.status(500).json({ message: 'Internal Server Error'})
    }
});


// Delete a JobListing - DELETE /api/jobs/:jobId
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