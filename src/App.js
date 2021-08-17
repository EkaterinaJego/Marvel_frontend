import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import Characters from "./pages/Characters";
import HeroeComics from "./pages/HeroeComics";
import Favorites from "./pages/Favorites";
import Cookies from "js-cookie";

import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
library.add(faChevronCircleLeft, faChevronCircleRight, faStar);

function App() {
  const [titleSearch, setTitleSearch] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [userFavComics, setUserFavComics] = useState(
    Cookies.get("userFavComics") ? JSON.parse(Cookies.get("userFavComics")) : []
  );
  const [userFavCharacters, setUserFavCharacters] = useState(
    Cookies.get("userFavCharacters")
      ? JSON.parse(Cookies.get("userFavCharacters"))
      : []
  );

  const myUrl = "https://marvel-backend-ejego.herokuapp.com/";

  const handleTitleSearch = (event) => {
    setTitleSearch(event.target.value);
  };

  const handleNameSearch = (event) => {
    setNameSearch(event.target.value);
  };

  return (
    <Router>
      <div className="wrapper">
        <Header
          titleSearch={titleSearch}
          handleTitleSearch={handleTitleSearch}
          nameSearch={nameSearch}
          handleNameSearch={handleNameSearch}
        />
        <Switch>
          <Route exact path="/comics">
            <Comics
              titleSearch={titleSearch}
              myUrl={myUrl}
              Cookies={Cookies}
              userFavComics={userFavComics}
              setUserFavComics={setUserFavComics}
            />
          </Route>
          <Route exact path="/characters">
            <Characters
              nameSearch={nameSearch}
              myUrl={myUrl}
              Cookies={Cookies}
              userFavCharacters={userFavCharacters}
              setUserFavCharacters={setUserFavCharacters}
            />
          </Route>
          <Route exact path="/favorites">
            <Favorites
              userFavComics={userFavComics}
              userFavCharacters={userFavCharacters}
              Cookies={Cookies}
              myUrl={myUrl}
            />
          </Route>
          <Route exact path="/comics/:id">
            <HeroeComics myUrl={myUrl} />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
