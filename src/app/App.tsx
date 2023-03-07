import React from "react";
import "./App.css";
import { RoutesComponent } from "../common/components/routes/RoutesComponent";
import { Header } from "../features/header/Header";
import { HashRouter } from "react-router-dom";

function App() {
  return (
      <div className="App">
        <Header />
        <RoutesComponent />
      </div>
  );
}

export default App;
