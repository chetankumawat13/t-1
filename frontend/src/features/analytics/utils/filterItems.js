 const applyFilters = (items, time, tag, social) => {
    const now = new Date();
  
    return items.filter((item) => {
      const itemDate = new Date(item.createdAt);
  
      // TIME
      if (time === "today" && itemDate.toDateString() !== now.toDateString())
        return false;
  
      if (
        time === "month" &&
        (itemDate.getMonth() !== now.getMonth() ||
          itemDate.getFullYear() !== now.getFullYear())
      )
        return false;
  
      if (time === "year" && itemDate.getFullYear() !== now.getFullYear())
        return false;
  
      // TAG
      if (tag !== "all" && !item.tags?.includes(tag)) return false;
  
      // SOCIAL
      if (social !== "all") {
        if (social === "YouTube" && !item.url?.includes("youtube")) return false;
        if (social === "Instagram" && !item.url?.includes("instagram")) return false;
        if (social === "Twitter" && !item.url?.includes("twitter")) return false;
      }
  
      return true;
    });
  };

  export default applyFilters; 