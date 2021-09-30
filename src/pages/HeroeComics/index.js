import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { useEffect, useState } from "react";

const HeroeComics = ({ myUrl }) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [heroecomicsdata, setHeroecomicsData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${myUrl}/comics/${id}`);
        setHeroecomicsData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id, setIsLoading, setHeroecomicsData]);

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
        <div className="heroecomics-main">
          <div className="heroeportrait">
            <img
              className="heroeportait-img"
              src={`${heroecomicsdata.thumbnail.path}.${heroecomicsdata.thumbnail.extension}`}
              alt={heroecomicsdata.name}
            />
            <div className="heroecomics-div-h2">
              <h2 className="heroecomics-h2">
                Comics with <br />
                {heroecomicsdata.name}
              </h2>
            </div>
          </div>

          <div className="heroecomics-collection">
            {heroecomicsdata.comics.map((comics, id) => {
              return (
                <div key={comics._id} className="heroecomics-carrousel">
                  <div className="heroecomics-carrousel-div">
                    <p className="heroecomics-carrousel-title">
                      {comics.title}
                    </p>
                    <img
                      className="heroecomics-carrousel-img"
                      src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
                      alt={comics.id}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default HeroeComics;
