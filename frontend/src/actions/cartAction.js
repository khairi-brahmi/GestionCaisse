import { ADD_TO_CART, REMOVE_PRODUCT_TO_CART, EDIT_QUANTITY } from './type';

export const addToCart = (id) => dispatch =>{

    dispatch({
        type: ADD_TO_CART,
        payload: id
    });
    
}

export const removeProduct = (id) => dispatch =>{

    dispatch({
        type: REMOVE_PRODUCT_TO_CART,
        payload: id
    });

}

export const editQuantity = ({id, quantity}) => dispatch =>{
    
    dispatch({
        type: EDIT_QUANTITY,
        payload: {id, quantity}
    });

}