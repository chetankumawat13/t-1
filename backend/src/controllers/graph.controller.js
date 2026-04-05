// controllers/graph.controller.js
import Item from "../models/item.model.js";

export const getGraphData = async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user.id, isDeleted: { $ne: true } });

    // 🔹 Create nodes from unique tags
    const nodesMap = {};
    const links = [];

    items.forEach(item => {
      if (item.tags?.length) {
        item.tags.forEach(tag => {
          if (!nodesMap[tag]) nodesMap[tag] = { id: tag, item };
        });

        // connect all tags of same item
        for (let i = 0; i < item.tags.length; i++) {
          for (let j = i + 1; j < item.tags.length; j++) {
            links.push({ source: item.tags[i], target: item.tags[j] });
          }
        }
      }
    });

    const nodes = Object.values(nodesMap);

    res.json({ success: true, nodes, links });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};