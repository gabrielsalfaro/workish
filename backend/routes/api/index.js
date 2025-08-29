const router = require('express').Router();
const express = require('express');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const jobListingsRouter = require('./joblistings.js');
const applicationsRouter = require('./applications.js');
const watchlistRouter = require('./watchlist.js');
const { restoreUser, setTokenCookie, requireAuth } = require("../../utils/auth.js");
const { User } = require('../../db/models');

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/jobs', jobListingsRouter)
router.use('/jobs', applicationsRouter);
router.use('/applications', applicationsRouter);
router.use('/watchlist', watchlistRouter);


// Test route
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
  console.log('test')
  const { user } = req;
    if (user) {
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };
      return res.json({
        user: safeUser
      });
    } else return res.json({ user: null });
});

router.get('/test', (req, res) => {
  console.log('GET /api/test hit');

  const { user } = req;
  const path = require('path');

  if (process.env.NODE_ENV === 'production') {
    return res.sendFile(
      path.resolve(__dirname, '../../../frontend/dist/index.html')
    );
  }

  let safeUser = null;
  if (user) {
    safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      // profile_img: user.profile_img,
      phone: user.phone,
      city: user.city,
      state: user.state,
      jobTitle: user.jobTitle,
      companyId: user.companyId,
      summary: user.summary,
    };
  }

  res.json({
    message: 'Test route response',
    user: safeUser
  });
});



// // Test Route: GET /api/set-token-cookie
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'demo'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });


// // Test Route: GET /api/restore-user
// router.use(restoreUser);
// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );


// // Test Route: GET /api/require-auth
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );


module.exports = router;




