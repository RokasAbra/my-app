import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import FrontContext from "../FrontContext";
import getBase64 from "../../../Functions/getBase64";
import Logo from "./logo";

function Create() {
  const { setCreateStory } = useContext(FrontContext);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [sumNeed, setSumNeed] = useState("");

  const fileInput = useRef();
  const [picture, setPicture] = useState(null);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((picture) => setPicture(picture))
      .catch((_) => {
        // tylim
      });
  };
  const handleCreate = () => {
    const data = {
      title,
      text,
      picture: picture,
      sum: parseFloat(sumNeed),
      sum_remained: parseFloat(sumNeed),
    };
    setCreateStory(data);
    setTitle("");
    setText("");
    setPicture(null);
    setSumNeed("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 ml-1">
          <form className="form">
            <h2>Add new Story</h2>
            <div className="form-row">
              <input
                type="text"
                className="input"
                placeholder="Enter Story Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="form-row">
              <textarea
                className="input"
                placeholder="Enter Story"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                className="input"
                placeholder="Enter Sum Needed"
                onChange={(e) => setSumNeed(e.target.value)}
                value={sumNeed}
              />
            </div>

            <div className="form-row">
              <label>Upload Story Picture</label>
              <input
                ref={fileInput}
                type="file"
                className="input"
                onChange={doPhoto}
              />
            </div>
            {picture ? (
              <div className="herbas">
                <img src={picture} alt="nice" />
              </div>
            ) : null}
            <button type="button" className="btn" onClick={handleCreate}>
              Create
            </button>
          </form>
        </div>
        <div className="col-4"><Logo/></div>
      </div>
    </div>
  );
}

export default Create;
