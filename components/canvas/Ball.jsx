import React, { useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { View, PerspectiveCamera, OrbitControls, useTexture, Float, Decal } from "@react-three/drei";

const Ball = ({ decalTexture }) => {
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
          flatShading
        />
      </mesh>
    </Float>
  );
};

const Views = ({ views, technologies }) => {
  return (
    <>
      {views.map((view, i) => {
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

const BallCanvas = ({ technologies }) => {
  const views = useMemo(() => technologies.map(() => React.createRef()), []);
  const containerRef = useRef();

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
        margin: "16px"
      }}
    >
      {views.map((view, i) => {
        return (
          <div
            key={i}
            ref={view}
            style={{ flex: "1 0 200px", height: "15vh", overflow: "hidden" }}
          />
        );
      })}
      <Canvas
        camera={{ position: [0, 0, 2] }}
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
