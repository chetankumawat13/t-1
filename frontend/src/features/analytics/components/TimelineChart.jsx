import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { useAnalytics } from "../hooks/useAnalytics";


const tagColors = {};
const colors = [
  "#FF4D5A",
  "#4CC9F0",
  "#F72585",
  "#B5179E",
  "#7209B7",
  "#560BAD",
  "#480CA8",
  "#3A0CA3",
  "#4361EE",
  "#4895EF",
  "#4CAF50",
  "#FF9800",
];

const getColor = (tag, index) => {
  if (!tagColors[tag]) {
    tagColors[tag] = colors[index % colors.length];
  }
  return tagColors[tag];
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-date">{label}</p>

        {payload.map((item, index) => {
          if (!item.value) return null;

          return (
            <div key={index} className="tooltip-item">
              <span
                className="tooltip-color"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.name}</span>
              <span>{item.value}</span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

const TimelineChart = () => {
  const [range, setRange] = useState(15);

 
  const { timelineData, loading } = useAnalytics();

 
  const data = timelineData.slice(-range);

 
  const allTags = Array.from(
    new Set(data.flatMap((d) => Object.keys(d).filter((k) => k !== "date")))
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="timeline">

      
      <div className="timeline__header">
        <h3>Tag Timeline</h3>

        <select
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
          className="timeline__filter"
        >
          <option value={15}>Last 15 days</option>
          <option value={30}>Last 30 days</option>
        </select>
      </div>

   
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis
              dataKey="date"
              stroke="#cfcfcf"
              interval={0}
              tick={{ fontSize: 10 }}
            />
            <YAxis stroke="#cfcfcf" />
            <Tooltip content={<CustomTooltip />} />

            {allTags.map((tag, index) => (
              <Bar
                key={tag}
                dataKey={tag}
                stackId="a"
                fill={getColor(tag, index)}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

     
      <div className="timeline__legend">
        {allTags.map((tag, index) => (
          <div key={tag} className="legend__item">
            <span
              className="legend__color"
              style={{ backgroundColor: getColor(tag, index) }}
            />
            <span className="legend__text">{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineChart;