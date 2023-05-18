require("dotenv").config();

const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const app = express();

const port = 3000;

const weather = require("./weather");
const { rateLimit } = require("express-rate-limit");

app.use(express.json());

const allowList = ["http://127.0.01"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const limiter = rateLimit({
  wnidowMs: 1000, // window period = 1 second
  max: 1, // limit of requests within 'window' period
});

app.use(limiter);

app.get("/", (req, res) => {
  res.json({ success: "Hello World" });
});

app.use("/weather", weather);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
