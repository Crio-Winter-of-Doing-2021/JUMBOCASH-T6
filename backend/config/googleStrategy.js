const GoogleStrategy = require("passport-google-oauth20");
const findOrCreate = require("../src/proxy/user").findOrCreateUser;
const GoogleKeys = require("./server").auth.google;

const strategy = new GoogleStrategy(
  {
    clientID: GoogleKeys.clientID,
    clientSecret: GoogleKeys.clientSecret,
    callbackURL: GoogleKeys.callbackURL,
  },
  async function (token, tokenSecret, profile, done) {
    // testing
    // console.log('===== GOOGLE PROFILE =======')
    // console.log(profile)
    // console.log('======== END ===========')

    const name = profile.displayName;
    const emailId = profile.emails[0].value;

    const extractedData = { name, emailId, token };

    console.log("===== Extracted info =======");
    console.log(extractedData);
    console.log("======== END ===========");

    // code

    // find by userId and emailId, and update token if found or create token if not found
    findOrCreate(extractedData)
      .then((userDetails) => {
        if(userDetails === null) {
          return done(null, false);
        } else {
          // console.log(userDetails[0], userDetails[1])
          return done(null, extractedData.token);
        }
      })
      .catch((err) => {
        console.log(err);
        return done(err);
      });
  }
);

module.exports = strategy;
