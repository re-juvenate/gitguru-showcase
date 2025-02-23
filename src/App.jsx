import { useState } from 'react';
import Hero from './components/hero';
import Png2 from './components/Png2';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Hero />
      <Png2 />
    <div className="bg-amber-300 h-screen"></div>
    </>
  );
}

export default App;
