import express from "express";
import { CountryList } from "../model/model.js";

const countryListRouter = express();

countryListRouter.post("/", async (req, res) => {
  try {
    const { name, description, imgSrc } = req.body;
    const countryList = await CountryList.create({ name, description, imgSrc });
    return res.json(countryList);
  } catch (e) {
    console.log(e);
  }
});

countryListRouter.get("/", async (req, res) => {
  try {
    const countryList = await CountryList.findAll();
    return res.json(countryList);
  } catch (e) {
    console.log(e);
  }
});

countryListRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const country = await CountryList.findOne({ where: { id } });
  return res.json(country);
});

export { countryListRouter };
