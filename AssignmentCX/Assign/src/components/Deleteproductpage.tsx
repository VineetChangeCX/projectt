import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Image from "next/image";
import Product from "@/contexts/ImageMap";
import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:9000",
});
export default function Deleteproductpage() {
  const value = useContext(Product);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const response = await api.get("/api/product/allproduct");
      const data = response.data;
      setProducts(data.products);
    } catch (error) {
      console.error("Error while fetching the product details", error);
    }
  };

  const deletethisproduct = async (productId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      await api.delete(`/api/product/auth/${productId}`, {
        headers: {
          Authorization: authToken,
        },
      });

      fetchProductData();
    } catch (error) {
      console.log("Error while deleting product from inventory.", error);
    }
  };

  return (
    <>
      <div className="mx-16 my-5">
        {/* <!-- navbar start here  -->*/}

        <Navbar />

        {/* <!-- heading start  --> */}

        <div className="relative mt-4 flex justify-center items-center mt-12">
          <p className="text-black relative text-3xl sm:text-4xl md:text-5xl mb-8">
            <span className="text-orange-700 absolute font-black bottom-0 left-0 w-full h-1 bg-orange-500"></span>
            Delete Product
          </p>
        </div>

        <div className="flex flex-wrap gap-10 justify-center">
          {products.map((product, idx) => (
            // eslint-disable-next-line react/jsx-key
            <div key={idx} className="relative">
              <Image
                src={product.imageURL}
                alt="tshirt"
                width={200}
                height={200}
                className="w-72 h-72 p-1"
              />

              {product.flag && (
                <span className="absolute bg-orange-500 text-white text-center text-sm p-1 rounded top-0 left-0">
                  BestSeller
                </span>
              )}
              <div className="flex justify-between">
                <div>
                  <p className="text-black text-sm">{product.title}</p>
                  <p className="text-orange-600 text-sm">${product.price}</p>
                </div>
                <div>
                  <p>
                    <button
                      className="bg-red-500 text-white px-3 py-1 font-semibold
                    rounded-none border-2 border-transparent hover:bg-white hover:text-red-500
                    hover:border-red-500 hover:border-solid"
                      onClick={() => deletethisproduct(product._id)}
                    >
                      Delete
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <!-- footer start here  --> */}
        <Footer />
      </div>
    </>
  );
}
