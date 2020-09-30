import React, { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Guideline from "pages/Guideline/Index";

const App: FC = () => {
  return (
    <Router>
      <Guideline />
    </Router>
  );
};

export default App;
