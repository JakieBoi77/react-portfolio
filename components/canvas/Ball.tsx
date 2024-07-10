import React, { useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { View, PerspectiveCamera, OrbitControls, useTexture, Float, Decal } from "@react-three/drei";
import { motion } from "framer-motion";
import { fadeIn, slideIn, zoomIn } from "@/utils/motion";

const Ball = ({ decalTexture }: any) => {
  const [decal] = useTexture([decalTexture]);

  return (
    <Float speed={1.75} >
      <mesh castShadow receiveShadow >
        <ambientLight intensity={0.7} />
        <directionalLight position={[0, 0, 0.05]} />
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          map={decal}
        />
      </mesh>
    </Float>
  );
};

const Views = ({ views, technologies }: any) => {
  return (
    <>
      {views.map((view: any, i: any) => {
        return (
          <View key={i} track={view}>
            <Ball decalTexture={`/dev-icons${technologies[i].icon}`} />
            <PerspectiveCamera makeDefault position={[0, 0, 3]} />
            <OrbitControls makeDefault enableZoom={false} />
          </View>
        );
      })}
    </>
  );
};

const BallCanvas = ({ technologies }: any) => {
  const views = useMemo(() => technologies.map(() => React.createRef()), []);
  const containerRef = useRef<any>();

  return (
    <div ref={containerRef} className="relative w-full flex flex-wrap gap-4 items-center justify-center overflow-auto m-4">
      {views.map((view: any, i: any) => {
        return (
          <motion.div
            variants={zoomIn(0.1 * i, 0.75)}
            key={technologies[i].name}
            ref={view}
            className="basis-24 h-24 sm:basis-52 sm:h-52 overflow-hidden"
          />
        );
      })}
      <Canvas
        eventSource={containerRef.current}
        shadows
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none"
        }}
      >
        
        <Views views={views} technologies={technologies} />
      </Canvas>
    </div>
  );
}

export default BallCanvas;
