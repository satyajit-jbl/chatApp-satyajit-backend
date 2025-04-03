// const express = require("express") (by adding  "type": "module" we can import instead)
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js" //এখানে authRoutes হলো একটি নামমাত্র অ্যাসাইনমেন্ট, যেটি router কে ধরে রেখেছে। অর্থাৎ, যেহেতু auth.route.js এ default export করা হয়েছে, তাই import করার সময় যেকোনো নাম ব্যবহার করা যায়।
// import { connect } from "mongoose";
import messageRoutes from "./routes/message.route.js" 


dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5175",
    credentials: true,
}))

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

//to test the server
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(PORT, ()=>{
    console.log("Server is running on PORT:" +PORT);
    connectDB()
});