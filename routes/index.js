import express from "express";
import { userRouter } from "./userRouter.js";
import { hotelListRouter } from "./hotelListRouter.js";
import { countryListRouter } from "./countryListRouter.js";
import { basketRouter } from "./basketRouter.js";

const rootRouter = express();

rootRouter.use("/user", userRouter);
rootRouter.use("/hotel_list", hotelListRouter);
rootRouter.use("/country_list", countryListRouter);
rootRouter.use("/basket", basketRouter);

export { rootRouter };
