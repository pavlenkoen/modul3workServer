import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketOrders = sequelize.define("basket_orders", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
const CountryList = sequelize.define("country_list", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  description: { type: DataTypes.STRING },
  imgSrc: { type: DataTypes.STRING },
  rusname: { type: DataTypes.STRING },
});
const HotelList = sequelize.define("hotel_list", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  description: { type: DataTypes.STRING },
  imgSrc: { type: DataTypes.STRING },
  price: { type: DataTypes.INTEGER, allowNull: false },
  hot: { type: DataTypes.BOOLEAN },
});

User.hasOne(Basket);
Basket.belongsTo(User);
Basket.hasMany(BasketOrders);
BasketOrders.belongsTo(Basket);
CountryList.hasMany(HotelList);
HotelList.belongsTo(CountryList);

export { Basket, BasketOrders, User, HotelList, CountryList };
