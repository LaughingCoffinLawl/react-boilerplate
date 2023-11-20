import React from "react";
import ReactDOM from "react-dom/client";
import {
  HelloWorld,
  PropsComponent,
  ButtonComponent,
  ListAndMap,
  BooleanState,
  SubmitCredential,
  LifeCycle,
} from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelloWorld />
    <PropsComponent name="Marco" />
    <ButtonComponent />
    <ListAndMap items={[1, 2, 3, 4, 5, 6, 7]} />
    <BooleanState />
    <SubmitCredential />
    <LifeCycle />
  </React.StrictMode>
);
