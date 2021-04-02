var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const cookieSession = require('cookie-session')
const passport = require('passport');
const {router, authenticate} = require("./routes/authentication");

const sequelize = require("./config/database");
const keys = require("./config/server");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var entityRouter = require("./routes/entity");
var transactionRouter = require("./routes/transaction");
var analyticsRouter = require("./routes/analytics");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// DB connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

// For an actual app you should configure this with an experation time, better keys, proxy and secure
app.use(
  cookieSession({
    name: "tuto-session",
    keys: ["key1", "key2"],
  })
);

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);

/* Express app ROUTING */
app.use('/auth', router)

// app.use(authenticate)
// protected routes
app.use("/user", authenticate, usersRouter);
app.use("/entity", authenticate, entityRouter);
app.use("/transaction", authenticate, transactionRouter);
app.use("/analytics", authenticate, analyticsRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// for setting the db with seed value, and starting the server
const startServer = (dbReset, port) => {
  if (dbReset === "true") {
    sequelize
      .sync({ force: true })
      .then(() => {
        app.listen(port, console.log(`Server started on port ${port}`));

        require("./src/seed/seedDb");
      })
      .catch((err) => console.log("Error: " + err));
  } else {
    // for resetting the db, and starting the server
    sequelize
      .sync()
      .then(() => {
        app.listen(port, console.log(`Server started on port ${port}`));
      })
      .catch((err) => console.log("Error: " + err));
  }
};

startServer(keys.resetDB, keys.port);
