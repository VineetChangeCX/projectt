import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import Image from "next/image";

const api = axios.create({
  baseURL: "http://localhost:9000",
});

export default function Userdetail() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [userOrder, setuserOrder] = useState([]);

  useEffect(() => {
    const fetchOrderhistory = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await api.get("/api/order/auth/orderhistory", {
          headers: {
            Authorization: authToken,
          },
        });
        setuserOrder(response.data);
        console.log("Order History is successfully shown.");
      } catch (error) {
        console.log("Error while displaying order history.", error);
      }
    };
    fetchOrderhistory();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await api.get("/api/user/auth/userdetails", {
          headers: {
            Authorization: authToken,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.log("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const router = useRouter();

  const handleSeeDetails = (orderId) => {
    router.push(`/orderdetailpage?orderId=${orderId}`);
  };

  return (
    <>
      <div className="mx-10 lg:mx-20 mt-6">
        <Navbar />
        <div className="relative flex justify-center items-center mt-12">
          <p className="text-black relative text-xl sm:text-2xl md:text-4xl">
            <span className="text-orange-700 absolute font-black bottom-0 left-0 w-full h-1 bg-orange-500"></span>
            User Details
          </p>
        </div>
        <div className="border-2 border-gray-600 mt-10 mb-2 mx-80 p-4">
          <p>Name : {userData.name}</p>
          <p>Email : {userData.email}</p>
          <p>Password : *******</p>
        </div>

        <div className="border-2 border-gray-500 mb-10 mx-80 p-4">
          <p>Order History:</p>
          <div className="mt-5">
            {userOrder.length > 0 ? (
              userOrder.map((order) => (
                <div key={order._id} className="mb-8">
                  <ul>
                    {order.orderItems.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex item-center justify-between gap-5"
                      >
                        <div>
                          <Image
                            src={item.imageURL}
                            alt={item.title}
                            width={50}
                            height={50}
                          />
                        </div>
                        <div>
                          <p>{item.title}</p>
                          <p>Quantity:{item.quantity}</p>
                          <p>Price: ${item.price}</p>
                        </div>
                        <div className="mt-5">
                          <button
                            className="bg-orange-500 text-white font-semibold py-1 px-1 
                            rounded-none border-2 border-transparent hover:bg-white hover:text-orange-500
                            hover:border-orange-500 hover:border-solid"
                            onClick={() => handleSeeDetails(order._id)}
                          >
                            See Details
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
