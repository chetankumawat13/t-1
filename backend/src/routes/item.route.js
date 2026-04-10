import express from "express";
import {
  createItem,
  getItems,
  deleteItem,
  archiveItem,
  restoreItem,
  permanentDelete,
} from "../controllers/item.controller.js";

import { semanticSearch } from "../controllers/search.controller.js"; 
import { getGraphData } from "../controllers/graph.controller.js";   
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/", authMiddleware, createItem);


router.get("/", authMiddleware, getItems);


router.patch("/:id/delete", authMiddleware, deleteItem);


router.patch("/:id/archive", authMiddleware, archiveItem);


router.patch("/:id/restore", authMiddleware, restoreItem);


router.delete("/:id/permanent", authMiddleware, permanentDelete);


router.post("/search", authMiddleware, semanticSearch); 


router.get("/graph-data", authMiddleware, getGraphData); 

export default router;