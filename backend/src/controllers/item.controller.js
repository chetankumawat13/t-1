import Item from "../models/item.model.js";
import axios from "axios";
import * as cheerio from "cheerio";
import { processItem } from "../utils/aiProcessor.js";

// ✅ Helper to get YouTube video ID
const getYouTubeId = (url) => {
  try {
    const u = new URL(url);
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    return null;
  } catch {
    return null;
  }
};

// ➕ CREATE ITEM
export const createItem = async (req, res) => {
  try {
    let { type, title, url, content } = req.body;
    let thumbnail = null;
    let source = "other";

    // 🌐 URL METADATA FETCH
    if (type === "url" && url) {
      try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        // Extract title & description
        const extractedTitle = $("title").text().trim() || "Untitled";
        const description =
          $('meta[name="description"]').attr("content") ||
          $('meta[property="og:description"]').attr("content") ||
          "";

        // Extract thumbnail
        thumbnail =
          $('meta[property="og:image"]').attr("content") ||
          $('meta[name="twitter:image"]').attr("content") ||
          null;

        // YouTube specific thumbnail
        if (url.includes("youtu.be") || url.includes("youtube.com")) {
          const videoId = getYouTubeId(url);
          if (videoId) thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }

        // Source detection
        if (url.includes("youtube")) source = "youtube";
        else if (url.includes("instagram")) source = "instagram";
        else if (url.includes("twitter")) source = "twitter";
        else if (url.includes("linkedin")) source = "linkedin";
        else if (url.includes("github")) source = "github";

        // Fallbacks
        title = title || extractedTitle;
        content = content || description;

      } catch (err) {
        console.log("Metadata fetch error:", err.message);
        title = title || "Untitled";
        content = content || "";
      }
    }

    // 🧱 CREATE ITEM IN DB
    const item = await Item.create({
      userId: req.user.id,
      type,
      title,
      url,
      content,
      thumbnail,
      source,
    });

    // 🤖 AI PROCESS IN BACKGROUND (not blocking response)
    processItem(item._id).catch((e) => console.log("AI process error:", e.message));

    // ✅ Send complete metadata immediately
    res.status(201).json({ success: true, item });

  } catch (err) {
    console.log("Create item error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📥 GET ITEMS
export const getItems = async (req, res) => {
  try {
    const { type } = req.query;
    let filter = { userId: req.user.id };

    if (type === "deleted") filter.isDeleted = true;
    else if (type === "archived") { filter.isArchived = true; filter.isDeleted = false; }
    else { filter.isDeleted = { $ne: true }; filter.isArchived = { $ne: true }; }

    const items = await Item.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, items });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🗑 SOFT DELETE
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, userId: req.user.id });
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    item.isDeleted = true;
    item.deletedAt = new Date();
    await item.save();

    res.json({ success: true, message: "Moved to Recently Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📦 ARCHIVE
export const archiveItem = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, userId: req.user.id });
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    item.isArchived = true;
    await item.save();

    res.json({ success: true, message: "Item archived" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ♻️ RESTORE
export const restoreItem = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, userId: req.user.id });
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    item.isDeleted = false;
    item.deletedAt = null;
    await item.save();

    res.json({ success: true, message: "Item restored" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ❌ PERMANENT DELETE
export const permanentDelete = async (req, res) => {
  try {
    await Item.deleteOne({ _id: req.params.id, userId: req.user.id });
    res.json({ success: true, message: "Permanently deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};