import React from 'react';
import Ilustration from '../assets/images/Ilustration.jpg';

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="text-center mt-6">
        <h1 className="font-bold text-2xl"> Find your next SaaS ideas</h1>
        <p className="mt-6">
          Learn from successful products, deep dive into their journey, tactics
          and strategies.
        </p>
        <button className="mt-6 text-white font-semibold bg-primary px-6 py-1 rounded">
          Join now
        </button>
        <p className="mt-6">
          or{' '}
          <a className="underline" href="/">
            Learn More
          </a>
        </p>
      </div>

      <img className="mt-6 sm:w-3/6" src={Ilustration} alt="" />
    </div>
  );
};

export default Hero;
