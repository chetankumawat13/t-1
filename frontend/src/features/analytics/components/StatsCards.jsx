const StatsCards = ({ stats }) => {
  return (
    <div className="stats">

      <div className="stats__card">
        <p>Total Saves</p>
        <h2>{stats.total}</h2>
      </div>

      <div className="stats__card">
        <p>Top Tag</p>
        <h2>{stats.topTag}</h2>
      </div>

      <div className="stats__card">
        <p>Top Social</p>
        <h2>{stats.topSocial}</h2>
      </div>

    </div>
  );
};

export default StatsCards;