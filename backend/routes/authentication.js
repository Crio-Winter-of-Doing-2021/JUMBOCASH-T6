const router = require("express").Router();
const passport = require("../config/passport");
const clientUrl = require("../config/server").clientUrl;
const authController = require("../src/controllers/authentication");

// AUTHENTICATION MIDDLEWARE
const authenticate = (req, res, next) => {
  // if login pass
  // passports method
  // console.log(`is authenticated ${req.user}`);
  if (req.user) {
    console.log(`user with Id ${req.user} is authenticated`);
    req.userId = req.user;
    next();
  } else {
    res.redirect("/api/auth/google");
    res.end();
  }
};

// FAIL-SAFE for unauthorized access
const authenticateTest = (req, res, next) => {

  // To be not used in production
  // All request will be passed to Kanishka's saved data
  req.userId = "2e107775-2b0d-4e24-af6c-8766c042fb09";
  next();

};

// =========================================================================

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    // successReturnToOrRedirect: clientUrl, 
    failureRedirect: "/api/auth/google"
  })
  // During integration with frontend
  ,
  (req, res) => {
    var token = req.user;
    console.log(`access token ${token}`);
    // res.redirect("http://localhost:3000?token=" + token);
    res.set('Access-Control-Allow-Origin', '*'); //req.headers.origin
    res.set('Access-Control-Allow-Credentials', 'true');
    res.cookie('x-auth-cookie', token);

    res.redirect(clientUrl);
    // res.send({error: false, message: "is Logged in"});
  }
);

router.get("/logout", authController.logoutUser);

// router.post(
//   '/login',
//   function(req, res, next) {
//     console.log(req.body)
//     console.log('================')
//     next()
//   },
//   passport.authenticate('local'),
//   (req, res) => {
//     console.log('POST to /login')
//     const user = JSON.parse(JSON.stringify(req.user)) // hack
//     const cleanUser = Object.assign({}, user)
//     if (cleanUser.local) {
//       console.log(`Deleting ${cleanUser.local.password}`)
//       delete cleanUser.local.password
//     }
//     res.json({ user: cleanUser })
//   }
// )

// router.post('/signup', (req, res) => {
//   const { username, password } = req.body
//   // ADD VALIDATION
//   findOrCreateUser({ 'name': username }, (err, userMatch) => {
//     if (userMatch) {
//       return res.json({
//         error: `Sorry, already a user with the username: ${username}`
//       })
//     }
//   })
// })

module.exports = { 
  router: router, 
  authenticate: authenticateTest };
