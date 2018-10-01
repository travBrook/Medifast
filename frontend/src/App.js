import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import LandingNavbar from "./components/Layout/LandingNavbar";
import Dashboard from "./components/Dashboard/Dashboard";
import store from "./store";

class App extends React.Component {
  render() {
    return (
      // Provider glues react and redux together
      <Provider store={store}>
        <Router>
          <div className="App">
            <LandingNavbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
