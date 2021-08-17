import Marvel_logo from "../pictures/marvel_logo.png";
import "./header.css";
import { useLocation, useHistory } from "react-router-dom";

const Header = ({
  nameSearch,
  handleNameSearch,
  titleSearch,
  handleTitleSearch,
}) => {
  const location = useLocation();
  const history = useHistory();

  return (
    <div>
      {location.pathname === "/characters" ? (
        <>
          <div className="header-main">
            <div className="marvel-logo2">
              <img
                className="marvel-logo-img2"
                src={Marvel_logo}
                alt="logo"
                onClick={() => {
                  history.push("/");
                }}
              />
            </div>
            <div className="search-input-div">
              <input
                type="text"
                className="search-input"
                placeholder="find character by name"
                onChange={handleNameSearch}
                value={nameSearch}
              />
            </div>
          </div>
        </>
      ) : location.pathname === "/comics" ? (
        <>
          <div className="header-main">
            <div className="marvel-logo2">
              <img
                className="marvel-logo-img2"
                src={Marvel_logo}
                alt="logo"
                onClick={() => {
                  history.push("/");
                }}
              />
            </div>
            <div className="search-input-div">
              <input
                type="text"
                className="search-input"
                placeholder="find comics by title"
                onChange={handleTitleSearch}
                value={titleSearch}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="header-main2">
            <div className="marvel-logo2">
              <img
                className="marvel-logo-img2"
                src={Marvel_logo}
                alt="logo"
                onClick={() => {
                  history.push("/");
                }}
              />
            </div>
            <div className="search-input-div">
              <p>
                “The pleasure of reading a story and wondering what will come
                next for the hero is a pleasure that has lasted for centuries
                and, I think, will always be with us.”
              </p>
              <p className="stanleeparagraph">STAN LEE </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
