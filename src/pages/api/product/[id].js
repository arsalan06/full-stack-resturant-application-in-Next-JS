// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "@/util/mongoos";
import Product from "../../../models/Product";
export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;
  dbConnect();
  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    try {
      const products = await Product.create(req.body);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
    try {
      const products = await Product.create(req.body);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
