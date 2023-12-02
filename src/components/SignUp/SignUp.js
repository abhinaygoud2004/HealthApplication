import React from "react";
import "./SignUp.css";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const { v4: uuidv4 } = require("uuid");
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //HTTP req error state
  let [err, setErr] = useState("");

  function generateUserId() {
    return uuidv4();
  }
  let addUser = async (newUser) => {
    const userId = generateUserId(); // Replace this with your logic to get the user ID

    // Create a modified newUser object with the appended user ID
    const modifiedUser = {
      ...newUser,
      userId: userId, // Append the user ID here
    };
    console.log(modifiedUser, 'modified user...');
    const response = await axios.post(
      "http://localhost:4000/user-api/register",
      modifiedUser,
      {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      }
    );
    navigate('/login')
  };
  let navigate = useNavigate()
  return (
    <div className="flex-center">
      <div className="container">
        <div className="signup-form">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit(addUser)}>
            <div className="input-group">
              <label htmlFor="name" className="input-label">
                Username{" "}
              </label>
              <input
                type="text"
                name="username"
                placeholder="username"
                id="username"
                className="input-field mt-1"
                {...register("username", { required: true })}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                id="password"
                className="input-field mt-1"
                {...register("password", { required: true })}
              />
            </div>

            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                id="email"
                className="input-field mt-1"
                {...register("email", { required: true })}
              />
            </div>
            <div className="flex flex-row gap-4">
              <div className="input-group w-1/2">
                <label htmlFor="sex" className="input-label">
                  Sex
                </label>
                <select
                  {...register("sex", { required: true })}
                  id="sex"
                  name="sex"
                  className="select-field"
                >
                  <option value="0">Male</option>
                  <option value="1">Female</option>
                  <option value="2">Other</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="age" className="input-label">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  className="input-field"
                  {...register("age", { required: true })}
                  placeholder="age"
                />
              </div>
            </div>

            <div className="flex flex-row gap-4">
              <div className="input-group w-1/2">
                <label htmlFor="height" className="input-label">
                  Height
                </label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  className="input-field"
                  {...register("height", { required: true })}
                  placeholder="height"
                />
              </div>

              <div className="input-group">
                <label htmlFor="weight" className="input-label">
                  Weight
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  className="input-field"
                  {...register("weight", { required: true })}
                  placeholder="weight"
                />
              </div>
            </div>

            <button type="submit" className="button"
            // onClick={() => {
            //   navigate('/login');
            // }} 
            >
              Sign Up
            </button>

          </form>
        </div>

        <div className="welcome-box">
          <h2 className="text-2xl font-bold mb-4 text-[#f8f9fa]">Welcome to the Health App</h2>
          <img
            src="https://img.freepik.com/free-vector/healthy-lifestyle-diet-fitness-vector-sign-shape-heart-with-multiple-icons-depicting-various-sports-vegetables-cereals-seafood-meat-fruit-sleep-weight-beverages_1284-44073.jpg?w=1380&t=st=1701497993~exp=1701498593~hmac=1e9bc1c9790b2534ac1f29837fe443a6cdc2f060823b6206ddef79566139eb2a"
            alt=""
            className="rounded mt-20"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
