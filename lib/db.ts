import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

const connect = async () => {
    const connectionState = mongoose.connection.readyState;

    if (connectionState === 1) {
        console.log("Already Connected to Database");
        return;
    }

    if (connectionState === 2) {
        console.log("Connecting to Database ...");
        return;
    }

    try {
        mongoose.connect(MONGODB_URI, {
            dbName: "portfolio-services",
            bufferCommands: true,
        });
        console.log("Database Connected");
    } catch (err) {
        console.error("Error Connecting to Database:", err);
    }
};

export default connect;
