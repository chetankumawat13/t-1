const Filters = ({
    onTimeChange,
    onTagChange,
    onSocialChange,
    tags,
    socials,
  }) => {
    return (
      <div className="filters">
  
        {/* TIME */}
        <select onChange={(e) => onTimeChange(e.target.value)}>
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
  
        {/* TAG */}
        <select onChange={(e) => onTagChange(e.target.value)}>
          <option value="all">All Tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
  
        {/* SOCIAL */}
        <select onChange={(e) => onSocialChange(e.target.value)}>
          <option value="all">All Social</option>
          {socials.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
  
      </div>
    );
  };
  
  export default Filters;