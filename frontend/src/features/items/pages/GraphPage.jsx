import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { getItemsApi } from "../services/iteamApi.js";
import SaveCard from "../components/SaveCard";

const GraphPage = () => {
  const svgRef = useRef();
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);

  // ✅ NEW: tooltip position
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchGraphData = async () => {
      const res = await getItemsApi({ type: "all" });
      const items = res.data.items;

      const nodesMap = {};
      const graphLinks = [];

      items.forEach(item => {
        if (item.tags?.length) {
          item.tags.forEach(tag => {
            if (!nodesMap[tag]) {
              nodesMap[tag] = { id: tag, items: [item] };
            } else {
              nodesMap[tag].items.push(item);
            }
          });

          for (let i = 0; i < item.tags.length; i++) {
            for (let j = i + 1; j < item.tags.length; j++) {
              graphLinks.push({
                source: item.tags[i],
                target: item.tags[j]
              });
            }
          }
        }
      });

      setNodes(Object.values(nodesMap));
      setLinks(graphLinks);
    };

    fetchGraphData();
  }, []);

  useEffect(() => {
    if (!nodes.length) return;

    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const simulationNodes = nodes.map(n => ({
      ...n,
      x: width / 2,
      y: height / 2
    }));

    const simulation = d3.forceSimulation(simulationNodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(80))
      .force("charge", d3.forceManyBody().strength(-150))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(30))
      .alpha(1)
      .restart();

    // LINKS
    const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke-width", 1.5);

    // NODES
    const node = svg.append("g")
      .selectAll("circle")
      .data(simulationNodes)
      .enter()
      .append("circle")
      .attr("r", 20)
      .attr("fill", "orange")
      .call(
        d3.drag()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      )
      // ✅ HOVER + MOUSE MOVE
      .on("mouseover", (event, d) => {
        setHoveredItem(d.items?.[0]);
      })
      .on("mousemove", (event) => {
        setTooltipPos({
          x: event.offsetX,
          y: event.offsetY
        });
      })
      .on("mouseout", () => {
        setHoveredItem(null);
      });

    // TICK
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source?.x || 0)
        .attr("y1", d => d.source?.y || 0)
        .attr("x2", d => d.target?.x || 0)
        .attr("y2", d => d.target?.y || 0);

      node
        .attr("cx", d => {
          d.x = Math.max(20, Math.min(width - 20, d.x));
          return d.x;
        })
        .attr("cy", d => {
          d.y = Math.max(20, Math.min(height - 20, d.y));
          return d.y;
        });
    });

  }, [nodes, links]);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 20
      }}
    >
      {/* TITLE */}
      <div
        style={{
          fontWeight: "bold",
          fontSize: 22,
          marginBottom: 30
        }}
      >
        Graph Analysis of Your Saves
      </div>

      {/* GRAPH */}
      <div style={{ position: "relative", marginTop: 10, overflow: "hidden" }}>
        <svg
          ref={svgRef}
          width={800}
          height={600}
          style={{ border: "1px solid #ccc" }}
        />

        {/* ✅ TOOLTIP CARD */}
        {hoveredItem && (
          <div
            style={{
              position: "absolute",
              top: tooltipPos.y + 20,
              left: tooltipPos.x + 20,
              width: 280,
              zIndex: 10,
              pointerEvents: "none"
            }}
          >
            <SaveCard item={hoveredItem} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphPage;