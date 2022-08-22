import { useContext } from "react";
import BackContext from "../BackContext";

function Product({ story }) {
  const { setDeleteStory, setApproveStory } = useContext(BackContext);

  const handleDelete = () => {
    setDeleteStory(story);
  };

  const handleApprove = () => {
    const data = { ...story, approved: 1 };
    setApproveStory(data);
  };

  const handleDissaprove = () => {
    const data = { ...story, approved: 0 };
    setApproveStory(data);
  };

  return (
    <li className="admin-list-item">
      <div className="content">
        <b className="item">{story.title}</b>
        <span className="item">{story.text}</span>
        <b className="item">Goal: {story.sum} EUR</b>
        <span
          className="item"
          style={{ color: story.approved ? "green" : "red" }}
        >
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

      <div className="buttons">
        <button type="button" className="button btn4" onClick={handleApprove}>
          Approve
        </button>
        <button
          type="button"
          className="button btn5"
          onClick={handleDissaprove}
        >
          DisApprove
        </button>
        <button type="button" className="button btn3" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default Product;
