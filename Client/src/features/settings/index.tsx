import { Card, CardContent } from "@/components/ui/card";
// import SetProfile from "../actions/profile/pages/set-profile";
import { Link, Route, Routes } from "react-router-dom";
import { settingsRoutes } from "@/data/routes";
import { useAuthStore } from "@/zustand/auth";
import { useState } from "react";
import SetProfile from "../actions/profile/pages/set-profile";

const Settings = () => {
  const { user } = useAuthStore();
  const [active, setActive] = useState("Edit Profile");
  return (
    <section className="flex gap-6 mt-5 h-[20rem]">
      <Card className="w-[30%]">
        <CardContent>
          {settingsRoutes.map((item) =>
            item.role ? (
              item.role === user?.role ? (
                <Link
                  to={`/settings/${item.path}`}
                  onClick={() => setActive(item.title)}
                  className={
                    active == item.title
                      ? "bg-teal-100 text-primary block p-2 my-2 rounded-md font-bold"
                      : "bg-gray-200 text-primary block p-2 my-2 rounded-md font-semibold"
                  }
                >
                  {<item.icon className="w-4 h-4 inline-block -mt-1 mr-2" />}
                  {item.title}
                </Link>
              ) : null
            ) : (
              <Link
                to={`/settings/${item.path}`}
                onClick={() => setActive(item.title)}
                className={
                  active == item.title
                    ? "bg-teal-100 text-primary block p-2 my-2 rounded-md font-bold"
                    : "bg-gray-200 text-primary block p-2 my-2 rounded-md font-semibold"
                }
              >
                {<item.icon className="w-4 h-4 inline-block -mt-1 mr-2" />}
                {item.title}
              </Link>
            ),
          )}
        </CardContent>
      </Card>
      <section className="w-[70%]">
        <Routes>
          <Route index element={<SetProfile />} />
          {settingsRoutes.map((route) => (
            <Route path={route.path} element={<route.element />} />
          ))}
        </Routes>
      </section>
    </section>
  );
};

export default Settings;
