export const calculateStreak = (items) => {
    if (!items || items.length === 0) return 0;
  
    // 🔥 all dates (only date part)
    const dates = items.map((item) =>
      new Date(item.createdAt).toLocaleDateString()
    );
  
    const uniqueDates = [...new Set(dates)];
  
    // 🔥 sort latest first
    uniqueDates.sort((a, b) => new Date(b) - new Date(a));
  
    let streak = 0;
    let currentDate = new Date();
  
    for (let i = 0; i < uniqueDates.length; i++) {
      const d = new Date(uniqueDates[i]);
  
      const diff =
        (currentDate.setHours(0, 0, 0, 0) -
          d.setHours(0, 0, 0, 0)) /
        (1000 * 60 * 60 * 24);
  
      if (diff === 0 || diff === 1) {
        streak++;
        currentDate = d;
      } else {
        break;
      }
    }
  
    return streak > 30 ? "30+" : streak;
  };