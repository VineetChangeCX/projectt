import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Product from "@/contexts/ImageMap";
import Link from "next/link";
import axios from "axios";
import Router, { useRouter } from "next/router";
const api = axios.create({
  baseURL: "http://localhost:9000",
});

export const ImgComponent = () => {
  const value = useContext(Product);
  const [products, setProducts] = useState([]);
  const router = useRouter();
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

  const handleData = (data: never) => {
    // const productID = data.id;
    // router.push(`/pdp/${productID}`);
    value.setProductData(data);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      // Send a DELETE request to the server to delete the product with productId
      await api.delete(`/api/product/delete/${productId}`);
      // After successful deletion, fetch updated product data
      fetchProductData();
    } catch (error) {
      console.error("Error while deleting the product", error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-10 justify-center">
        {products.map((product, idx) => (
          // eslint-disable-next-line react/jsx-key
          <div key={idx} className="relative">
            <Link href="/pdp">
              <Image
                src={product.imageURL}
                alt="tshirt"
                width={200}
                height={200}
                className="w-72 h-72 p-1"
                onClick={() => handleData(product)}
              />

              {product.flag && (
                <span className="absolute bg-orange-500 text-white text-center text-sm p-1 rounded top-0 left-0">
                  BestSeller
                </span>
              )}
            </Link>
            <p className="text-black text-sm">{product.title}</p>
            <p className="text-orange-600 text-sm">${product.price}</p>
          </div>
        ))}
      </div>
    </>
  );
};
