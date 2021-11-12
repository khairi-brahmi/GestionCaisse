import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

const Navbar = ({ cartProps }) => {
  const { productsInCart } = cartProps;

  return (
    <header>
      <div className="brand">Mon Magasin</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Produits</Link>
          </li>
          <li>
            <Link to="/cmd">Commandes</Link>
            <span className="badge">0</span>
          </li>
          <li style={{ alignItems: "center" }}>
            <Link to="/panier">Panier</Link>{" "}
            <span className="badge">{productsInCart.length}</span>
          </li>
          

              <li>
            <Link to="/client">S'identifier</Link>
          </li>
      
        </ul>
      </nav>
    </header>
  );
};

const mapStateToProps = ({ cartReducer }) => ({
  cartProps: cartReducer
});

export default connect(mapStateToProps)(Navbar);
