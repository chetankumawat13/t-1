import { useEffect, useState } from "react";
import SaveCard from "../components/SaveCard";
import AddSave from "../components/AddSave";
import {
  getItemsApi,
  deleteItemApi,
  archiveItemApi,
  semanticSearchApi,
} from "../services/iteamApi.js";

const AllSaves = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const fetchItems = async () => {
    try {
      const res = await getItemsApi();
      setItems(res.data.items);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id) => { await deleteItemApi(id); fetchItems(); };
  const handleArchive = async (id) => { await archiveItemApi(id); fetchItems(); };

  const handleSearch = async (query) => {
    if (!query.trim()) return fetchItems();
    try { const res = await semanticSearchApi(query); setItems(res.data.items); }
    catch (err) { console.log(err); }
  };

  useEffect(() => {
    const delay = setTimeout(() => handleSearch(search), 400);
    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div className="all-saves-page">
      <AddSave onSaved={fetchItems} />

      <div className="divider" />
      <div className="h2"><h2>Search your content</h2></div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search anything..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="saves-container">
        {items.map((item) => (
          <SaveCard
            key={item._id}
            item={item}
            onDelete={handleDelete}
            onArchive={handleArchive}
          />
        ))}
      </div>
    </div>
  );
};

export default AllSaves;