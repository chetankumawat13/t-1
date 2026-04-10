export const transformSocial = (items) => {
    const map = {};
  
    items.forEach((item) => {
      if (!item.source) return;
  
      const source = item.source;
  
      if (!map[source]) {
        map[source] = 0;
      }
  
      map[source]++;
    });
  
  
    return Object.entries(map).map(([name, value]) => ({
      name,
      value,
    }));
  };