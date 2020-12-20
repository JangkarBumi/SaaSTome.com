import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../assets/images/Logo.svg';
import { logout, selectUser } from '../features/userSlice';
import { auth } from '../firebase';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    auth.signOut();
  };

  return (
    <nav className="sm:flex sm:justify-between  sm:py-3 sm:items-center px-6">
      <div className="flex items-center justify-between p-0 sm:px-4 py-8 sm:p-0">
        <a href="/">
          <img className="h-9" src={Logo} alt="" />
        </a>

        <div className="sm:hidden ">
          <button
            type="button"
            className="focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="h-9 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={
          'sm:flex px-2 pt-2 pb-4 bg-white sm:bg-grayskull' +
          (isOpen ? ' block' : ' hidden')
        }
      >
        <a
          href="/about"
          className="block px-2 py-1  font-semibold rounded  sm:mt-0 hover:underline"
        >
          About
        </a>
        <a
          href="/contact-us"
          className="mt-1 block px-2 py-1  font-semibold reounded  sm:mt-0 sm:ml-2 hover:underline"
        >
          Pricing
        </a>
        <a
          href="/pricing"
          className="mt-1 block px-2 py-1 font-semibold rounded  sm:mt-0 sm:ml-2 hover:underline"
        >
          Blog
        </a>
        {user.user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <a
              href="/login"
              className="mt-1 block px-2 py-1 font-semibold rounded sm:border-2  sm:mt-0 sm:ml-2 hover:text-primary hover:underline"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="mt-1 mx-auto block px-2 py-1 font-semibold  text-white text-center bg-primary rounded w-3/6 sm:mt-0 sm:ml-2 sm:w-auto"
            >
              Sign Up
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
