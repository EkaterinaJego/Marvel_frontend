import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const Comics = ({ titleSearch, myUrl, userFavComics, setUserFavComics }) => {
  const givenLimit = 12;
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(givenLimit);
  const [comicsdata, setComicsData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${myUrl}/comics?title=${titleSearch}&skip=${skip}&limit=${limit}`
        );

        setComicsData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, skip, limit, setComicsData, titleSearch]);

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
        <div className="comics-main">
          {comicsdata.count > givenLimit && (
            <Pagination
              skip={skip}
              limit={limit}
              setSkip={setSkip}
              setLimit={setLimit}
            />
          )}
          <h1 className="welcome">Welcome to the Comics page</h1>
          <div className="comicbooks-collection">
            {comicsdata.results.map((item, index) => {
              let isInFav = userFavComics.indexOf(item._id) !== -1;
              return (
                <div className="comicsbook" key={index}>
                  <div className="iconstar">
                    <FontAwesomeIcon
                      icon="star"
                      className="iconstar"
                      style={{ color: !isInFav ? "grey" : "yellow" }}
                      onClick={() => {
                        const newFavs = [...userFavComics];
                        const indexOfFav = newFavs.indexOf(item._id);
                        indexOfFav === -1
                          ? newFavs.push(item._id)
                          : newFavs.splice(indexOfFav, 1);
                        setUserFavComics(newFavs);
                        Cookies.set("userFavComics", JSON.stringify(newFavs), {
                          expires: 7,
                        });
                        isInFav = !isInFav;
                      }}
                    />
                  </div>
                  <h2 className="comicstitle">{item.title}</h2>
                  <img
                    className="comicsimg"
                    src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                    alt={item.title}
                  />

                  {item.description ? (
                    <div className="comicsdescription">
                      <div className="comicsdescriptionp">
                        {item.description}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Comics;
