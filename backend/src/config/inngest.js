import express from 'express';
import path from "path";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
// import cors from "cors";

import { functions, inngest } from "./config/inngest.js";


import { ENV } from "./config/env.js";



const __dirname = path.resolve();

const app = express(); 
app.use(express.json());
app.use(clerkMiddleware());
 
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'Server is running!' });
});


app.use("/api/inngest", serve({ client: inngest, functions }));

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
  });
}


const startServer = async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log("Server is up and running");
  });
};

startServer();
