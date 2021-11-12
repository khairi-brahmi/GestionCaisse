import { ADD_TO_CART, REMOVE_PRODUCT_TO_CART, EDIT_QUANTITY } from "../actions/type";
import { products } from '../data/products';

const initialState = {
    productsInCart: [],
    cartAmount: 0,
    nbProduct: 0,
    products
}



export default (state = initialState, action) => {
    const { type, payload } = action;
    const { products, cartAmount, productsInCart, nbProduct } = state;

    switch(type){

        case ADD_TO_CART:
            let productInCart = products.find(item => item.id === payload);
            let existProduct = productsInCart.find(item => item.id === payload);
            if(existProduct){
                productInCart.qty += 1;
                return{
                    nbProduct: nbProduct + 1,
                    ...state,
                    cartAmount: cartAmount + productInCart.price
                }
            }else{
                productInCart.qty = 1;
                let total = state.cartAmount + productInCart.price;
                return{
                    nbProduct: nbProduct + 1,
                    ...state,
                    productsInCart: [...productsInCart, productInCart],
                    cartAmount: total
                }
            }
        case REMOVE_PRODUCT_TO_CART:
            
            let new_items = productsInCart.filter(item => item.id !== payload);
            let itemToRemove = productsInCart.find(item=> item.id === payload);
            console.log(itemToRemove)
            let newCartAmount = cartAmount - (itemToRemove.price * itemToRemove.qty)
            return {
                ...state,
                productsInCart: new_items,
                cartAmount: newCartAmount
            }
        case EDIT_QUANTITY:
            let editQuantity = productsInCart.find(item=> item.id === payload.id);
            editQuantity.qty = +payload.quantity
            let newPrice = editQuantity.qty * editQuantity.price;

            console.log(editQuantity)
            return{
                ...state,
                cartAmount: newPrice 
            }

        default:
            return state;
    }
}