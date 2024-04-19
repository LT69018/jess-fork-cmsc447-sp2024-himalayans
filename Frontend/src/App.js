import './App.css';

/* IMPORT YOUR PAGE HERE! */
import MainMenu from "./MainMenu/page"
import PauseMenu from "./PauseMenu/page"
import LevelComplete from "./LevelCompletion/page"
import ChooseLevel from './ChooseLevel/page'
import StartGame from './StartGame/page'
import ViewLeaderboard from "./ViewLeaderboard/page"
import LevelExample from "./LevelExample/page"
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import React, { useState, useEffect} from 'react'


function App() {
    {/* This is an example of getting the api from the backend. */}
  const [data, setData] = useState([{}])
  const [curUser, setUser] = useState(null)
  const [curLevel, setLevel] = useState(null)

  const updateUser = (user) => {
    setUser(user["username"])
    setLevel(user["levelReached"])
    console.log(curUser)
    //console.log(curLevel)
  }

  const getUser = () => {
    return curUser
  }

  return (
    <div className="App">
        <Router> {/* Navbar goes here */}
            <div>
                {/* The navbar below is an example of how to use Navbar until main menu is complete. But for testing purposes,
                When doing something that's going to require a new page like say main menu, add a new link and new route to the page.
                Link to={} connects the navbar to the path. path={} will contain
                 url that represents the page element={} will have the React component that represents the page. */}
                NAVBAR
                <Link to={"/"}> Home</Link>
                <Link to={"/StartGame"}> Start Game </Link>
                <Link to={"/ChooseLevel"}>Choose Level </Link>
                <Link to={"/Pause"}> Pause Menu</Link>
                <Link to={"/LevelComplete"}> Level Complete</Link>
                <Link to={"/ViewLeaderboard"}> View Leaderboard</Link>
                <Link to={"/LevelExample"}> Level Example</Link>
            </div>
            <Routes> {/* Routes navbar connects to goes here */}
                <Route path={"/"} element={<MainMenu/>}></Route>
                <Route path={"/StartGame"} element={<StartGame updateUser={updateUser} getUser={getUser}/>}></Route>
                <Route path={"/ChooseLevel"} element={<ChooseLevel getUser={getUser}/>}></Route>
                <Route path={"/Pause"} element={<PauseMenu/>}></Route>
                <Route path={"/LevelComplete"} element={<LevelComplete/>}></Route>
                <Route path={"/ViewLeaderboard"} element={<ViewLeaderboard/>}></Route>
                <Route path={"/LevelExample"} element={<LevelExample/>}></Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
