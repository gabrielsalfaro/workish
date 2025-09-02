const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Company, User } = require('../../db/models');


// GET /api/companies/me - Get company associated with current user
router.get(
    '/my-company', // use something else?
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


router.delete(
    '/my-company', 
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


module.exports = router;
