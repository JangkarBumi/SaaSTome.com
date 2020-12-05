import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="bg-grayskull h-full px-6">
      <Navbar />
      <Hero />
      <ProductList />
      {/* <Dashboard /> */}
    </div>
  );
}

export default App;
