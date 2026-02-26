import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const steps = [
    {
        num: "01",
        title: "아이디어 및 사전 검증",
        desc: "ABC Lab",
    },
    {
        num: "02",
        title: "개발 및 서비스 구축",
        desc: "AI:ON-U\nDev.AI",
    },
    {
        num: "03",
        title: "시스템 연동 및 보안",
        desc: "Beast AI Gateway",
    },
    {
        num: "04",
        title: "운영 및 안정화",
        desc: "Ops.AI",
    },
];

const LayerGraphic = ({ activeStep }: { activeStep: number }) => {
    // Height per block slice
    const h = 60;
    // Isometric properties
    const dx = 160;
    const dy = 92;

    // Labels for the left face, top-to-bottom order (index 0 is top)
    const layerLabels = [
        "ABC Lab",
        "AI:ON-U\nDev.AI",
        "Beast AI Gateway",
        "Ops.AI"
    ];

    // Helper to get color states
    const getTopColor = (index: number) => activeStep === index ? '#4da2ff' : '#9ca3af';
    const getLeftColor = (index: number) => activeStep === index ? '#0885FE' : '#4b5563';
    const getRightColor = (index: number) => activeStep === index ? '#054687' : '#1f2937';

    return (
        <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center">
            <svg
                viewBox="-200 -300 400 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-2xl"
            >
                <g stroke="#000000" strokeWidth="3" strokeLinejoin="round">
                    {[0, 1, 2, 3].map((layerIndex) => {
                        // Offset per layer (0 is top, 3 is bottom)
                        const yOff = layerIndex * h;

                        // Points for the Left face
                        const leftFace = `
              0 ${yOff} 
              -${dx} ${-dy + yOff} 
              -${dx} ${-dy + h + yOff} 
              0 ${h + yOff}
            `;

                        // Points for the Right face
                        const rightFace = `
              0 ${yOff} 
              ${dx} ${-dy + yOff} 
              ${dx} ${-dy + h + yOff} 
              0 ${h + yOff}
            `;

                        // Points for the Top face (only visible for the top layer 0 in a solid stack, 
                        // but we'll draw it for all just in case, though they overlap)
                        const topFace = `
              0 ${yOff}
              -${dx} ${-dy + yOff}
              0 ${-dy * 2 + yOff}
              ${dx} ${-dy + yOff}
            `;

                        return (
                            <g key={layerIndex} className="transition-all duration-500 ease-in-out">
                                {/* Top Face */}
                                {layerIndex === 0 && (
                                    <polygon
                                        points={topFace}
                                        fill={getTopColor(layerIndex)}
                                        className="transition-colors duration-500"
                                    />
                                )}

                                {/* Left Face */}
                                <polygon
                                    points={leftFace}
                                    fill={getLeftColor(layerIndex)}
                                    className="transition-colors duration-500"
                                />

                                {/* Right Face */}
                                <polygon
                                    points={rightFace}
                                    fill={getRightColor(layerIndex)}
                                    className="transition-colors duration-500"
                                />

                                {/* Text Label on Left Face */}
                                <g className="transition-opacity duration-500" style={{ opacity: activeStep === layerIndex ? 1 : 0 }}>
                                    <text
                                        x={-dx * 0.5}
                                        y={yOff + h * 0.5 - dy * 0.5 + 5}
                                        fill="#ffffff"
                                        fontSize="18"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                        transform={`skewY(30)`}
                                        style={{ pointerEvents: 'none' }}
                                    >
                                        {layerLabels[layerIndex].split('\n').map((line, i, arr) => (
                                            <tspan x={-dx * 0.5} dy={i === 0 ? (arr.length > 1 ? -10 : 0) : 20} key={i}>
                                                {line}
                                            </tspan>
                                        ))}
                                    </text>
                                </g>
                            </g>
                        );
                    })}
                </g>
            </svg>
        </div>
    );
};

export default function SolutionArchitectureSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Calculate active step based on scroll progress
    const getActiveStep = (progress: number) => {
        if (progress < 0.25) return 0;
        if (progress < 0.5) return 1;
        if (progress < 0.75) return 2;
        return 3;
    };

    // State will be managed by motion transform directly if possible, or we subscribe to scroll
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        return smoothProgress.onChange((v) => {
            setActiveStep(getActiveStep(v));
        });
    }, [smoothProgress]);

    return (
        <section ref={containerRef} className="relative bg-[#000000] h-[400vh]">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                <div className="max-w-[1200px] mx-auto w-full px-6 flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* Left Text Content */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <div className="mb-16">
                            <span className="text-[#0885FE] font-bold text-[16px] tracking-widest block mb-4 uppercase">Architecture</span>
                            <h2 className="text-[48px] lg:text-[56px] font-black text-white tracking-tight leading-tight">
                                Kt ds AI Solution
                            </h2>
                        </div>

                        <div className="flex flex-col gap-12">
                            {steps.map((step, index) => {
                                const isActive = activeStep === index;
                                return (
                                    <div
                                        key={index}
                                        className={`transition-all duration-500 ${isActive ? 'opacity-100 pl-4 border-l-2 border-[#0885FE]' : 'opacity-20 pl-4 border-l-2 border-transparent'}`}
                                    >
                                        <div className={`text-[24px] font-bold mb-2 transition-colors duration-500 ${isActive ? 'text-[#0885FE]' : 'text-white'}`}>
                                            {step.num}
                                        </div>
                                        <h3 className="text-white text-[24px] font-bold mb-4">{step.title}</h3>
                                        <div className="text-gray-300 text-[18px] whitespace-pre-line leading-relaxed">
                                            {step.desc.split('\n').map((line, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <span className="text-[#0885FE]">•</span> {line}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right SVG Graphic */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center">
                        <LayerGraphic activeStep={activeStep} />
                    </div>

                </div>
            </div>
        </section>
    );
}
