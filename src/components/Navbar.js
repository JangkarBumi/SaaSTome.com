import React, { useState } from 'react';
import Logo from '../assets/images/Logo.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" sm:flex sm:justify-between sm:px-4 sm:py-3 sm:items-center">
      <div className="flex items-center justify-between px-4 py-3 sm:p-0">
        <img src={Logo} alt="" />

        <div className="sm:hidden">
          <button
            type="button"
            className="focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
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
        className={'sm:flex px-2 pt-2 pb-4' + (isOpen ? ' block' : ' hidden')}
      >
        <a
          href="/about"
          className="block px-2 py-1  font-semibold rounded hover:bg-gray-800 sm:mt-0"
        >
          About
        </a>
        <a
          href="/contact-us"
          className="mt-1 block px-2 py-1  font-semibold reounded hover:bg-gray-800 sm:mt-0 sm:ml-2"
        >
          Pricing
        </a>
        <a
          href="/pricing"
          className="mt-1 block px-2 py-1 font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-2"
        >
          Blog
        </a>
        <a
          href="/pricing"
          className="mt-1 block px-2 py-1 font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-2"
        >
         Sign In
        </a>
        <a
          href="/pricing"
          className="mt-1 block px-2 py-1 font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-2"
        >
         Sign Up
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
