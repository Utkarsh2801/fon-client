import React, { useReducer } from 'react';

export const ProductContext = React.createContext({
  productDetails: [],
  selectedProduct: {},
});

export const TYPES = {
  'SET_PRODUCTS': 'SET_PRODUCTS',
  'SELECT_PRODUCT': 'SELECT_PRODUCT',
  'ADD_PRODUCT': 'ADD_PRODUCT',
}

const productDetailsReducer = (state, action) => {
  switch(action.type) {
    case TYPES.SET_PRODUCTS:
      return { ...state, productDetails: action.payload };
    case TYPES.SELECT_PRODUCT:
      return { ...state, selectedProduct: action.payload };
    case TYPES.ADD_PRODUCT:
      return { ...state, productDetails: [...state.productDetails, action.payload] }
    default:
      return state;
  }
}

const ProductDetailsProvider = props => {
  const [productReducer, dispatch] = React.useReducer(productDetailsReducer, {
    productDetails: [],
    selectedProduct: {}, 
  })

  const value = {
    productReducer,
    dispatch
  }

  return (
    <ProductContext.Provider value={value}>
      {props.children};
    </ProductContext.Provider>
  );
};

export default ProductDetailsProvider;