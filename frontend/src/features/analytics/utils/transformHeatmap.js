export const transformHeatmap = (items) => {
  const map = {};

  // ✅ Step 1: count per day (LOCAL DATE)
  items.forEach((item) => {
    const d = new Date(item.createdAt);

    const date = d.toLocaleDateString("en-CA"); // YYYY-MM-DD

    map[date] = (map[date] || 0) + 1;
  });

  // ✅ Step 2: FIXED base date (IMPORTANT)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 🔥 normalize

  const result = [];

  // ✅ Step 3: rolling 365 days window
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