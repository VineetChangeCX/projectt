import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000",
});
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [compItem, setcompItem] = useState([]);
  // const [totalPrice, setTotalPrice] = useState(0);

  const addtoCompare = (product) => {
    setcompItem([...compItem, product]);
  };

  const removeComp = (productId) => {
    const updatedComp = compItem.filter((item) => item.id !== productId);
    setcompItem(updatedComp);
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  // const updateCartItem = (productId, quantity) => {
  //   const updatedCartItems = cartItems.map((item) =>
  //     item.id === productId ? { ...item, quant: parseInt(quantity) } : item,
  //   );
  //   setCartItems(updatedCartItems);
  //   calculateTotalPrice(updatedCartItems);
  // };

  const clearCart = () => {
    setCartItems([]);
  };

  // const calculateTotalPrice = (cartItems) => {
  //   console.log(cartItems);
  //   const totalPrice = cartItems?.reduce(
  //     (accumulator, item) => accumulator + item?.price * item?.quantity,
  //     0,
  //   );
  //   setTotalPrice(totalPrice);
  // };

  // useEffect(() => {
  //   calculateTotalPrice(cartItems);
  //   console.log(cartItems);
  // }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        compItem,
        addtoCompare,
        setcompItem,
        cartItems,
        setCartItems,
        // totalPrice,
        addToCart,
        removeFromCart,
        removeComp,
        // updateCartItem,
        clearCart,
        // calculateTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
