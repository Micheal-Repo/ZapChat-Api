import mongoose from "mongoose";
export default function mongodbConnect() {
    const db = mongoose.connection;
    const url = process.env.MONGO_URL;
    mongoose.connect(url)
        .then(() => {
        console.log("connected to database");
    })
        .catch((err) => {
        console.log("mongodb connections error ");
        console.log(err.message);
    });
    db.on("connected", () => {
        console.log("database connection established successfully");
    });
    db.on("disconnected", () => {
        console.log("disconnected from database");
    });
    db.on("reconnected", () => {
        console.log("reconnected to database successfully");
    });
}
