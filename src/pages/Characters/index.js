import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const Characters = ({
  nameSearch,
  myUrl,
  userFavCharacters,
  setUserFavCharacters,
}) => {
  const givenLimit = 100;
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(givenLimit);
  const [charactersdata, setCharactersData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${myUrl}/characters?name=${nameSearch}&limit=${limit}&skip=${skip}`
        );
        setCharactersData(response.data);
      } catch (error) {
        console.log("Error = ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameSearch, limit, skip, isLoading, setCharactersData]);

  return (
    <>
      {isLoading ? (
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
          {charactersdata.count > givenLimit && (
            <Pagination
              skip={skip}
              limit={limit}
              setSkip={setSkip}
              setLimit={setLimit}
            />
          )}
          <h1 className="welcome">Welcome to the Characters page</h1>
          <div className="characters-collection">
            {charactersdata.results.map((item, index) => {
              let isInFav = userFavCharacters.indexOf(item._id) !== -1;
              return (
                <>
                  <div className="characteritem" key={index}>
                    <div>
                      <FontAwesomeIcon
                        icon="star"
                        className="iconstar"
                        style={{ color: !isInFav ? "grey" : "yellow" }}
                        onClick={() => {
                          const newFavs = [...userFavCharacters];
                          const indexOfFav = newFavs.indexOf(item._id);
                          indexOfFav === -1
                            ? newFavs.push(item._id)
                            : newFavs.splice(indexOfFav, 1);
                          setUserFavCharacters(newFavs);
                          Cookies.set(
                            "userFavCharacters",
                            JSON.stringify(newFavs),
                            {
                              expires: 7,
                            }
                          );
                          isInFav = !isInFav;
                        }}
                      />
                    </div>
                    <Link
                      to={`/comics/${item._id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <h2 className="charactername">{item.name}</h2>
                      <img
                        className="characterimg"
                        src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                        alt={item.name}
                      />
                      {item.description ? (
                        <div className="characterdescription">
                          <p>{item.description}</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Characters;
