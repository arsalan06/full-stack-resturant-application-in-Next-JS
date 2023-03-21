// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "@/util/mongoos";
import User from "../../../models/User";
const jwt = require("jsonwebtoken");
const signToken = (id) => {
  // console.log("signToken");
  // console.log("signToken");
  const setId = id.toString();
  // console.log(setId);
  return jwt.sign({ setId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
export default async function handler(req, res) {
  const { method } = req;
  dbConnect();
  if (method === "POST") {
    const { email, password } = req.body;
    // 1) Check if email or passord is not exist
    console.log(req.body);

    try {
      if (!email || !password) {
        console.log("please provide email or password");
      } else if (email && password) {
        const user = await User.findOne({ email }).select("+password");
        // console.log(user);
        const correct = await user.correctPassword(password, user.password);
        console.log(correct)
        if (user == null || user == undefined || !correct) {
          console.log("please provide valid email or password");
        } else {
          const token = signToken(user._id);
          console.log("signToken(user._id)");
          console.log("signToken(user._id)");
          console.log("signToken(user._id)");
          console.log(signToken(user._id));

          res.status(200).json({
            status: "success",
            token,
            // data: {},
          });
        }
      }
      // res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
