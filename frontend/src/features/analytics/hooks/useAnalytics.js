import { useMemo } from "react";
import { useItems } from "../../items/hooks/useItems";
import { transformHeatmap } from "../utils/transformHeatmap";
import { transformTimeline } from "../utils/transformTimeline";
import { transformTags } from "../utils/transformTags"; // ✅ NEW
import { transformSocial } from "../utils/transformSocial";

export const useAnalytics = () => {
  const { items, loading } = useItems();

  // 🔥 HEATMAP DATA
  const heatmapData = useMemo(() => {
    if (!items || items.length === 0) return [];
    return transformHeatmap(items);
  }, [items]);

  // 🔥 TIMELINE DATA
  const timelineData = useMemo(() => {
    if (!items || items.length === 0) return [];
    return transformTimeline(items);
  }, [items]);

  // 🔥 TOP TAGS DATA (NEW)
  const tagsData = useMemo(() => {
    if (!items || items.length === 0) return [];
    return transformTags(items);
  }, [items]);


  const socialData = useMemo(() => {
    if (!items || items.length === 0) return [];
    return transformSocial(items);
  }, [items]);

  return {
    heatmapData,
    timelineData,
    tagsData,
    socialData, 
    loading,
  };
};