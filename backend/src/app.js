import express from 'express'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js';
import itemRoutes from "./routes/item.route.js";
import cors from "cors";







const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("./public"));
app.use(cors({
  origin: "*", // ya origin remove kar do, kyunki same domain se hai
  credentials: true,
}));

app.use('/api/auth',authRouter);
app.use("/api/items", itemRoutes);


export default app