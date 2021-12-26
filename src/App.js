// import { addChat } from "./store/actions/cobaAction";
// import { useDispatch } from 'react-redux';
// import { useFirebase } from "react-redux-firebase";

import Layout from "./pages/Layout";

function App() {
  // const firebase = useFirebase();

  // const click = () => {
  //   firebase.push('chat', { message: "hello world" })
  // }

  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
