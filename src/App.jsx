import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black text-white">
      <div className="flex flex-col items-center p-4">
        <div className="text-8xl lg:text-[21rem] text-center text-yellow-300 font-departure tracking-tighter">
          GITGURU
        </div>
        <div className="text-3xl text-center">
          One stop solution to your github issues and PRs
        </div>
        <img 
          src="https://github.com/re-juvenate/gitGuru-backend/raw/main/assets/logo.png" 
          alt="GitGuru Logo"
          className="lg:w-1/2"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    </div>
  );
}

export default App;
