import React from 'react';
import './SignUp.css';
import axios from 'axios';
import { useState } from 'react'
import { useForm } from 'react-hook-form';

const SignUp = () => {
    
    const { v4: uuidv4 } = require('uuid');
    let {register,handleSubmit,formState:{errors}}=useForm()
    //HTTP req error state
    let [err,setErr]=useState("")

    function generateUserId() {
        return uuidv4();
    }
    let addUser=async(newUser)=>{
        const userId = generateUserId(); // Replace this with your logic to get the user ID
        
        // Create a modified newUser object with the appended user ID
        const modifiedUser = {
            ...newUser,
            userId: userId, // Append the user ID here
        };
        console.log(modifiedUser)
        const response = await axios.post('http://localhost:4000/user-api/register', modifiedUser,{
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },});
    }
    // let navigate=useNavigate()
  return (
    <div className="flex-center">
      <div className="container">
        <div className="signup-form">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit(addUser)}>
            <div className="input-group">
              <label htmlFor="name" className="input-label">
Username              </label>
              <input
                type="text" name="username" placeholder='hi' id="username" className='input-field mt-3' {...register("username",{required:true})}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type="password" name="password" placeholder='hi' id="password" className='input-field mt-3' {...register("password",{required:true})}
              />
            </div>

            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="email" placeholder='hi' name="email" id="email" className='input-field mt-3' {...register("email",{required:true})}
              />
            </div>

            <div className="input-group">
              <label htmlFor="sex" className="input-label">
                Sex
              </label>
              <select {...register("sex",{required:true})}
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
                {...register("age",{required:true})}
                placeholder="hi"
              />
            </div>
            <div className="input-group">
              <label htmlFor="height" className="input-label">
                Height
              </label>
              <input
                type="number"
                id="height"
                name="height"
                className="input-field"
                {...register("height",{required:true})}
                placeholder="hi"
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
                {...register("weight",{required:true})}
                placeholder="hi"
              />
            </div>

            <button type="submit" className="button">
              Sign Up
            </button>
          </form>
        </div>

        <div className="welcome-box">
          <h2 className="text-2xl font-bold mb-4">Welcome to the Health App</h2>
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
