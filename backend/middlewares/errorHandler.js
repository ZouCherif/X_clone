const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
  const origin =
    err.headers && err.headers.origin ? err.headers.origin : "Unknown";
  logEvents(
    `${err.name}\t${err.message}\t${req.method}\t${req.url}\t${origin}`,
    "errLog.log"
  );
  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500;
  res.status(status);
  res.json({ message: err.message });

  next();
};

module.exports = errorHandler;
