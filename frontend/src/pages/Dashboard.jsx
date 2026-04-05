import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../features/analytics/components/Sidebar";
import Header from "../features/analytics/components/Header";
import StatsCards from "../features/analytics/components/StatsCards";
import Filters from "../features/analytics/components/Filters";
import GraphSection from "../features/analytics/components/GraphSection";
import TimelineChart from "../features/analytics/components/TimelineChart";
import Heatmap from "../features/analytics/components/Heatmap";

import { useAnalytics } from "../features/analytics/hooks/useAnalytics";

const Dashboard = () => {
  const location = useLocation();

  // 🔥 Home detect
  const isHome = location.pathname === "/";

  const {
    loading,

    // filters
    setTime,
    setTag,
    setSocial,

    // data
    stats,
    tags,
    socials,
    tagsData,
    socialData,
    timelineData,
    heatmapData,
  } = useAnalytics();

  return (
    <div className="dashboard">

      {/* 🔥 LEFT SIDEBAR (ALWAYS SAME) */}
      <Sidebar />

      {/* 🔥 RIGHT SIDE */}
      <div className="dashboard__main">

        {/* 🔥 HEADER (ALWAYS SAME) */}
        <Header />

        {/* 🔥 HOME PAGE (Analytics) */}
        {isHome && (
          <>
            {loading ? (
              <p style={{ color: "white" }}>Loading dashboard...</p>
            ) : (
              <>
                <Filters
                  onTimeChange={setTime}
                  onTagChange={setTag}
                  onSocialChange={setSocial}
                  tags={tags}
                  socials={socials}
                />

                <StatsCards stats={stats} />

                <GraphSection
                  tagsData={tagsData}
                  socialData={socialData}
                />

                <TimelineChart data={timelineData} />

                <Heatmap data={heatmapData} />
              </>
            )}
          </>
        )}

        {/* 🔥 OTHER PAGES (All Saves / Deleted) */}
        {!isHome && (
          <div className="dashboard__content">
            <Outlet />
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;