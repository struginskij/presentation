import "./instrument.js";
import "dotenv/config";
import "./clients/db";
import * as Sentry from "@sentry/node";
import express from "express";
import Boom from "boom";
import cors from "cors";
import limiter from "./rate-limiter";
import routes from "./routes";

const app = express();

Sentry.setupExpressErrorHandler(app);

// Attach Sentry's request handler
// app.use(Sentry.Handlers.requestHandler());

app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use((req, res, next) => {
  return next(Boom.notFound("This route does not exist."));
});

Sentry.setupExpressErrorHandler(app);

app.use((err, req, res, next) => {
  console.error(err);
  if (err.output) {
    return res.status(err.output.statusCode || 500).json(err.output.payload);
  }

  return res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

app.listen(4000, () => console.log("Server is up!"));
