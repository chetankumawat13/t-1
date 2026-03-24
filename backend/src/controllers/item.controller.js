import Item from "../models/item.model.js";
import axios from "axios";
import * as cheerio from "cheerio";

// ➕ CREATE ITEM
export const createItem = async (req, res) => {
  try {
    let { type, title, url, content } = req.body;

    // 👉 NEW LOGIC START
    if (type === "url" && url) {
      try {
        const response = await axios.get(url);
        const html = response.data;

        const $ = cheerio.load(html);

        const extractedTitle = $("title").text();

let description =
  $('meta[name="description"]').attr("content") ||
  $('meta[property="og:description"]').attr("content") ||
  "";

title = title || extractedTitle;
content = content || description;

let image =
  $('meta[property="og:image"]').attr("content") || "";

        // fallback
        title = title || extractedTitle;
        content = content || description;

      } catch (err) {
        console.log("Metadata fetch error:", err.message);
      }
    }
    // 👉 NEW LOGIC END

    const item = await Item.create({
      userId: req.user.id,
      type,
      title,
      url,
      content,
    });

    res.status(201).json(item);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📥 GET ALL ITEMS
export const getItems = async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ DELETE ITEM (optional but useful)
export const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};