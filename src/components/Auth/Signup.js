import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Ilustration from '../../assets/images/Ilustration.jpg';
import Logo from '../../assets/images/Logo.svg';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setErrors] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted');
  };

  return (
    <div className="flex h-screen">
      <div className="w-full lg:w-1/3 flex flex-col justify-center items-center mx-12">
        <Link to="/" className="self-center">
          <img className="h-9" src={Logo} alt="" />
        </Link>

        <h1 className="text-2xl font-bold self-center w-full sm:w-64 ">
          Sign up to SaaSTome
        </h1>
        <form className="w-full sm:w-64">
          <div className="mt-6">
            <h2 className="font-bold text-base">Email</h2>
            <input
              className="bg-gray-200 rounded-md py-2 px-2 w-full focus:outline-none"
              type="email"
            />
          </div>
          <div className="mt-4">
            <h2 className="font-bold text-base">Password</h2>
            <input
              className="bg-gray-200 rounded-md py-2 px-2  w-full focus:outline-none"
              type="password"
            />
          </div>

          <div className="mt-4">
            <h2 className="font-bold text-base">Confirm your Password</h2>
            <input
              className="bg-gray-200 rounded-md py-2 px-2  w-full focus:outline-none"
              type="password"
            />
          </div>

          <p className="text-sm text-center mt-4">
            By clicking Sign Up, you agree to our<br></br>
            Terms and Privacy Policy.
          </p>

          <input
            type="submit"
            className="focus:outline-none bg-blue-500 text-white mt-6 font-semibold text-lg py-2 px-12 rounded-lg w-full"
            value="Sign up"
          />
        </form>

        <p className="mt-6">
          Already a member? <Link to="/login">Sign in</Link>
        </p>
      </div>
      <div className="w-full lg:w-2/3 hidden  bg-cover bg-blue-500 lg:flex lg:flex-col lg:justify-center lg:items-center">
        <img className="w-4/6 rounded-lg lg:mb-24" src={Ilustration} alt="" />
        <div className="text-white bg-black opacity-75 py-2 px-2 rounded-lg w-4/6">
          <h1 className="text-3xl font-extrabold text-center">
            Find your next SaaS ideas
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Signup;
