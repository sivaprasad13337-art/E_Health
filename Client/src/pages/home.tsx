import { routes } from "@/data/routes";
import HomeWrapper from "@/wrappers/home";
import Dashboard from "@/features/actions/dashboard";
import { Route, Routes } from "react-router-dom";

const Home = () => {
  return (
    <HomeWrapper>
      <Routes>
        {routes.map((route, idx) => (
          <Route path={route.path} element={<route.element />} key={idx}>
            {route.subRoutes?.map((subroute) => (
              <Route path={subroute.path} element={<subroute.element />} />
            ))}
          </Route>
        ))}
        <Route index element={<Dashboard />} />
      </Routes>
    </HomeWrapper>
  );
};

export default Home;
