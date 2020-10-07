import React, { FC, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

const Guideline = lazy(() => import("pages/Guideline/Index"));
const App: FC = () => {
  return (
    <Router>
      {" "}
      <Switch>
        <Route path={"/"}>
          <Guideline isViewOnly />
        </Route>
        <Route path={"/admin"}>
          <Guideline />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
