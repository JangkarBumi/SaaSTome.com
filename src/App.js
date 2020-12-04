import Hero from './components/Hero';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="bg-grayskull h-screen px-6">
      <Navbar />
      <Hero />
      {/* <Dashboard /> */}
    </div>
  );
}

export default App;
