import Item from "../models/item.model.js";

export const semanticSearch = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || !query.trim()) {
      return res.json({ success: true, items: [] });
    }

    const items = await Item.find({
      userId: req.user.id,
      isDeleted: { $ne: true },
      isArchived: { $ne: true },
    });

    // 🔥 FIXED: simple case-insensitive substring match
    const results = items.filter((item) => {
      const text = `${item.title ?? ""} ${item.content ?? ""} ${
        item.tags?.join(" ") ?? ""
      }`;
      return text.toLowerCase().includes(query.toLowerCase());
    });

    res.json({ success: true, items: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};