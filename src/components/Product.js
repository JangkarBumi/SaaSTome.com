import React from 'react';

const Product = ({ title, link, tagline, pricing, category, }) => {
  return (
    <div className="relative bg-white mt-6 px-4 py-4 rounded border">
      <button className="absolute  top-0 right-0 bg-primary px-2 py-1 rounded text-white">
        Learn More
      </button>
      <a className="font-bold text-xl" href={link} target="blank">
        {title}
      </a>
      <p className="font-bold">Tagline</p>
      <p>{tagline}</p>
      <p className="font-bold">Pricing</p>
      {isNaN(pricing) ? (
        <p>{pricing}</p>
      ) : (
        <p>Starting at $ {pricing} / month</p>
      )}

      <p className="font-bold">Category</p>
      <p>{category}</p>
    </div>
  );
};

export default Product;
