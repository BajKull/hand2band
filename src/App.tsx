import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import "./scss/style.css";
import Search from "./search/Search";

export default function App() {
  return (
    <Router>
      <Route path="/" exact component={Landing} />
      <Route path="/search/:id" component={Search} />
    </Router>
  );
}
