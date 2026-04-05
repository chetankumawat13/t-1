import { useEffect, useState } from "react";
import SaveCard from "../components/SaveCard";
import { getItemsApi, unarchiveItemApi, deleteItemApi } from "../services/iteamApi.js";

const Archive = () => {
  const [items, setItems] = useState([]);

  const fetchArchiveItems = async () => {
    try {
      const res = await getItemsApi({ type: "archived" });
      setItems(res.data.items);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchArchiveItems(); }, []);

  const handleUnarchive = async (id) => {
    await unarchiveItemApi(id);
    fetchArchiveItems();
  };

  const handleDelete = async (id) => {
    await deleteItemApi(id); // moves to Recently Deleted
    fetchArchiveItems();
  };

  return (
    <div className="all-saves-page">
      <div className="h2"><h2>Archive</h2></div>

      <div className="saves-container">
        {items.map(item => (
          <SaveCard
            key={item._id}
            item={item}
            onRestore={handleUnarchive}  // unarchive button
            onDelete={handleDelete}      // soft delete
            isArchiveView={true}         // flag for archive styling/buttons
          />
        ))}
      </div>
    </div>
  );
};

export default Archive;