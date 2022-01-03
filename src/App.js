// import { addChat } from "./store/actions/cobaAction";
// import { useDispatch } from 'react-redux';
// import { useFirebase } from "react-redux-firebase";

import Layout from "./pages/Layout";
import Register from "./Layout/Register";
import Login from "./Layout/Login";
import {BrowserRouter as Router , Route, Link, Routes} from 'react-router-dom';
import React from "react";

function App() {
  // const firebase = useFirebase();

  // const click = () => {
  //   firebase.push('chat', { message: "hello world" })
  // }
  
  const userActive = React.createContext();
  return (
    <div className="App">
      
        <Router>
            <Routes>
                <Route exact path={'/register'} element={<Register/> }></Route>
                <Route exact path={'/login'} element={<Login/> }></Route>
                <Route exact path={'/home'} element={<Layout/> }></Route>
                <Route exact path={'/'} element={<Login/> }></Route>
            </Routes>
        </Router>

      {/*<Layout />*/}
    </div>
  );
}

export default App;
