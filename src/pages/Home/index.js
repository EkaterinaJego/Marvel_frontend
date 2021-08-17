import React from "react";
import "./index.css";
import { useHistory } from "react-router-dom";
import MarvelCharacters from "../../pictures/deadpoolweading.jpg";

const Home = () => {
  const history = useHistory();

  return (
    <div className="home-main">
      <div className="home-folders">
        <p onClick={() => history.push("/comics")}>Comics</p>
        <p onClick={() => history.push("/characters")}>Characters</p>
        <p onClick={() => history.push("/favorites")}>Favorites</p>
      </div>
      <img src={MarvelCharacters} alt="marvel-characters" />
    </div>
  );
};

export default Home;
