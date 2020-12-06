import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="bg-grayskull h-full ">
      <Navbar />
      <section className="px-10">
        <Hero />
        <ProductList />
      </section>
      <Footer />
      {/* <Dashboard /> */}
    </div>
  );
}

export default App;
