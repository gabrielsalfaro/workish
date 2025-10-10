const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Company, User } = require('../../db/models');
const { sequelize } = require('../../db/models');
const { Op } = require('sequelize');


// GET /api/companies/me - Get company associated with current user
router.get(
    '/me', // use something else?
    requireAuth, 
    async (req, res, next) => {
  try {
    const user = req.user;

    // Make sure the user has a companyId
    if (!user.companyId) {
      return res.status(404).json({
        title: 'Not Found',
        message: 'User is not associated with a company.'
      });
    }

    // Look up the company using the user's companyId
    const company = await Company.findByPk(user.companyId);

    if (!company) {
      return res.status(404).json({
        title: 'Not Found',
        message: 'Company not found.'
      });
    }

    res.json(company);
  } catch (error) {
    next(error); // wow
  }
});

// POST /api/companies
router.post(
    '/', 
    requireAuth, 
    async (req, res) => {
  const {
    name,
    city,
    state,
    website,
    phone,
    email,
    logo
  } = req.body;

  try {
    const newCompany = await Company.create({
      name,
      city,
      state,
      website,
      phone,
      email,
      logo
    });

    return res.status(201).json(newCompany);
  } catch (error) {
    console.error('Error creating company:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


// DELETE /api/companies/my-company
router.delete(
    '/me', 
    requireAuth, 
    async (req, res) => {
  try {
    const user = req.user;
    // const companyId = user.companyId;
    const company = await Company.findByPk(user.companyId);

    if (!company) {
      return res.status(404).json({message: 'Company not found.'});
    }

    await company.destroy();

    return res.json({ message: 'Company deleted successfully.' });
  } catch (error) {
    console.error('Error deleting company: ', error)
  }
});


// GET /api/companies/search?name=SomeName
router.get(
    '/search', 
    async (req, res) => {
    const { name } = req.query;
    const isPostgres = sequelize.getDialect() === 'postgres';
    const likeOperator = isPostgres ? Op.iLike : Op.like;

  try {
    const company = await Company.findOne({
      where: { 
        name: { [likeOperator]: `%${name}%` }
      }
    });

    if (!company) {
      return res.status(404).json({ message: 'Company not found.' });
    }

    res.json({ company });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

// PUT /api/companies/assign - Assign a company to the current user
router.put(
  '/assign', 
  requireAuth, async (req, res) => {
    const { companyId } = req.body;
    const user = req.user;

    try {
      const company = await Company.findByPk(companyId);
      if (!company) {
        return res.status(404).json({ message: 'Company not found.' });
      }

      user.companyId = companyId;
      await user.save();

      return res.json({ message: 'Company successfully assigned to user.' });
    } catch (error) {
      console.error('Error assigning company:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
});


// GET /api/companies/:companyId/details
router.get('/:companyId', async (req, res) => {
  const { companyId } = req.params;

  try {
    const company = await Company.findByPk(companyId);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    return res.json(company);
  } catch (error) {
    console.error('Error fetching company:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PUT /api/companies/:id
router.put(
    '/:companyId', 
    requireAuth,
    async (req, res) => {
  const { companyId } = req.params;
  const {
    name,
    city,
    state,
    website,
    phone,
    email,
    logo
  } = req.body;

  try {
    const company = await Company.findByPk(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found"
      });
    }

    await company.update({
      name,
      city,
      state,
      website,
      phone,
      email,
      logo
    });

    return res.json(company);
  } catch (error) {
    console.error('Error updating company', error)
  }
});



module.exports = router;
