import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { CartContext } from "./../contexts/CartContext";
import { UserContext } from "@/contexts/UserContext";

import axios from "axios";
import Product from "@/contexts/ImageMap";

const api = axios.create({
  baseURL: "http://localhost:9000",
});

const Updown = (props) => {
  const [id, setId] = useState();
  const { setCartItems, removeFromCart, totalPrice } = useContext(CartContext);
  const [data, setData] = useState({});
  const { user } = useContext(UserContext);
  const Productdata = useContext(Product);
  const product = Productdata.state.productData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/product/${id}`);
        if (response.status === 200) {
          // setCartItems(response.data.cart);
          setData(response.data);
          // console.log(response.data.price);
          // props.CalCulateTotal(response.data.price);
          // console.log(response.data);
        }
      } catch (error) {
        console.error("Error while showing data into cart.", error);
      }
    };
    fetchData();
    console.log(props.total);
  }, [id]);

  useEffect(() => {
    setId(props?.e?.product);
  }, [props]);

  useEffect(() => {
    fetchCartItem();
  }, []);
  const fetchCartItem = async () => {
    try {
      const response = await api.get("/api/carts/auth/showcart", {
        headers: { authorization: localStorage.getItem("authToken") },
      });
      const data = response.data;
      setCartItems(data);
      console.log("successfully fetch item.");
    } catch (error) {
      console.log("Error while showing item of cart.", error);
    }
  };
  const cancelOrder = async (productID) => {
    try {
      const response = await api.delete(`/api/carts/auth/${productID}`, {
        headers: { authorization: localStorage.getItem("authToken") },
      });
      if (response.status === 200) {
        console.log(response.data);
        fetchCartItem();
        console.log("successfully removed item from cart");
      }
    } catch (error) {
      console.error("Error while removing item from cart.", error);
      alert("Error while removing item.");
    }
  };

  const increaseCount = () => {
    setCartItems((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product.id === props.e.id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
      return updatedProducts;
    });
  };

  const decreaseCount = () => {
    setCartItems((prevProducts) => {
      const updatedProducts = prevProducts
        .map((product) => {
          if (product.id === props.e.id) {
            return {
              ...product,
              quantity: product.quantity - 1,
            };
          }
          return product;
        })
        .filter((item) => item.quantity !== undefined && item.quantity > 0);
      return updatedProducts;
    });
  };

  return (
    <>
      <div className="flex py-4 mb-5">
        <div className="w-20" key={data}>
          <Image src={data?.imageURL} width={100} height={100} alt="p14" />
        </div>
        <div className="ml-7">
          <div className="size-sm">{data?.title}</div>
          <div> {"$" + data?.price?.toFixed(2)}</div>
          <div className="text-sm text-black">{data?.size}</div>
          <div className="text-sm text-slate-500">Colour : Red</div>
        </div>
        <div className="flex items-center border-black border h-5 ml-16">
          <button
            className="px-1 text-black hover:text-gray-700 rounded-l"
            onClick={decreaseCount}
          >
            -
          </button>
          <span className="px-3 py-1 text-gray-700">{data?.quantity}</span>
          <button
            className="px-1 py-1 text-gray-600 hover:text-gray-700 rounded-r"
            onClick={increaseCount}
          >
            +
          </button>
        </div>
        <div className="ml-20 text-sm py-1">
          {"$" + (data?.price * data?.quantity).toFixed(2)}
        </div>
        <div className="text-xs ml-20 py-2 font-semibold">
          <button onClick={() => cancelOrder(data?._id)}>X</button>
        </div>
      </div>
    </>
  );
};

export default Updown;
