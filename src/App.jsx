import { useState } from 'react';
import Hero from './components/hero';
import Png2 from './components/Png2';
import Path from './components/Path';
import Footer from './components/footer';

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
