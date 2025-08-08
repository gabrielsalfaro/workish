const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser, setTokenCookie, requireAuth } = require("../../utils/auth.js");
const { User } = require('../../db/models');


// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);


// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // Serve the frontend's index.html file at the root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/dist")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });
}


// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({});
  });
}


// GET /api/set-token-cookie
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'demo'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});


// GET /api/restore-user
router.use(restoreUser);
router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);


// GET /api/require-auth
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);


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




module.exports = router;
