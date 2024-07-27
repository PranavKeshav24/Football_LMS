// lib/cors.js
import Cors from "cors";
import { initMiddleware } from "./init-middleware";

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: "*", // You can restrict it to specific origins
  })
);

export default cors;
