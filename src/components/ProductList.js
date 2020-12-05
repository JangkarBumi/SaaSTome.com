import React from 'react';
import products from './mockup-data.json';
import Product from './Product';

const ProductList = () => {
  return (
    <div className="py-6">
      <button className="font-bold text-lg bg-white px-6 py-2 rounded border">
        Filter
      </button>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 sm:gap-x-20">
        {products.products.map((product) => {
          return (
            <Product
              key={product.title}
              title={product.title}
              link={product.link}
              tagline={product.tagline}
              pricing={product.pricing}
              category={product.category}
            />
          );
        })}
      </div>
      <button className="font-bold text-lg bg-white px-6 py-2 rounded border mt-6">
        Load More
      </button>
    </div>
  );
};

export default ProductList;
