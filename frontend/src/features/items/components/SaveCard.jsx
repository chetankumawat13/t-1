const SaveCard = ({ item, onDelete, onArchive, onRestore, isDeletedView, isArchiveView }) => {

  const formatSource = (source) => {
    if (!source) return "Website";
    const s = source.toLowerCase();
    if (s.includes("youtube")) return "YouTube";
    if (s.includes("instagram")) return "Instagram";
    if (s.includes("twitter")) return "Twitter";
    if (s.includes("pdf")) return "PDF";
    return "Website";
  };

  return (
    <div className="save-card">

      {/*  THUMBNAIL */}
      <img
        src={item.thumbnail || "https://ik.imagekit.io/ad6av31ld/default-thumbnail.jpg"}
        alt="thumb"
        className="save-card__img"
      />

      {/*  CONTENT */}
      <div className="save-card__body">

        {item.hotTag && <span className="hot-tag">{item.hotTag}</span>}
        {item.summary && <p className="summary">{item.summary}</p>}

        <div className="tags">
          {item.tags?.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
        </div>

        <button
          className="source-btn"
          onClick={() => item.url && window.open(item.url, "_blank")}
        >
          {formatSource(item.source)}
        </button>

        <div className="card-actions">
          {/*  Normal All Saves */}
          {!isDeletedView && !isArchiveView && (
            <>
              <button className="mini-btn delete" onClick={() => onDelete?.(item._id)}>Delete</button>
              <button className="mini-btn archive" onClick={() => onArchive?.(item._id)}>Archive</button>
            </>
          )}

          {/* ♻️ Recently Deleted */}
          {isDeletedView && (
            <>
              <button className="mini-btn restore" onClick={() => onArchive?.(item._id)}>Restore</button>
              <button className="mini-btn delete" onClick={() => onDelete?.(item._id)}>Permanent Delete</button>
            </>
          )}

          {/*  Archive */}
          {isArchiveView && (
            <>
              <button className="mini-btn restore" onClick={() => onRestore?.(item._id)}>Unarchive</button>
              <button className="mini-btn delete" onClick={() => onDelete?.(item._id)}>Delete</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SaveCard;