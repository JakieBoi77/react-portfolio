"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";

interface SlideProps {
    src: string;
    index: number;
    current: number;
    handleSlideClick: (index: number) => void;
}

const Slide = ({ src, index, current, handleSlideClick }: SlideProps) => {
    const slideRef = useRef<HTMLLIElement>(null);

    const xRef = useRef(0);
    const yRef = useRef(0);
    const frameRef = useRef<number>();

    useEffect(() => {
        const animate = () => {
            if (!slideRef.current) return;

            const x = xRef.current;
            const y = yRef.current;

            slideRef.current.style.setProperty("--x", `${x}px`);
            slideRef.current.style.setProperty("--y", `${y}px`);

            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, []);

    const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
        event.currentTarget.style.opacity = "1";
    };

    return (
        <div className="[perspective:1200px] [transform-style:preserve-3d]">
            <li
                ref={slideRef}
                className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out max-w-3xl w-[80vmin] aspect-[16/10] mx-[4vmin] z-10 "
                onClick={() => handleSlideClick(index)}
                style={{
                    transform:
                        current !== index
                            ? "scale(0.98) rotateX(8deg)"
                            : "scale(1) rotateX(0deg)",
                    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    transformOrigin: "bottom",
                }}
            >
                <div
                    className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-lg overflow-hidden transition-all duration-150 ease-out"
                    style={{
                        transform:
                            current === index
                                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                                : "none",
                    }}
                >
                    <img
                        className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-600 ease-in-out"
                        style={{
                            opacity: current === index ? 1 : 0.5,
                        }}
                        alt={src}
                        src={`/fullstack-pics${src}`}
                        onLoad={imageLoaded}
                        loading="eager"
                        decoding="sync"
                    />
                    {current === index && (
                        <div className="absolute inset-0 transition-all duration-1000" />
                    )}
                </div>
            </li>
        </div>
    );
};

interface CarouselControlProps {
    type: string;
    title: string;
    handleClick: () => void;
}

const CarouselControl = ({
    type,
    title,
    handleClick,
}: CarouselControlProps) => {
    return (
        <button
            className={`w-10 h-10 flex items-center mx-2 justify-center bg-gray-100 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
                type === "previous" ? "rotate-180" : ""
            }`}
            title={title}
            onClick={handleClick}
        >
            <IconArrowNarrowRight className="text-black" />
        </button>
    );
};

interface CarouselProps {
    slides: string[];
}

export default function Carousel({ slides }: CarouselProps) {
    const [current, setCurrent] = useState(0);

    const handlePreviousClick = () => {
        const previous = current - 1;
        setCurrent(previous < 0 ? slides.length - 1 : previous);
    };

    const handleNextClick = () => {
        const next = current + 1;
        setCurrent(next === slides.length ? 0 : next);
    };

    const handleSlideClick = (index: number) => {
        if (current !== index) {
            setCurrent(index);
        }
    };

    const id = useId();

    return (
        <div
            className="relative max-w-3xl w-[80vmin] aspect-[16/10] mx-auto"
            aria-labelledby={`carousel-heading-${id}`}
        >
            <ul
                className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
                style={{
                    transform: `translateX(-${current * (100 / slides.length)}%)`,
                }}
            >
                {slides.map((slide, index) => (
                    <Slide
                        key={index}
                        src={slide}
                        index={index}
                        current={current}
                        handleSlideClick={handleSlideClick}
                    />
                ))}
            </ul>

            <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
                <CarouselControl
                    type="previous"
                    title="Go to previous slide"
                    handleClick={handlePreviousClick}
                />

                <CarouselControl
                    type="next"
                    title="Go to next slide"
                    handleClick={handleNextClick}
                />
            </div>
        </div>
    );
}
