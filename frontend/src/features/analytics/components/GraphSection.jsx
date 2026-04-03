import TagsChart from "./TagsChart";
import SocialChart from "./SocialChart";

const GraphSection = () => {
  return (
    <div className="graphs">
      
      <div className="graphs__box">
        <h3>Top Tags</h3>
        <TagsChart />
      </div>

      <div className="graphs__box">
        <h3>Social Platforms</h3>
        <SocialChart />
      </div>

    </div>
  );
};

export default GraphSection;