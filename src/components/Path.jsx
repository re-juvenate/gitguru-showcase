import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

function Path() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const dotRefs = useRef([]);
  const descriptionRefs = useRef([]);

  
  const pathPoints = [
    { x: 150, y: 100, label: "Project Start", description: "Kickoff and planning phase" },
    { x: 250, y: 500, label: "Development", description: "Core feature implementation" },
    { x: 100, y: 900, label: "Testing", description: "Bug fixes and optimizations" },
    { x: 300, y: 1300, label: "Deployment", description: "Final release and setup" },
    { x: 200, y: 1700, label: "Launch", description: "Public rollout and monitoring" },
  ];

  
  const generateBezierPath = () => {
    if (pathPoints.length < 2) return "";

    let d = `M ${pathPoints[0].x} ${pathPoints[0].y}`;

    for (let i = 0; i < pathPoints.length - 1; i++) {
      const p0 = pathPoints[i];
      const p1 = pathPoints[i + 1];

      
      const cp1x = p0.x;
      const cp1y = (p0.y + p1.y) / 2;
      const cp2x = p1.x;
      const cp2y = (p0.y + p1.y) / 2;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  useGSAP(() => {
    const pathLength = pathRef.current.getTotalLength();

    gsap.set(pathRef.current, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom bottom",
        scrub: 1.5,
        
      },
    });

    timeline.to(pathRef.current, { strokeDashoffset: 0, duration: 3, ease: "power1.inOut" });

    timeline.to(
      "#red",
      {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          autoRotate: true,
        },
        ease: "power1.inOut",
        duration: 3,
        onUpdate: function () {
          const progress = this.progress(); 
          pathPoints.forEach((point, index) => {
            const threshold = 0.1;
            if (progress >= index / (pathPoints.length - 1) - threshold) {
              gsap.to(dotRefs.current[index], {
                boxShadow: "0px 0px 15px 5px white",
                backgroundColor: "yellow",
                duration: 0.3,
              });
              gsap.to(descriptionRefs.current[index], {
                opacity: 1,
                y: 0,
                duration: 0,
              });
            }
          });
        },
      },
      "<"
    );
  }, []);

  return (
    <div className="h-[200vh] bg-black flex justify-center items-center">
      {/* Motion path container */}
      <div ref={containerRef} className="relative w-full h-full overflow-hidden">
        {/* SVG Path */}
        <svg className="absolute top-0 left-0 w-full h-[1800px]">
          <path
            ref={pathRef}
            d={generateBezierPath()}
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Moving element */}
        <div
          id="red"
          className="h-12 w-12 bg-red-500 rounded-full shadow-lg flex items-center justify-center text-white text-sm absolute"
        >
          ▶
        </div>

        {/* Point markers, titles, and descriptions */}
        {pathPoints.map((point, index) => {
          const isLeft = index % 2 === 0; 
          return (
            <div key={index}>
              {/* Point Marker */}
              <div
                ref={(el) => (dotRefs.current[index] = el)}
                className="absolute h-4 w-4 bg-white rounded-full transition-all duration-300"
                style={{
                  left: `${point.x}px`,
                  top: `${point.y}px`,
                  transform: "translate(-50%, -50%)",
                }}
              />

              {/* Title & Description */}
              <div
                className={`absolute flex flex-col text-white text-xl uppercase transition-all duration-500 ${
                  isLeft ? "items-end pr-6" : "items-start pl-6"
                }`}
                style={{
                  left: isLeft ? `${point.x - 30}px` : `${point.x + 30}px`,
                  top: `${point.y}px`,
                  transform: "translateY(-50%)",
                }}
              >
                <span className="font-semibold">{point.label}</span>
                <span
                  ref={(el) => (descriptionRefs.current[index] = el)}
                  className="opacity-0 translate-y-2 transition-all duration-500"
                >
                  {point.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Path;
