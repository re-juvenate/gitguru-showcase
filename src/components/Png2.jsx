import { useEffect, useRef, useState } from 'react';
import "./Png2.css"

export default function Png2() {
  const canvasRef = useRef(null);
  const [showTextbox, setShowTextbox] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const frameCount = 91;
    const currentFrame = (index) => `/src/assets/framesc/${index.toString().padStart(4, '0')}.png`;

    const img = new Image();
    img.src = currentFrame(0);
    img.onload = () => context.drawImage(img, 0, 0, canvas.width, canvas.height);

    const preloadImages = () => {
      Array.from({ length: frameCount }, (_, i) => {
        const img = new Image();
        img.src = currentFrame(i);
      });
    };

    const updateImage = (index) => {
      img.src = currentFrame(index);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('scroll', () => {
      const html = document.documentElement;
      const wrap = document.querySelector('.png__sequence');
      const scrollTop = html.scrollTop;
      const maxScrollTop = wrap.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
      requestAnimationFrame(() => updateImage(frameIndex + 1));
      
      if (scrollFraction >= 0.2) setShowTextbox(true);
    });
    
    preloadImages();
  }, []);
  
  return (
    <div className="png__sequence w-full h-full sticky" style={{ position: 'relative' }}>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="png__sequence__canvas"
        id="canvas"
      ></canvas>
      {showTextbox && (
        <div className="textbox z-50 sticky text-white pt-[190vh] pl-[55vw] text-7xl">
          <p>Github is the most popular OSS developer platform on the world. Yet, it can be a bit daunting to even get started. Hence, we focus on the lowest denominator of open source contribution - solving issues .
          </p>
        </div>
      )}
    </div>
  );
}
