import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useAnalytics } from "../hooks/useAnalytics";

// 🎨 COLORS
const COLORS = ["#FF4D5A", "#4DA6FF", "#FFD166", "#06D6A0", "#7209B7"];

const SocialChart = () => {
  const { socialData, loading } = useAnalytics();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="social-chart">
      
      {/* GRAPH */}
      <div className="social-chart__graph">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={socialData}
              dataKey="value"
              outerRadius={80}
              innerRadius={45}
            >
              {socialData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* LEGEND */}
      <div className="social-chart__legend">
        {socialData.map((item, index) => (
          <div key={index} className="legend__item">
            <span
              className="legend__color"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></span>
            <span className="legend__text">{item.name}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default SocialChart;