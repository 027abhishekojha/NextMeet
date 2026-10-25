import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config'
import { connectToSocket } from "./controllers/socketManager.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);
const PORT = process.env.EXPRESS_APP_PORT

app.set("port", process.env.EXPRESS_APP_PORT || 8000);
app.use(cors());
app.use(express.json({limit : "40kb"}));
app.use(express.urlencoded({limit : "40kb", extended : true}));

app.get("/home", (req, res) => {
    return res.json({"message" : "This is home page"});
});

const start = async () => {
    const connectionDB = await mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log(`MONGODB Connected SuccesFully`);
    }).catch((error)=>{
        console.log('Some Error occoured :', error);
    });

    server.listen(app.get("port"), () => {
        console.log(`Express App is listening on port ${PORT}`);
    });
}

start()