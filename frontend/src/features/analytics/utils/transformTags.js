export const transformTags = (items) => {
    const map = {};
  
    items.forEach((item) => {
      if (!item.hotTag) return;
  
      const tag = item.hotTag.toLowerCase();
  
      if (!map[tag]) {
        map[tag] = 0;
      }
  
      map[tag]++;
    });
  
    // 🔥 convert to array for chart
    return Object.entries(map).map(([tag, count]) => ({
      tag,
      count,
    }));
  };