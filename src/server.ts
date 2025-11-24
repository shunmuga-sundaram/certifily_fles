import express from "express";
import dotenv from "dotenv";
import getDataSource from "./db/data-source";
import certRoute from "./routes/certRoute";
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "Welcome to Certifi.ly" });
});

// Routes
app.use("/cert", certRoute);

getDataSource()
  .then(() => {
    console.log("Database connected");

    const domain = process.env.APP_DOMAIN;
    const port = parseInt(process.env.APP_PORT);
    
    app.listen(port, domain, () => {
      console.log("Server start running at the port" + ' ' + port);
    });
  })
  .catch((err) => {
    console.error("DB Init Error:", err);
  });
