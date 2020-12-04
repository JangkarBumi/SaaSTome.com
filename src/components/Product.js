import React from 'react'

const Product = ({title,link,tagline,pricing,category}) => {
  return (
    <div>
      <a href={link}>{title}</a>
      <p>{tagline}</p>
      <p>{pricing}</p>
      <p>{category}</p>
    </div>
  );
}

export default Product
