function Story({ story }) {
  return (
    <>
    <li className="list-item">
      <div className="content">
        <b className="item">{story.title}</b>
        <span className="item">{story.text}</span>
        <b className="item">Goal: {story.sum} EUR</b>
        <span className="item" style={{ color: story.approved ? "green" : "red" }}>
          {story.approved ? "Approved" : "Not approved"}
        </span>
      </div>
      <div className="photo-box">
        {story.picture ? (
          <div className="herbas">
            <img src={story.picture} alt={story.title} />
          </div>
        ) : null}
      </div>
    </li>
    </>
  );
}

export default Story;
