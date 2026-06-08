import { routes } from "@/data/routes";
import HomeWrapper from "@/wrappers/home";
import { Route, Routes } from "react-router-dom";

const Home = () => {
  return (
    <HomeWrapper>
      <Routes>
        {routes.map((item, idx) => (
          <Route path={item.path} element={item.element} key={idx}>
            {item.subRoutes?.map((subroute) => (
              <Route path={subroute.path} element={subroute.element} />
            ))}
          </Route>
        ))}
      </Routes>
    </HomeWrapper>
  );
};

export default Home;
