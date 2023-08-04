import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Image from "next/image";
import Product from "@/contexts/ImageMap";
import axios from "axios";
import UpdateProductForm from "./Updateproductform";

const api = axios.create({
  baseURL: "http://localhost:9000",
});

export default function Updateproductpage() {
  const value = useContext(Product);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Define selectedProduct state

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

  const handleUpdateClick = (productId) => {
    // Find the selected product based on the productId
    const productToUpdate = products.find(
      (product) => product._id === productId,
    );
    setSelectedProduct(productToUpdate);
  };

  const handleUpdateSuccess = () => {
    // Clear the selected product and refetch the product data to update the list
    setSelectedProduct(null);
    fetchProductData();
  };

  return (
    <>
      <div className="mx-16 my-5">
        <Navbar />

        {/* <!-- heading start  --> */}

        <div className="relative mt-4 flex justify-center items-center mt-12">
          <p className="text-black relative text-3xl sm:text-4xl md:text-5xl mb-8">
            <span className="text-orange-700 absolute font-black bottom-0 left-0 w-full h-1 bg-orange-500"></span>
            Update Product
          </p>
        </div>
        {/* ... */}
        <div className="flex flex-wrap gap-10 justify-center">
          {products.map((product, idx) => (
            <div key={idx} className="relative">
              {/* ... */}
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
                      className="bg-blue-500 text-white px-3 py-1 font-semibold
                    rounded-none border-2 border-transparent hover:bg-white hover:text-blue-500
                    hover:border-blue-500 hover:border-solid"
                      onClick={() => handleUpdateClick(product._id)}
                    >
                      Update
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Show the update form only when a product is selected */}
        {selectedProduct && (
          <div className="absolute top-2/4 left-0 w-full h-full bg-opacity-50 bg-gray-500 flex justify-center items-center">
            <div className="w-96 bg-white p-4 rounded-lg">
              <UpdateProductForm
                productId={selectedProduct._id}
                onUpdateSuccess={handleUpdateSuccess} // Pass the callback function here
              />
              <button
                className="mt-4 w-full bg-red-500 text-white font-semibold py-1 px-2 rounded-none border-2 border-transparent hover:bg-white hover:text-red-500 hover:border-red-500 hover:border-solid"
                onClick={() => setSelectedProduct(null)} // Close the form by setting selectedProduct to null
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* ... */}
        <Footer />
      </div>
      {/* ... */}
    </>
  );
}
