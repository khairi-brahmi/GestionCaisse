import React, { useState } from "react";
import { connect } from "react-redux";
import { removeProduct, editQuantity } from "../actions/cartAction";

const Panier = ({ cartProps, removeProduct, editQuantity }) => {
  const { productsInCart, cartAmount } = cartProps;
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (e, id) => {
    setQuantity(e.target.value);
    editQuantity({ quantity: e.target.value, id: id });
  };

  const products = productsInCart.map((d) => {
    return (
      <div className="data-product" key={d.id}>
        <div className="cout">
          <div className="info-qty">
            <div>
              <h3>prix: {d.price} $</h3>
              <div key={d.id} className="info">
                <p>{d.name}</p>
              </div>
            </div>

            <div className="quantity">
              <select value={quantity} onChange={(e) => handleQuantity(e, d.id)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>

          <div className="btn-trash">
            <button onClick={() => removeProduct(d.id)}>
              <i className="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="cart">
      <div className="article">
        <h2>panier</h2>
        {productsInCart.length === 0 ? (
          <h3>Votre panier est vide! </h3>
        ) : (
          products
        )}
      </div>

      <div className="cmd">
        <h2>Commande</h2>
        <div className="total-product">
          <div>
            <span>Nombre de produits : {productsInCart.length}</span>
          </div>
          <div className="div-total">
            <span>
              <strong>TOTAL: </strong>
            </span>
            <span className="total">{cartAmount} $</span>
          </div>
          <button>Valider la commande</button>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ cartReducer }) => ({
  cartProps: cartReducer
});

export default connect(mapStateToProps, { removeProduct, editQuantity })(Panier);
