import React, { Component } from "react";

class LoginAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.update = this.update.bind(this);

    this.displayLogin = this.displayLogin.bind(this);
  }

  update(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  displayLogin(e) {
    e.preventDefault();
    console.log("Vous éte connecté");
    console.log(this.state);
    this.setState({
      email: "",
      password: ""
    });
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.displayLogin}>
          <h2>Se Connecter comme Admin</h2>
          <div className="username">
            <input
              type="text"
              placeholder="E-mail..."
              value={this.state.email}
              onChange={this.update}
              name="email"
            />
          </div>

          <div className="password">
            <input
              type="password"
              placeholder="Mot de passe de l'admin..."
              value={this.state.password}
              onChange={this.update}
              name="password"
            />
          </div>

          <input type="submit" value="Connecter" />
        </form>
      </div>
    );
  }
}

export default LoginAdmin;
