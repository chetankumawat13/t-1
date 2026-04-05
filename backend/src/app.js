import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import itemRoutes from "./routes/item.route.js";
import cors from "cors";
import path from "path";

const app = express();

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: "https://t-1-3vkj.onrender.com",
  credentials: true
}));


app.use("/api/auth", authRouter);
app.use("/api/items", itemRoutes);



const __dirname = path.resolve();


app.use(express.static(path.join(__dirname, "backend/dist")));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "backend/dist/index.html"));
});

export default app;