import express from "express";
import { createItem, getItems, deleteItem } from "../controllers/item.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createItem);
router.get("/", authMiddleware, getItems);
router.delete("/:id", authMiddleware, deleteItem);

export default router;