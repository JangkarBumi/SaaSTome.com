import React from 'react';
import products from './mockup-data.json';
import Product from './Product';

const ProductList = () => {
  return (
    <div>
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
  );
};

export default ProductList;
