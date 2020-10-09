import React, { FC } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Guideline from "pages/Guideline/Index";
const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path={"/"} exact={true}>
          <Guideline isViewOnly={true} />
        </Route>
        <Route path={"/admin"} exact={true}>
          <Guideline isViewOnly={false} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
