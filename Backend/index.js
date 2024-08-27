//Creating server
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import book_routes from "./book.route.js";

dotenv.config({});
const app =express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


const corsOption ={
    origin:'http://localhost:5173',
    credentials: true
}

app.use(cors(corsOption));

const PORT = process.env.PORT || 3000;
connectDB();

app.use("/api/v1/books", book_routes);

app.listen(PORT, ()=>{
    
    console.log(`Server running at port ${PORT}`);
})
