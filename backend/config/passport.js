const passport = require("passport");
const GoogleStrategy = require("./googleStrategy");
const { validateToken } = require("../src/proxy/authentication");

passport.serializeUser((token, done) => {
  console.log("=== serialize ... called ===");
  console.log(`token: ${token}`); // token
  console.log("---------");
  done(null, token);
});

// Production
// passport.deserializeUser(async (token, done) => {
//   console.log("DEserialize ... called", token);

//   validateToken(token)
//     .then((userId) => {
//       if (userId === null) {
//         console.log("Token Id not registered against any user");
//         return done(null, false);
//       } else {
//         console.log("validation of token sucessful");
//         // console.log(userId);
//         return done(null, userId.dataValues.id); // access paramter by req.user
//       }
//     })
//     .catch((err) => { console.log(err); return done(err) });
// });

// Test
passport.deserializeUser(async (token, done) => {
  console.log("DEserialize ... called", token);

  return done(null, "2e107775-2b0d-4e24-af6c-8766c042fb09");
});

// ==== Register Strategies ====
passport.use(GoogleStrategy);

module.exports = passport;