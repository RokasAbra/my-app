import FrontContext from "./FrontContext";
import FrontNav from "./Nav";
import axios from "axios";
import { useEffect, useState } from "react";
import StoryCrud from "./Story/Crud";
import List from "./PublicList/List";

function Front({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [stories, setStories] = useState(null);
  const [createStory, setCreateStory] = useState(null);

  const [donors, setDonors] = useState(null);
  const [createDonor, setCreateDonor] = useState(null);

  const [donationSum, setDonationSum] = useState(null);

  //READ STORIES
  useEffect(() => {
    axios
      .get("http://localhost:3003/story")
      .then((res) => setStories(res.data));
  }, [lastUpdate]);

  //CREATE STORIES

  useEffect(() => {
    if (null === createStory) return;
    axios.post("http://localhost:3003/story", createStory).then((res) => {
      setLastUpdate(Date.now());
    });
  }, [createStory]);

  //READ DONORS
  useEffect(() => {
    axios
      .get("http://localhost:3003/donors")
      .then((res) => setDonors(res.data));
  }, [lastUpdate]);

  //CREATE DONORS

  useEffect(() => {
    if (null === createDonor) return;
    axios.post("http://localhost:3003/donors", createDonor).then((res) => {
      setLastUpdate(Date.now());
    });
  }, [createDonor]);

  //EDIT Stories sums
  useEffect(() => {
    if (null === donationSum) return;
    axios
      .put("http://localhost:3003/story/" + donationSum.id, donationSum)
      .then((_) => {
        setLastUpdate(Date.now());
      });
  }, [donationSum]);

  return (
    <FrontContext.Provider
      value={{
        stories,
        setCreateStory,
        donors,
        setCreateDonor,
        setDonationSum,
      }}
    >
      {show === "/" ? (
        <>
          <FrontNav />
        </>
      ) : show === "story" ? (
        <StoryCrud />
      ) : null}
      <FrontNav />
      <div className="container">
        <div className="row">
          <List />
        </div>
      </div>
    </FrontContext.Provider>
  );
}
export default Front;
