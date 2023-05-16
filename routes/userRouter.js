import express from "express";
import { ApiError } from "../error/ApiError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Basket } from "../model/model.js";
import { config } from "dotenv";
import { authMiddleware } from "../middleware/authMiddleware.js";

config();
const secret = process.env.SECRET_KEY;
const userRouter = express();

userRouter.post("/registration", async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return next(ApiError.badRequest("Некорректный email или пароль"));
  }
  const candidate = await User.findOne({ where: { email } });
  if (candidate) {
    return next(
      ApiError.badRequest("Пользователь с таким email уже существует")
    );
  }
  const hashPassword = await bcrypt.hash(password, 5);
  const user = await User.create({ email, role, password: hashPassword });
  const basket = await Basket.create({ userId: user.id });
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    secret,
    { expiresIn: "24h" }
  );
  return res.json({ token });
});

userRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return next(ApiError.badRequest("Пользователь не найден"));
  }
  let comparePassword = bcrypt.compareSync(password, user.password);
  if (!comparePassword) {
    return next(ApiError.badRequest("Указан неверный пароль"));
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    secret,
    { expiresIn: "24h" }
  );
  return res.json({ token });
});

userRouter.get("/check", authMiddleware, async (req, res, next) => {
  const token = jwt.sign(
    { id: req.user.id, email: req.user.email, role: req.user.role },
    secret,
    { expiresIn: "24h" }
  );
  return res.json({ token });
});

userRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userList = await User.create({ email, password });
    return res.json(userList);
  } catch (e) {
    console.log(e);
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const userList = await User.findAll();
    return res.json(userList);
  } catch (e) {
    console.log(e);
  }
});

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  return res.json(user);
});
export { userRouter };
