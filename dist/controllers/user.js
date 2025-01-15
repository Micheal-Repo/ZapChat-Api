import User from "../models/user.js";
async function getAllUsers(req, res) {
    console.log("getting all users");
    const loggedInUser = req.user._id;
    const users = await User.find({ _id: { $ne: loggedInUser } }).select("-password").lean();
    console.log("users sent successfully");
    res.status(200).json({
        success: true,
        users,
    });
}
export { getAllUsers };
