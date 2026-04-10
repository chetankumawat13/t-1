export const transformTimeline = (items) => {
    const map = {};
  
    items.forEach((item) => {
      if (!item.createdAt || !item.hotTag) return;
  
     
      const date = new Date(item.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      });
  
      const tag = item.hotTag.toLowerCase();
  
     
      if (!map[date]) {
        map[date] = { date };
      }
  
   
      if (!map[date][tag]) {
        map[date][tag] = 0;
      }
  
      map[date][tag]++;
    });
  
  
    return Object.values(map);
  };