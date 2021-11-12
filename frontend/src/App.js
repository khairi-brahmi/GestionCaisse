import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// REDUX
import { Provider } from "react-redux";
import store from "./store";

// COMPONENTS
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Panier from "./components/Panier";
import Login from "./components/Login";
import Register from "./components/Register";
import LoginAdmin from "./components/LoginAdmin";
import Footer from "./components/Footer";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/panier" component={Panier} />
          <Route exact path="/client" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/admin" component={LoginAdmin} />
        </Switch>
      </Router>
      <Footer />
    </Provider>
  );
}

export default App;
