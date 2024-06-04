import { request, response } from "express";
import productManager from "../productManager.js";

 const checkProductData = async (req = request, res = response, next) => {
  try {
    const { title, description, price, code, stock, category } = req.body;
    const newProduct = {
      title,
      description,
      price,
      code,
      stock,
      category,
    };
    const products = await productManager.getProducts();


    // validacion del campo codigo

    const productExists = products.find((p) => p.code === code);
    if (productExists) return res.status(400).json({ status: "Error", msg: `El producto código ${code} ya existe.` });

    // validacion para campo obligatorio

    const checkData = Object.values(newProduct).includes(undefined);
    if (checkData) return res.status(400).json({ status: "Error", msg: "Los campos son obligatorios." });

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
};
export default checkProductData;