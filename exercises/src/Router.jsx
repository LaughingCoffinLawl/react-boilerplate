import {
  HelloWorld,
  PropsComponent,
  ButtonComponent,
  ListAndMap,
  BooleanState,
  SubmitCredential,
  LifeCycle,
  App,
  DataFetcher,
} from "./App.jsx";
import "./index.css";
import Profile from "./Profile";
import Spinach from "./Spinach";
import Popeye from "./Popeye";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <App />
          <HelloWorld />
          <PropsComponent />
          <ButtonComponent />
          <ListAndMap />
          <BooleanState />
          <SubmitCredential />
          <LifeCycle />
          <DataFetcher />
        </>
      ),
    },
    {
      path: "profile",
      element: <Profile />,
      children: [
        { path: "spinach", element: <Spinach /> },
        { path: "popeye", element: <Popeye /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
