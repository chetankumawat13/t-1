import Sidebar from "../features/analytics/components/Sidebar";
import Header from "../features/analytics/components/Header";
import StatsCards from "../features/analytics/components/StatsCards";
import Filters from "../features/analytics/components/Filters";
import GraphSection from "../features/analytics/components/GraphSection";
import TimelineChart from "../features/analytics/components/TimelineChart";
import Heatmap from "../features/analytics/components/Heatmap";

import { useState } from "react";
import { useItems } from "../features/items/hooks/useItems";
import applyFilters from "../features/analytics/utils/filterItems";

const Dashboard = () => {
  const { items = [], loading } = useItems(); // ✅ FIX 1

  const [timeFilter, setTimeFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [socialFilter, setSocialFilter] = useState("all");

  // ✅ FIX 2: safe flatMap
  const allTags = Array.from(
    new Set((items || []).flatMap((item) => item.tags || []))
  );

  // ✅ FIX 3: safe mapping
  const allSocials = Array.from(
    new Set(
      (items || []).map((item) => {
        if (item.url?.includes("youtube")) return "YouTube";
        if (item.url?.includes("instagram")) return "Instagram";
        if (item.url?.includes("twitter")) return "Twitter";
        return "Other";
      })
    )
  );

  // ✅ FIX 4: safe filter call
  const filteredItems = applyFilters(
    items || [],
    timeFilter,
    tagFilter,
    socialFilter
  );

  // ✅ OPTIONAL: loading UI
  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard">
      {/* LEFT */}
      <Sidebar />

      {/* RIGHT */}
      <div className="dashboard__main">
        <Header />

        <Filters
          onTimeChange={setTimeFilter}
          onTagChange={setTagFilter}
          onSocialChange={setSocialFilter}
          tags={allTags}
          socials={allSocials}
        />

        <StatsCards items={filteredItems} /> {/* 🔥 pass filtered data */}
        <GraphSection items={filteredItems} />
        <TimelineChart items={filteredItems} />
        <Heatmap /> {/* heatmap already internally fetch kar raha hai */}
      </div>
    </div>
  );
};

export default Dashboard;