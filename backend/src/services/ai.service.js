import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";


import dotenv from "dotenv";
dotenv.config(); 

const model = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-small-latest",
});


const normalizeSource = (src) => {
  if (!src) return "Other";

  const s = src.toLowerCase();

  if (s.includes("youtube")) return "YouTube";
  if (s.includes("instagram")) return "Instagram";
  if (s.includes("twitter")) return "Twitter";
  if (s.includes("linkedin")) return "LinkedIn";
  if (s.includes("github")) return "GitHub";

  return "Other";
};

const normalizeTags = (tags = []) => {
  return tags.map((t) => t.toLowerCase().trim());
};

const normalizeHotTag = (tag) => {
  return tag ? tag.toLowerCase().trim() : "general";
};


export async function generateSummaryTagsAndSource(text) {
  try {
    const response = await model.invoke([
      new SystemMessage(`
You are an expert content analyzer.

Return ONLY valid JSON:

{
  "summary": "short 2 line summary",
  "tags": ["tag1", "tag2", "tag3"],
  "hotTag": "ONE normalized category tag",
  "source": "platform name"
}

IMPORTANT RULES:

1. tags:
- lowercase keywords
- specific

2. hotTag:
- broad category
- consistent

3. source must be one of:
["YouTube", "Instagram", "Twitter", "LinkedIn", "GitHub", "Other"]

Return ONLY JSON
      `),
      new HumanMessage(text),
    ]);

    let content = response.content;

   
    content = content.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(content);

    return {
      summary: parsed.summary || text.slice(0, 120),
      tags: normalizeTags(parsed.tags),
      hotTag: normalizeHotTag(parsed.hotTag),
      source: normalizeSource(parsed.source),
    };

  } catch (error) {
    console.log("AI Error:", error);

    return {
      summary: text.slice(0, 120),
      tags: [],
      hotTag: "general",
      source: "Other",
    };
  }
}