import { useState } from 'react';
import Hero from './components/Hero';
import Png2 from './components/Png2';
import Path from './components/Path';
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Hero />

      <Png2 />
      <Path />
      <Footer />
    </>
  );
}

export default App;
