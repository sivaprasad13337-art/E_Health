import { BrowserRouter as Router } from "react-router-dom";
import Home from "./home";

const index = () => {
  return (
    <>
      <Router>
        <Home />
      </Router>
    </>
  );
};

export default index;
