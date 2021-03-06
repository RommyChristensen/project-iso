// import { addChat } from "./store/actions/cobaAction";
// import { useDispatch } from 'react-redux';
// import { useFirebase } from "react-redux-firebase";

import Layout from "./pages/Layout";
import Register from "./Layout/Register";
import Login from "./Layout/Login";
import {BrowserRouter as Router , Route, Link, Routes} from 'react-router-dom';
import React from "react";

import { UserContext } from "./config/UserContext";

function App() {
  const [userActive, setUserActive] = React.useState({});
  const [activeDoc, setDoc] = React.useState({});
  const [rooms, setRooms] = React.useState({});
  const [activeRoom, setActiveRoom] = React.useState({});

  return (
    <div className="App">
      <UserContext.Provider value={{
        activeDoc, // aku pake doc soal e isa dapet id e ,
        setDoc :setDoc,
        userActive,
        setUser: setUserActive,
        room:rooms,
        setRoom:setRooms,
        activeRoom: activeRoom,
        setActiveRoom: setActiveRoom
      }}>
        
        <Router>
          <Routes>
            <Route exact path={'/register'} element={<Register/> }></Route>
            <Route exact path={'/login'} element={<Login/> }></Route>
            <Route exact path={'/home'} element={<Layout/> }></Route>
            <Route exact path={'/'} element={<Login/> }></Route>
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
