import Home from "./Home";
import Shop from "./Shop";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/shop",
      element: <Shop />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
