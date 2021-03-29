const router = require('express').Router();
const passport = require('../config/passport');
const { validateToken } = require('../src/proxy/user');


const authenticate = async (req, res, next) => {

    // if login pass
    // passports method
    if(req.isAuthenticated()) {
      await validateToken(req.session.passport.user.token)
        .then((data) => {
          req.userId = data.dataValues.id;
          next();
        })
        .catch(err => console.log(err));
    } else {
      res.redirect('/auth/google');
      res.end();
    }
    
}

// =========================================================================


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', 
  passport.authenticate('google', 
  {successRedirect: '/user/me', failureRedirect: '/auth/google'}
  )
)

router.get('/logout', (req, res) => {
  console.log(req.user);
  if (req.user) {
    req.logout();
    // res.clearCookie('connect.sid') // clean up!
    return res.json({ msg: 'logging you out' })
  } else {
    return res.json({ msg: 'no user to log out!' })
  }
})

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

module.exports = {router, authenticate }