import React from 'react';
import Footer from '../Footer';
import Hero from '../Hero';
import Navbar from '../Navbar';
import ProductList from '../ProductList';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <section className="px-10">
        <Hero />
        <ProductList />
      </section>
      <Footer />
    </>
  );
};

export default LandingPage;
