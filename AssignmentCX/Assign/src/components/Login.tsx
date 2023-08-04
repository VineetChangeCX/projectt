import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useRouter } from "next/router";
import { UserContext } from "@/contexts/UserContext";
import { CartContext } from "@/contexts/CartContext";
const api = axios.create({
  baseURL: "http://localhost:9000",
});

export default function Login() {
  const { setCartItems } = useContext(CartContext);
  const router = useRouter();
  const { setUser } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response;
      if (isLogin) {
        response = await api.post("/api/user/login", userData);
        console.log(response.data.message);
        if (response.status === 200) {
          setUser(response.data);
          localStorage.setItem("authToken", response.data.token);
          router.push("/homepage");
        } else {
          alert("Account does not exist.Kindly signup first.");
        }
      } else {
        response = await api.post("/api/user/signup", userData);
        console.log(response.data.message);
        if (response.data.message === "Account created successfully.") {
          alert("Account Created successfully.");
        }
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response && error.response.status === 409) {
        alert(
          "Account already exists. Please log in or use a different email.",
        );
      } else if (error.response && error.response.status === 401) {
        alert("Wrong credentials.");
      }
    }
  };

  return (
    <>
      <div className="mx-10 lg:mx-20 mt-6">
        <Navbar></Navbar>
        <div className="relative mt-10 flex justify-center items-center">
          <p className="text-black relative text-3xl sm:text-4xl md:text-5xl">
            <span className="text-orange-700 absolute font-black bottom-0 left-0 w-full h-1 bg-orange-500"></span>
            {isLogin ? "LOGIN" : "SIGNUP"}
          </p>
        </div>
        <div className="ml-4 flex justify-center items-center mt-2"></div>
        <div className="mx-auto lg:mx-96 mt-2">
          <div className="border-2 border-gray-500 p-10 lg:w-96">
            <form onSubmit={handleSubmit}>
              {!isLogin && <p className="mt-1">Name</p>}
              {!isLogin && (
                <p className="mt-1">
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    className="border border-gray-500 rounded-md p-2 w-full"
                  />
                </p>
              )}
              <p className="mt-2">{isLogin ? "UserName" : "Email"}</p>
              <p className="mt-1">
                <input
                  type="text"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="border border-gray-500 rounded-md p-2 w-full"
                />
              </p>
              <p className="mt-2">Password</p>
              <p className="mt-1">
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  className="border border-gray-500 rounded-md p-2 w-full"
                />
              </p>
              <p className="mt-5 flex justify-between">
                <button
                  type="submit"
                  className="border-2 border-orange-500 text-white bg-orange-500 px-4 py-2 rounded-md hover:text-orange-500 hover:bg-white hover:border-2"
                >
                  {isLogin ? "Login" : "SignUp"}
                </button>
                <button
                  type="button"
                  className="border-2 border-orange-500 text-white bg-orange-500 px-4 py-2 rounded-md hover:text-orange-500 hover:bg-white hover:border-2 ml-4"
                  onClick={toggleForm}
                >
                  {isLogin ? "SignUp" : "Login"}
                </button>
              </p>
            </form>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
