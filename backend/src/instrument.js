
// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";

const ENV = ["production", "dev", "staging"][Math.floor(Math.random() * 3)];


Sentry.init({
  dsn: "https://547116179c7b147bd5ec07e55a1f624f@o4508349255778304.ingest.de.sentry.io/4508349385670736",
  environment: ENV,
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
});
