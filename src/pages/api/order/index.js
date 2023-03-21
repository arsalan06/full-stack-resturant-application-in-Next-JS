import Order from "@/models/Order";
import dbConnect from "@/util/mongoos";
import Product from "../../../models/Product";
export default async function handler(req, res) {
  const { method } = req;
  if(method=="GET"){
    try{
        const order =await Order.find(req.body);
        res.status(201).json(order)
      }catch(err){
          res.status(500).json(err)
      }
  }
  if(method=="POST"){
    try{
      const order =await Order.create(req.body);
      res.status(201).json(order)
    }catch(err){
        res.status(500).json(err)
    }
  }
  if(method=="PUT"){}
  if(method=="DELETE"){}
}