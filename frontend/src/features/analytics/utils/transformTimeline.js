export const transformTimeline = (items) => {
    const map = {};
  
    items.forEach((item) => {
      if (!item.createdAt || !item.hotTag) return;
  
      // 📅 date format
      const date = new Date(item.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      });
  
      const tag = item.hotTag.toLowerCase();
  
      // 🧠 init date object
      if (!map[date]) {
        map[date] = { date };
      }
  
      // 🔥 count increase
      if (!map[date][tag]) {
        map[date][tag] = 0;
      }
  
      map[date][tag]++;
    });
  
    // 📦 convert object → array
    return Object.values(map);
  };