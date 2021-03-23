
const authenticate = (req, res, next) => {

    // if login pass
    console.log("authenticate request");
    next();

    // if login fails
    // res.status(401).send("Authentication denied");
}

module.exports = authenticate;