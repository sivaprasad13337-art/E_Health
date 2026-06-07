import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./home";

const index = () => {
  const auth = true
  return (
    <>
      <Router>
        <Routes>
          <Route path="" element={auth? <Home /> : }/>
        </Routes>
      </Router>
    </>
  );
};

export default index;
