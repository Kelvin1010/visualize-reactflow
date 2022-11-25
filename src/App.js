import { Route, Routes, useRouteError } from "react-router-dom";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Visualize from "./pages/Visualize";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Welcome />} errorElement={<Error />}/>
        <Route path={'/visualize'} element={<Visualize />} errorElement={<Error />}/>
        <Route path={'/register'} element={<Register />}/>
        <Route path={'/login'} element={<Login />}/>
      </Routes>
    </>
  );
}

export default App;
