// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "@/util/mongoos";
import Product from "../../../models/Product";
export default async function handler(req, res) {
  const { method } = req;
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
      const products = await Product.create(req.body);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
