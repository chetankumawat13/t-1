import { useState } from "react";
import UploadModal from "./UploadModal";
import { createItemApi } from "../services/iteamApi.js";

const AddSave = ({ onSaved }) => {
  const [url, setUrl] = useState("");
  const [type, setType] = useState("url"); // matches backend
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSave = async () => {
    if (!url.trim()) return alert("Please enter a URL");

    try {
      setLoading(true);
      const payload = { url, type, title: "", content: "" };

      const res = await createItemApi(payload);
      console.log("Saved successfully 👉", res.data);

      setUrl("");
      setType("url");

      if (onSaved) onSaved(); // 🔥 refresh parent immediately
    } catch (err) {
      console.error("Error saving item:", err);
      alert(err.response?.data?.message || "Failed to save item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-save">
      <input
        type="text"
        placeholder="Paste link here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="url">YouTube / URL</option>
        <option value="article">Article</option>
        <option value="tweet">Tweet</option>
      </select>

      <button onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>

      <button onClick={() => setOpen(true)}>+ Upload</button>
      <UploadModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default AddSave;