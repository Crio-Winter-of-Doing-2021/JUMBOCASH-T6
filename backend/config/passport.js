const passport = require('passport')
const GoogleStrategy = require('./googleStrategy')
const {validateToken} = require('../src/proxy/user');

passport.serializeUser((token, done) => {
  console.log('=== serialize ... called ===')
  console.log(`token: ${token}`) // token
  console.log('---------')
  done(null, { "token": token })
})

passport.deserializeUser(async ({token}, done) => {
  
  // console.log('DEserialize ... called', token)

  await validateToken(token)
    .then(userId => {
      if(userId === null) {
        console.log("Token Id not registered against any user");
        return done(null, false);
      } else {
        console.log("validation of token sucessful")
        // console.log(`userId: ${userId.dataValues.id}`)
        return done(null, userId.dataValues.id)
      }
    })
    .catch(err => console.log(err));

})

// ==== Register Strategies ====
passport.use(GoogleStrategy)

module.exports = passport