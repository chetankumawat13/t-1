import { useState } from "react";
import { useAnalytics } from "../hooks/useAnalytics";

const getColor = (count) => {
  if (count === 0) return "#3a1f1f";
  if (count === 1) return "#9be9a8";
  if (count === 2) return "#40c463";
  if (count === 3) return "#30a14e";
  return "#216e39";
};

const Heatmap = () => {
  const { heatmapData, loading } = useAnalytics();
  const [hoverData, setHoverData] = useState(null);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="heatmap">
      <h3>Activity (Last 1 Year)</h3>

      <div className="heatmap__grid">
        {heatmapData.map((item, index) => (
          <div
            key={index}
            className="heatmap__cell"
            style={{ backgroundColor: getColor(item.count) }}
            onMouseEnter={() => setHoverData(item)}
            onMouseLeave={() => setHoverData(null)}
            title={
              new Date(item.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }) + ` → ${item.count} saves`
            }
          />
        ))}
      </div>

      {hoverData && (
        <div className="heatmap__tooltip">
          {new Date(hoverData.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
          {" "}→ {hoverData.count} saves
        </div>
      )}
    </div>
  );
};

export default Heatmap;