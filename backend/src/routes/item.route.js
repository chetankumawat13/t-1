import express from "express";
import {
  createItem,
  getItems,
  deleteItem,
  archiveItem,
  restoreItem,
  permanentDelete,
} from "../controllers/item.controller.js";

import { semanticSearch } from "../controllers/search.controller.js"; // ✅ existing
import { getGraphData } from "../controllers/graph.controller.js";   // ✅ new graph controller
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ➕ Create Item
router.post("/", authMiddleware, createItem);

// 📥 Get Items (filters supported: ?type=deleted | archived)
router.get("/", authMiddleware, getItems);

// 🗑 Soft Delete
router.patch("/:id/delete", authMiddleware, deleteItem);

// 📦 Archive
router.patch("/:id/archive", authMiddleware, archiveItem);

// ♻️ Restore (Recently Deleted se wapas)
router.patch("/:id/restore", authMiddleware, restoreItem);

// ❌ Permanent Delete
router.delete("/:id/permanent", authMiddleware, permanentDelete);

// 🔍 Semantic Search
router.post("/search", authMiddleware, semanticSearch); // ✅ existing

// 🌐 Graph Data for D3 Visualization
router.get("/graph-data", authMiddleware, getGraphData); // ✅ new route

export default router;