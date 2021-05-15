const errorHandler = (err) => {
  if (err instanceof Error) {
    console.log(err);
    throw { code: 500, message: err.message };
  } else if (err.code) {
    throw err;
  } else {
    // if someone's dog got lost or any other esoteric errors
    throw { code: 500, message: err };
  }
};

module.exports = errorHandler;
