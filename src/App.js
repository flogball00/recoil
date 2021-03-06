import React from "react";
import "./App.css";
import ErrorBoundary from "./ErrorBoundary";
import Home from "./home";
import RepositoriesHandler from "./repositoriesHandler";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Repositories, PaginatedRepositories } from "./repositories";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/repositories/:org/:page">
          <ErrorBoundary>
            <PaginatedRepositories />
          </ErrorBoundary>
        </Route>
        <Route path="/repositories/:org">
          <ErrorBoundary>
            <Repositories />
          </ErrorBoundary>
        </Route>
        <Route path="/">
          <Home />
          <RepositoriesHandler />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
