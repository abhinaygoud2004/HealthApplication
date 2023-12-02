import './Login.css';
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [click, setClick] = useState(false)
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('userId') && localStorage.getItem('userId') !== 'undefined')
      navigate('/')
  }, [])
  const handleInputChange = (event) => {
    event.preventDefault();
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(credentials)
    const response = await axios.post('http://localhost:4000/user-api/login', credentials);
    const userId = response.data.userId;
    console.log(response.data.userId, 'uuuuuuuuuuuu')
    console.log(userId)
    if (userId) {
      navigate('/')
    }
    localStorage.setItem("token", response.data.token)
    localStorage.setItem("userId", response.data.userId)
  };

  return (
    <div className='container-fluid main'>
      <div className='flex border border-0 rounded'>
        <div className="left w-1/2 p-10 bg-[#589f3c80]">
          <h1 className='text-5xl font-bold text-white'>
            <div className="tracking-wider">
              Welcome to Calorie Forge
            </div>
          </h1>
        </div>
        <div className="right w-1/2 p-10 bg-gray-700">
          <h1 className='text-5xl leading-loose font-semibold text-white'>Login</h1>
          <form action="" onSubmit={handleLogin}>
            <div className='mt-3'>
              <label htmlFor="username" className='text-white'>Username</label>
              <input
                onChange={handleInputChange}
                type="text"
                className='block w-full px-4 py-2 mt-1 text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200'
                name="username"
                id="username"
                placeholder="Enter your username"
              />
            </div>
            <div className='mt-3'>
              <label htmlFor="password" className='text-white'>Password</label>
              <input
                onChange={handleInputChange}
                type="password"
                name="password"
                id="password"
                className='block w-full px-4 py-2 mt-1 text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200'
                placeholder="Enter your password"
              />
            </div>

            <button type="submit"
              // onClick={() => {
              //   navigate('/');
              // }}
              className='float-right bg-[#589f3c] text-white mt-3 px-4 py-2'>Login</button>

          </form>
          <h6 className='mt-5 ms-5 text-white'>Didn't have an account ?</h6>
          <h6>
            <button onClick={() => {
              navigate('/signup')
            }}
              className='text-decoration-none'
              style={{
                color: "#d3ac5e",
                fontWeight: "bold",
                fontSize: "20px",
                cursor: "pointer"
              }}
            >
              Sign Up
            </button>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Login;
