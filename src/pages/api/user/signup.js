// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "@/util/mongoos";
import User from "../../../models/User";
export default async function handler(req, res) {
  const { method } = req;
//   console.log(req.body)
  dbConnect();
  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const newUser = await User.create(req.body);
      res.status(200).json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
