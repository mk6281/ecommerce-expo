import express from 'express';
import path from "path";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'

import { ENV } from "./config/env.js";



const __dirname = path.resolve();
app.use(clerkMiddleware())
const app = express();  
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'Server is running!' });
});


// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
  });
}


app.listen(3000, () => {
  console.log('Server running on port 3000');
  connectDB();
  console.log("DB_URL:", ENV.DB_URL);
});