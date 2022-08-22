import BackContext from "./BackContext";

import Nav from "./Nav";
import axios from "axios";
import { authConfig } from "../../Functions/auth";
import Admin from "./Admin/Admin";
import { useEffect, useState } from "react";

function Back({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [stories, setStories] = useState(null);
  const [deleteStory, setDeleteStory] = useState(null);
  const [approveStory, setApproveStory] = useState(null);

  //READ STORIES
  useEffect(() => {
    axios
      .get("http://localhost:3003/admin/story", authConfig())
      .then((res) => setStories(res.data));
  }, [lastUpdate]);

  //DELETE PRODUCT

  useEffect(() => {
    if (null === deleteStory) return;
    axios
      .delete(
        "http://localhost:3003/admin/story/" + deleteStory.id,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [deleteStory]);

  //EDIT Product

  useEffect(() => {
    if (null === approveStory) return;
    axios
      .put(
        "http://localhost:3003/admin/story/" + approveStory.id,
        approveStory,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [approveStory]);

  return (
    <BackContext.Provider
      value={{
        stories,
        setDeleteStory,
        setApproveStory,
      }}
    >
      {show === "admin" ? (
        <>
          <Nav />
          <Admin />
        </>
      ) : null}
    </BackContext.Provider>
  );
}
export default Back;
