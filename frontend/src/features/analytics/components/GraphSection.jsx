import TagsChart from "./TagsChart";
import SocialChart from "./SocialChart";

const GraphSection = ({ tagsData, socialData }) => {
  return (
    <div className="graphs">

      <div className="graphs__box">
        <h3>Top Tags</h3>
        <TagsChart data={tagsData} />
      </div>

      <div className="graphs__box">
        <h3>Social Platforms</h3>
        <SocialChart data={socialData} />
      </div>

    </div>
  );
};

export default GraphSection;