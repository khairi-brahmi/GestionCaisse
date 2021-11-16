import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// COMPONENTS
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import LoginAdmin from "./components/LoginAdmin";
import Footer from "./components/Footer";

function App() {
  return (
      <div>

    
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/client" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/admin" component={LoginAdmin} />
        </Switch>
      </Router>
      <Footer />  </div>
  );
}

export default App;
