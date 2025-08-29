const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Watchlist, JobListing, Company } = require('../../db/models');

// GET /api/watchlist - Get all watchlist items for the current user
router.get(
    '/', 
    requireAuth, 
    async (req, res) => {
  const userId = req.user.id;

  try {
    const watchlistItems = await Watchlist.findAll({
      where: { userId },
      include: [
        {
          model: JobListing,
          attributes: ['id', 'title', 'city', 'state', 'createdAt'],
          include: [
            {
              model: Company,
              attributes: ['id', 'name', 'logo', 'city', 'state']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json(watchlistItems);
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
