import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";

const Favorites = ({ userFavComics, userFavCharacters, myUrl }) => {
  // console.log("FAV / userFavComics = ", userFavComics);
  // console.log("FAV / userFavCharacters = ", userFavCharacters);

  const [comicsData, setComicsData] = useState([]);
  const [charactersData, setCharactersData] = useState([]);
  const [isLoadingComicsdata, setIsLoadingComicsdata] = useState(true);
  const [isLoadingCharactersdata, setIsLoadingCharactersdata] = useState(true);

  useEffect(() => {
    const fetchComicsData = async () => {
      try {
        const responseComics = await axios.get(`${myUrl}/comics`);
        setComicsData(responseComics.data);
        setIsLoadingComicsdata(false);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchCharactersData = async () => {
      try {
        const responseCharacters = await axios.get(`${myUrl}/characters`);
        setCharactersData(responseCharacters.data);
        setIsLoadingCharactersdata(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComicsData();
    fetchCharactersData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoadingComicsdata || isLoadingCharactersdata ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 30,
          }}
        >
          LOADING...
        </div>
      ) : (
        <>
          <h1 className="welcome">Welcome to your Favorites page</h1>
          <div className="main-fav">
            {userFavComics.length !== 0 && (
              <div className="fav-comics">
                <div className="fav-h1">Your favorite comics</div>
                {userFavComics.map((favComics) => {
                  const data = comicsData.results.find(
                    (comics) => comics._id === favComics
                  );
                  return (
                    <div>
                      <div className="fav-title">{data.title}</div>
                      <img
                        className="fav-img"
                        src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
                        alt={data.name}
                      />
                    </div>
                  );
                })}
              </div>
            )}
            {userFavCharacters.length !== 0 && (
              <div className="fav-characters">
                <div className="fav-h1">Your favorite characters</div>
                {userFavCharacters.map((favCharacter) => {
                  const data = charactersData.results.find(
                    (character) => character._id === favCharacter
                  );
                  return (
                    <>
                      <div className="fav-title">{data.name}</div>
                      <img
                        className="fav-img"
                        src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
                        alt={data.name}
                      />
                    </>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Favorites;
