import { useMemo, useState, useEffect } from "react";
import API from "../../../app/axios";

import { useItems } from "../../items/hooks/useItems";
import { transformHeatmap } from "../utils/transformHeatmap";
import { transformTimeline } from "../utils/transformTimeline";
import { transformTags } from "../utils/transformTags";
import { transformSocial } from "../utils/transformSocial";

// 🔥 FIXED STREAK CALCULATOR
const calculateStreak = (items) => {
  if (!items || items.length === 0) return 0;

  // 📅 Normalize dates (remove time)
  const dates = items.map((item) => {
    const d = new Date(item.createdAt);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  });

  // 🧹 Unique + sorted dates
  const uniqueDates = [...new Set(dates.map((d) => d.getTime()))]
    .map((t) => new Date(t))
    .sort((a, b) => b - a);

  let streak = 0;

  let current = new Date();
  current = new Date(
    current.getFullYear(),
    current.getMonth(),
    current.getDate()
  );

  for (let i = 0; i < uniqueDates.length; i++) {
    const d = uniqueDates[i];

    const diff =
      (current.getTime() - d.getTime()) /
      (1000 * 60 * 60 * 24);

    if (diff === 0 || diff === 1) {
      streak++;
      current = new Date(d); // ✅ safe copy
    } else {
      break;
    }
  }

  return streak > 30 ? "30+" : streak;
};

export const useAnalytics = () => {
  const { items, loading } = useItems();

  // 🔥 USER STATE
  const [user, setUser] = useState(null);

  // 🔥 FILTER STATES
  const [time, setTime] = useState("all");
  const [tag, setTag] = useState("all");
  const [social, setSocial] = useState("all");

  // ✅ FETCH USER
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/getUser");
        setUser(res.data.user);
      } catch (err) {
        console.log("❌ User fetch error:", err.response?.data || err.message);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // 🔥 FILTERED ITEMS
  const filteredItems = useMemo(() => {
    if (!items) return [];

    let data = [...items];
    const now = new Date();

    // ⏳ TIME FILTER
    if (time !== "all") {
      data = data.filter((item) => {
        const d = new Date(item.createdAt);

        if (time === "today") {
          return d.toDateString() === now.toDateString();
        }

        if (time === "month") {
          return (
            d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear()
          );
        }

        if (time === "year") {
          return d.getFullYear() === now.getFullYear();
        }

        return true;
      });
    }

    // 🏷 TAG FILTER
    if (tag !== "all") {
      data = data.filter((item) => item.hotTag === tag);
    }

    // 🌐 SOCIAL FILTER
    if (social !== "all") {
      data = data.filter((item) => item.source === social);
    }

    return data;
  }, [items, time, tag, social]);

  // 🔥 TRANSFORM DATA
  const heatmapData = useMemo(() => transformHeatmap(filteredItems), [filteredItems]);
  const timelineData = useMemo(() => transformTimeline(filteredItems), [filteredItems]);
  const tagsData = useMemo(() => transformTags(filteredItems), [filteredItems]);
  const socialData = useMemo(() => transformSocial(filteredItems), [filteredItems]);

  // 🔥 STATS
  const stats = useMemo(() => {
    if (!filteredItems.length) {
      return {
        total: 0,
        topTag: "—",
        topSocial: "—",
      };
    }

    const tagCount = {};
    const socialCount = {};

    filteredItems.forEach((item) => {
      tagCount[item.hotTag] = (tagCount[item.hotTag] || 0) + 1;
      socialCount[item.source] = (socialCount[item.source] || 0) + 1;
    });

    const topTag =
      Object.entries(tagCount).sort((a, b) => b[1] - a[1])[0]?.[0];

    const topSocial =
      Object.entries(socialCount).sort((a, b) => b[1] - a[1])[0]?.[0];

    return {
      total: filteredItems.length,
      topTag,
      topSocial,
    };
  }, [filteredItems]);

  // 🔥 FIXED STREAK
  const streak = useMemo(() => calculateStreak(items), [items]);

  // 🔥 DROPDOWNS
  const tags = useMemo(() => {
    return [...new Set(items?.map((i) => i.hotTag))];
  }, [items]);

  const socials = useMemo(() => {
    return [...new Set(items?.map((i) => i.source))];
  }, [items]);

  return {
    loading,
    user,
    streak,

    setTime,
    setTag,
    setSocial,

    heatmapData,
    timelineData,
    tagsData,
    socialData,
    stats,
    tags,
    socials,
  };
};