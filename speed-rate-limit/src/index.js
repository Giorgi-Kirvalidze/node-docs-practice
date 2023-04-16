const { promisify } = require("util");
const express = require("express");
const { createClient } = require("redis");
const cors = require("cors");

const redisClient = createClient({
  host: "localhost",
  port: 6379,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => {
  console.log("Redis Client Connected");
  startServer();
});

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);
const incrAsync = promisify(redisClient.incr).bind(redisClient);
const ttlAsync = promisify(redisClient.ttl).bind(redisClient);

const MAX_REQUESTS = 100;
const WINDOW_SIZE_IN_SECONDS = 60;

const app = express();
app.use(cors());

function startServer() {
  app.use(rateLimit);
  app.use(throttler);

  app.get("/test", (req, res) => {
    console.log("testing rate limit and throttle");
    res.send("ok");
  });

  app.listen(3000, () => console.log("server running"));
}

function rateLimit(req, res, next) {
  const ip =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip;
  const key = `${ip}:requests`;
  getAsync(key).then((value) => {
    if (value === null) {
      setAsync(key, 1, "EX", WINDOW_SIZE_IN_SECONDS);
    } else {
      const requests = parseInt(value);
      if (requests >= MAX_REQUESTS) {
        res.status(429).send("Too many requests, please try again later.");
        return;
      } else {
        incrAsync(key);
      }
    }
    ttlAsync(key).then((ttl) => {
      console.log(
        `Requests remaining for ${ip}: ${MAX_REQUESTS - parseInt(value)}`
      );
      console.log(`Time remaining: ${ttl}`);
    });
    next();
  });
}

const throttler = async (req, res, next) => {
  const { ip } = req;
  const throttleKey = `throttle_${ip}`;
  const requestTime = new Date().getTime();
  const lastRequestTime = await getAsync(throttleKey);
  if (lastRequestTime) {
    const timeSinceLastRequest = requestTime - parseInt(lastRequestTime);
    if (timeSinceLastRequest < 1000) {
      // limit to 1 request per second
      res.status(429).json({
        message: "Too many requests, please try again later",
      });
      return;
    }
  }
  await setAsync(throttleKey, requestTime, "EX", 1);
  next();
};

redisClient.connect();
