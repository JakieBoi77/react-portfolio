import mongoose from "mongoose";

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
      dbName: "fcc-mongodb-and-mongoose",
      bufferCommands: true
    });
    console.log("Database Connected")
  } catch (err) {
    console.error("Error Connected to Database:", err);
  }
}

export default connect;