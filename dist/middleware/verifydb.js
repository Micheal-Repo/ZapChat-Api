import mongoose from "mongoose";
import generateError from "../configs/error.js";
async function verifydb(req, res, next) {
    console.log(mongoose.connection.readyState);
    if (mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3) {
        generateError(500, "No internet connection", "database error");
    }
    else {
        next();
    }
}
export { verifydb };
