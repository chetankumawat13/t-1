export const transformHeatmap = (items) => {
  const map = {};


  items.forEach((item) => {
    const d = new Date(item.createdAt);

    const date = d.toLocaleDateString("en-CA"); 

    map[date] = (map[date] || 0) + 1;
  });


  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  const result = [];


  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    const formatted = d.toLocaleDateString("en-CA");

    result.push({
      date: formatted,
      count: map[formatted] || 0,
    });
  }

  return result;
};