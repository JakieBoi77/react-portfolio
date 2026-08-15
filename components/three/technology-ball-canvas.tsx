"use client"

import { Decal, Float, OrbitControls, PerspectiveCamera, useTexture, View } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { motion } from "framer-motion"
import React, { useMemo, useState } from "react"
import { zoomIn } from "@/utils/motion"

type Technology = {
    name: string
    icon: string
}

const Ball = ({ decalTexture }: { decalTexture: string }) => {
    const [decal] = useTexture([decalTexture])

    return (
        <Float speed={1.75}>
            <mesh castShadow receiveShadow>
                <ambientLight intensity={0.7} />
                <directionalLight position={[0, 0, 0.05]} />
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial
                    color="#fff8eb"
                    polygonOffset
                    polygonOffsetFactor={-5}
                    flatShading
                />
                <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.25]} map={decal} />
            </mesh>
        </Float>
    )
}

type ViewsProps = {
    views: React.RefObject<HTMLDivElement>[]
    technologies: Technology[]
}

const Views = ({ views, technologies }: ViewsProps) => {
    return (
        <>
            {views.map((view, i) => {
                return (
                    <View
                        key={technologies[i].name}
                        track={view as React.MutableRefObject<HTMLElement>}
                    >
                        <Ball decalTexture={technologies[i].icon} />
                        <PerspectiveCamera makeDefault position={[0, 0, 3]} />
                        <OrbitControls makeDefault enableZoom={false} />
                    </View>
                )
            })}
        </>
    )
}

type TechnologyBallCanvasProps = {
    technologies: Technology[]
}

const TechnologyBallCanvas = ({ technologies }: TechnologyBallCanvasProps) => {
    const views = useMemo(
        () => technologies.map(() => React.createRef<HTMLDivElement>()),
        [technologies],
    )
    const [eventSource, setEventSource] = useState<HTMLDivElement | null>(null)

    return (
        <div
            ref={setEventSource}
            className="relative max-w-[1200px] w-full flex flex-wrap gap-4 items-center justify-center overflow-auto m-4"
        >
            {views.map((view, i) => {
                return (
                    <motion.div
                        variants={zoomIn(0.1 * i, 0.75)}
                        key={technologies[i].name}
                        ref={view}
                        className="basis-24 h-24 sm:basis-48 sm:h-48 overflow-hidden"
                    />
                )
            })}
            {eventSource && (
                <Canvas
                    eventSource={eventSource}
                    shadows
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                    }}
                >
                    <Views views={views} technologies={technologies} />
                </Canvas>
            )}
        </div>
    )
}

export default TechnologyBallCanvas
