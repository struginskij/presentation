import mongoose from "mongoose";

console.log("Mongo URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB: Connected"))
  .catch((err) => console.log("MongoDB connection error:", err.message));
