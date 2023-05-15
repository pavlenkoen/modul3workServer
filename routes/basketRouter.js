import express from "express";
import { Basket } from "../model/model.js";

const basketRouter = express();

basketRouter.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const basket = await Basket.create({ name });
    return res.json(basket);
  } catch (e) {
    console.log(e);
  }
});

basketRouter.get("/", async (req, res) => {
  try {
    const basket = await Basket.findAll();
    return res.json(basket);
  } catch (e) {
    console.log(e);
  }
});

export { basketRouter };
