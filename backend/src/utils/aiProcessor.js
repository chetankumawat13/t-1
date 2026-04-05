import Item from "../models/item.model.js";
import { generateSummaryTagsAndSource } from "../services/ai.service.js";
import { detectSource } from "../utils/detectSource.js";

export async function processItem(itemId) {
  try {
    const item = await Item.findById(itemId);

    if (!item) return;

    const text = `${item.title || ""} ${item.content || ""}`;

    // 🤖 AI CALL
    const aiData = await generateSummaryTagsAndSource(text);

    // 🔥 SOURCE DETECTION (NON-AI)
    const source = detectSource(item.url);

    await Item.findByIdAndUpdate(itemId, {
      summary: aiData.summary,
      tags: aiData.tags,
      hotTag: aiData.hotTag,   // ✅ NEW
      source: source,          // ✅ NEW
    });

    console.log("✅ AI processed item");
    console.log("AI DATA:", {
      ...aiData,
      source
    });

  } catch (error) {
    console.log("Processor Error:", error);
  }
}