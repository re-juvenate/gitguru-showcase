import { useEffect, useRef } from 'react';
import "./Png2.css"

export default function Png2() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // number of images to be sequenced
    const frameCount = 91;

    // Function to generate the filename of the image based on the current index
    const currentFrame = (index) => {
      return `/src/assets/framesc/${index.toString().padStart(4, '0')}.png`;
    };

    // Drawing the initial images on the canvas
    const img = new Image();
    img.src = currentFrame(0);
    img.onload = function () {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    //preloading images
    const preloadImages = () => {
      Array.from({ length: frameCount }, (_, i) => {
        const img = new Image();
        img.src = currentFrame(i);
      });
    };

    //update images
    const updateImage = (index) => {
      img.src = currentFrame(index);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // Tracking the user scroll position
    window.addEventListener('scroll', () => {
      const html = document.documentElement;
      const wrap = document.querySelector('.png__sequence');
      const scrollTop = html.scrollTop;
      const maxScrollTop = wrap.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
      requestAnimationFrame(() => updateImage(frameIndex + 1));
    });
    preloadImages();
  }, []);
  return (

    <div className="png__sequence">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="png__sequence__canvas"
        id="canvas"
      >
        {' '}
      </canvas>
    </div>
  );
}
