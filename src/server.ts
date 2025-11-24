import express from "express";
import dotenv from "dotenv";
import getDataSource from "./db/data-source";
import certRoute from "./routes/certRoute";
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());

// CORS config
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Routes
app.use("/cert", certRoute);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to Certifi.ly" });
});

// DB connection & server start
getDataSource()
  .then(() => {
    console.log("Database connected");
    const domain = process.env.APP_DOMAIN;

    const port = parseInt(process.env.APP_PORT || '3000', 10);

    app.listen(port, domain, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("DB Init Error:", err);
  });
