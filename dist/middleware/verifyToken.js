import jwt from "jsonwebtoken";
import generateError from "../configs/error.js";
import User from "../models/user.js";
async function verifyToken(req, res, next) {
    console.log("verifying token");
    console.log(req.cookies);
    const token = req.cookies.jwt;
    if (!token) {
        generateError(401, "Unauthorized - No token provided", "accessToken-error");
    }
    //decode token
    const secret = process.env.JWT_SECRET;
    jwt.verify(token, secret, async (err, decoded) => {
        console.log("decoding token");
        if (err) {
            const error = {
                success: false,
                message: err.message,
                type: "accessToken-error",
                status: "401",
            };
            console.log(error);
            res.status(401).json({
                success: false,
                message: "Unauthorized - Invalid Token",
                type: "accessToken-error",
                status: "401",
            });
        }
        else {
            console.log("token decoded successfully");
            const user = await User.findById(decoded.userId)
                .select("-password")
                .lean();
            if (!user) {
                const error = {
                    success: false,
                    message: "user not found",
                    type: "accessToken-error",
                    status: "401",
                };
                console.log(error);
                res.status(401).json(error);
            }
            else {
                req.user = user;
                next();
            }
        }
    });
}
export default verifyToken;
