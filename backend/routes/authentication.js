const router = require("express").Router();
const passport = require("../config/passport");
const clientUrl = require("../config/server").clientUrl;
const authController = require("../src/controllers/authentication");

// AUTHENTICATION MIDDLEWARE
const authenticate = async (req, res, next) => {
  // if login pass
  // passports method
  if (req.isAuthenticated()) {
    console.log(`userId ${req.user}`);
    req.userId = req.user;
    next();
  } else {
    res.redirect("/auth/google");
    res.end();
  }
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
    failureRedirect: "/auth/google"
  })
  // During integration with frontend
  ,
  (req, res) => {
    var token = req.cookies;
    console.log(`callback ${token}`);
    // res.redirect("http://localhost:3000?token=" + token);
    // res.redirect(clientUrl);
    res.send({error: false, message: "is Logged in"});
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

module.exports = { router, authenticate };
