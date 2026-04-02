import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,               // prevent XSS
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    sameSite: "None",              // allows cross-origin cookies
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};

export default generateToken;