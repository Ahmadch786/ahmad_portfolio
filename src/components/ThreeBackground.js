"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

function StarBackground({ color, ...props }) {
  const ref = useRef();
  
  // Generate random points in a sphere (reduced count to 1500 for high performance)
  const sphere = useMemo(() => random.inSphere(new Float32Array(1500), { radius: 1.2 }), []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 12;
      ref.current.rotation.y -= delta / 18;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color={color}
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function ThreeBackground() {
  const [starColor, setStarColor] = useState("#ff5500");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile / touch devices to bypass WebGL canvas rendering entirely
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 || 
        navigator.maxTouchPoints > 0 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const getThemeColor = () => {
      if (typeof window === "undefined") return "#ff5500";
      const colorVal = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-primary")
        .trim();
      return colorVal || "#ff5500";
    };

    // Set initial color on mount
    setStarColor(getThemeColor());

    // Observe root style changes when theme switcher updates colors
    const observer = new MutationObserver(() => {
      setStarColor(getThemeColor());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"]
    });

    return () => {
      window.removeEventListener("resize", checkMobile);
      observer.disconnect();
    };
  }, []);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full opacity-60">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <StarBackground color={starColor} />
      </Canvas>
    </div>
  );
}
