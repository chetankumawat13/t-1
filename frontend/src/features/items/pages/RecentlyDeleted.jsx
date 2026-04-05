import { useEffect, useState } from "react";
import SaveCard from "../components/SaveCard";
import {
  getItemsApi,
  restoreItemApi,
  permanentDeleteApi,
} from "../services/iteamApi.js";

const RecentlyDeleted = () => {
  const [items, setItems] = useState([]);

  const fetchDeletedItems = async () => {
    try {
      const res = await getItemsApi({ type: "deleted" });
      setItems(res.data.items);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDeletedItems();
  }, []);

  const handleRestore = async (id) => {
    try {
      await restoreItemApi(id);
      fetchDeletedItems(); // refresh deleted list
    } catch (err) {
      console.log(err);
    }
  };

  const handlePermanentDelete = async (id) => {
    try {
      await permanentDeleteApi(id);
      fetchDeletedItems(); // refresh deleted list
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="all-saves-page">
      <div className="h2"><h2>Recently Deleted</h2></div>

      <div className="saves-container">
        {items.map((item) => (
          <SaveCard
            key={item._id}
            item={item}
            onDelete={handlePermanentDelete} // permanent delete
            onArchive={handleRestore} // restore
            isDeletedView={true} // special flag for styling/buttons
          />
        ))}
      </div>
    </div>
  );
};

export default RecentlyDeleted;