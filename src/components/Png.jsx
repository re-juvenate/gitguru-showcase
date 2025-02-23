import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './Png2.css';

gsap.registerPlugin(ScrollTrigger);

export default function Png2() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // number of images to be sequenced
    const frameCount = 90;
    let currentIndex = 0;
    
    // Function to generate the filename of the image based on the current index
    const currentFrame = (index) => {
      return `/src/assets/framesc/${index.toString().padStart(4, '0')}.png`;
    };
    
    // Drawing the initial image on the canvas
    const img = new Image();
    img.src = currentFrame(0);
    img.onload = function () {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    
    // Preload all images
    const preloadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
      }
    };
    
    // Update canvas with new image
    const updateImage = (index) => {
      img.src = currentFrame(index);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    
    // GSAP ScrollTrigger Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Smooth scrubbing effect
        onUpdate: (self) => {
          const newIndex = Math.min(
            frameCount - 1,
            Math.floor(self.progress * frameCount)
          );
          
          if (currentIndex !== newIndex) {
            currentIndex = newIndex;
            requestAnimationFrame(() => updateImage(currentIndex));
          }
        },
      },
    });
    
    // Set initial canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      updateImage(currentIndex);
    };
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    preloadImages();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <div ref={wrapperRef} className="png__sequence">
      <canvas
        ref={canvasRef}
        className="png__sequence__canvas"
        id="canvas"
      />
    </div>
  );
}