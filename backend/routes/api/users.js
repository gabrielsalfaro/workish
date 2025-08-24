const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, JobHistory, Company } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),

  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),

  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2})
    .withMessage('First name must be at least 2 characters.'),
  check('firstName')
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters.'),
  check('firstName')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),

  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters.'),
  check('lastName')
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters.'),
  check('lastName')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),

  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];


// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, firstName, lastName, hashedPassword });

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);


// GET /api/users/:userId
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'firstName', 'lastName', 'email', 'profileImg', 'phone', 'jobTitle', 'summary'],
      include: [
        {
          model: JobHistory,
          attributes: ['employer', 'jobTitle', 'city', 'state', 'startDate', 'endDate']
        },
        {
          model: Company,
          attributes: ['id', 'name', 'city', 'state', 'website', 'email']
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;

