import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Container} from 'react-bootstrap';

import './StartGame.css';

const CustomButton = ({ children, to }) => {
  return (
        <Link to={to} className="custom-button">{children}</Link>
  );
}

const CustomGameSave = ({children}) => {
  return (
    <button className="gamesave">{children}</button>
  );
}

const NewGame = ({children}) => {
  return(
    <button className="new-game" onClick={popup}>{children}</button>
  );
}
function popup() {
  var form = document.getElementById('popup');
  if(form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

// @dmiddour
function StartGame() {
  return (
    <div style={{ backgroundImage: `url('snowy_mountains.jpg')`,  
                  backgroundSize: 'cover',
                  backgroundPosition: 'left', 
                  display: 'flex',
                  justifyContent: 'center'}}>

      <div>
        <div style={{display: 'inline-flex', height: '20vh'}}>
          <h1 style={{color:'white', fontSize:'70px', textAlign:"center"}}>
          Start Game 
          </h1>
        </div>
      

        
        <div>
          <h1 style={{display: 'inline-block', 
                      color:'black', 
                      backgroundColor: 'white', 
                      width: '20vw', 
                      height: '10vh', 
                      marginBottom: '0',
                      textAlign:"center",
                      borderRadius: '15px'}}>Load Game</h1>
        </div>

        <div className='saved-game-box'>

          <div className="GameSaveList">
            <button className='gamesave'>Game 2</button>
            <button className='gamesave'>Game 3</button>
            <CustomGameSave>Game 4</CustomGameSave>
            <CustomGameSave>Game 5</CustomGameSave>
          </div>
        </div>

        <div style={{display: '', marginTop: '20px'}}>
          <CustomButton to={"/"}>Back</CustomButton>
          <NewGame>New Game</NewGame>
        </div>
      </div>
      <div id='popup'>
        <h1>Create New user</h1>
        <form style={{marginTop: '100px', marginBottom: '100px'}}>
          <label htmlFor='name'>Name:</label>
          <input type='text' name='name2' id='name' autoComplete='off'></input>
        </form>
        <NewGame>Close</NewGame>
      </div>
    </div>
  );
}

export default StartGame;