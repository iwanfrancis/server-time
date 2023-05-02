const express = require("express");
const logger = require("morgan");
const promMid = require("express-prometheus-middleware");
const cors = require("cors");

const app = express();

function checkAuth(req, res, next) {
  const authHeader = req.get("Authorization");
  if (authHeader !== "mysecrettoken") {
    res.status(403).send("Forbidden");
    return;
  }
  next();
}

app.use(cors());
app.use(checkAuth);
app.use(
  promMid({
    metricsPath: "/metrics",
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/time", (_, res) => {
  const currentEpoch = Math.round(Date.now() / 1000);
  const response = {
    epoch: currentEpoch,
  };
  res.json(response);
});

module.exports = app;
