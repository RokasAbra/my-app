
import { useContext } from "react";
import FrontContext from "../FrontContext";
import Story from "./Story";

function List() {
  const { stories} = useContext(FrontContext);

 
  return (
    <div className=" list-container">
      <div className="row">
        <div className="col-12 list-form">
          <h2>List of all Stories</h2>
          <div className="list-group">
          <ul className="list-group-item">
          {stories
              ?  stories.map((story) => ( story.approved === 1 ?
                  <Story key={story.id} story={story}></Story> : null
                ))
              : null}
          </ul>
      
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;