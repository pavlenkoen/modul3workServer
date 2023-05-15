import express from "express";
import { HotelList } from "../model/model.js";

const hotelListRouter = express();

hotelListRouter.post("/", async (req, res) => {
  try {
    const { name, description, imgSrc, price, countryListId, hot } = req.body;
    const hotelList = await HotelList.create({
      name,
      description,
      imgSrc,
      price,
      countryListId,
      hot,
    });
    return res.json(hotelList);
  } catch (e) {
    console.log(e);
  }
});

hotelListRouter.get("/", async (req, res) => {
  try {
    const hotelList = await HotelList.findAll();
    return res.json(hotelList);
  } catch (e) {
    console.log(e);
  }
});

hotelListRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const hotel = await HotelList.findOne({ where: { id } });
  return res.json(hotel);
});

export { hotelListRouter };
