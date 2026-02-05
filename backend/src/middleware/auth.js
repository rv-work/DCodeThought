import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token)
      return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};




// export const protect = async (req, res, next) => {
//   try {
//     let token = req.headers.authorization;

//     if (!token || !token.startsWith("Bearer "))
//       return res.status(401).json({ message: "Not authorized" });

//     token = token.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");

//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };