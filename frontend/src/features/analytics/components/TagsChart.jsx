import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useAnalytics } from "../hooks/useAnalytics";


const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];

    return (
      <div className="custom-tooltip">
        <p className="tooltip-title">{data.payload.tag}</p>
        <p className="tooltip-count">Count: {data.value}</p>
      </div>
    );
  }
  return null;
};

const TagsChart = () => {
  const { tagsData, loading } = useAnalytics();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="tags" style={{ width: "100%", height: 280 }}>
      
      <ResponsiveContainer>
        <BarChart
          data={tagsData}
          margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
        >
          
         
          <XAxis
            dataKey="tag"
            stroke="#cfcfcf"
            tick={{ fontSize: 11 }}
            tickFormatter={(val) =>
              val.length > 8 ? val.slice(0, 8) + "…" : val
            }
          />

          <YAxis stroke="#cfcfcf" />

        
          <Tooltip content={<CustomTooltip />} />

          <Bar
            dataKey="count"
            fill="#ff4d5a"
            radius={[6, 6, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
};

export default TagsChart;