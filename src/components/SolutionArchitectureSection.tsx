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
    const h = 75;
    // Isometric properties
    const dx = 180;
    const dy = 104;

    // Labels from bottom to top (idx 3 is bottom, idx 0 is top)
    const layerLabels = [
        "ABC Lab",
        "AI:ON-U\nDev.AI",
        "Beast AI Gateway",
        "Ops.AI"
    ];

    return (
        <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center">
            <svg
                viewBox="-220 -350 440 650"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-2xl"
            >
                <g stroke="#000000" strokeWidth="4" strokeLinejoin="round">
                    {[0, 1, 2, 3].map((layerIndex) => {
                        // isHighlight: The activeStep corresponds to how many layers from bottom are lit.
                        // step 0 -> only layer 3 (bottom) is lit.
                        // step 1 -> layer 3 and layer 2 are lit.
                        // step 2 -> layer 3, 2, 1 are lit.
                        // step 3 -> all layers 3, 2, 1, 0 are lit.
                        const isHighlight = layerIndex >= (3 - activeStep);

                        // Text to show depends on the layer. layer 3 -> ABC Lab, layer 0 -> Ops.AI
                        const labelText = layerLabels[3 - layerIndex];

                        // Offset per layer (0 is top, 3 is bottom)
                        const yOff = layerIndex * h;

                        // Points for the Left face
                        const leftFace = `0 ${yOff} -${dx} ${-dy + yOff} -${dx} ${-dy + h + yOff} 0 ${h + yOff}`;

                        // Points for the Right face
                        const rightFace = `0 ${yOff} ${dx} ${-dy + yOff} ${dx} ${-dy + h + yOff} 0 ${h + yOff}`;

                        // Points for the Top face
                        const topFace = `0 ${yOff} -${dx} ${-dy + yOff} 0 ${-dy * 2 + yOff} ${dx} ${-dy + yOff}`;

                        return (
                            <g key={layerIndex} className="transition-all duration-500 ease-in-out">
                                {/* Top Face (Only drawn for the very top layer, but colored differently if the whole stack is lit) */}
                                {layerIndex === 0 && (
                                    <g>
                                        <polygon
                                            points={topFace}
                                            fill={isHighlight ? "#4da2ff" : "#e5e7eb"}
                                            className="transition-colors duration-500"
                                        />
                                        <text
                                            x="0"
                                            y="-15"
                                            fill={isHighlight ? "#ffffff" : "#888888"}
                                            fontSize="56"
                                            fontWeight="bold"
                                            textAnchor="middle"
                                            transform={`translate(0, ${yOff - dy}) scale(1, 0.577) rotate(-45)`}
                                            style={{ pointerEvents: 'none' }}
                                            className="transition-colors duration-500"
                                        >
                                            Kt ds
                                        </text>
                                    </g>
                                )}

                                {/* Left Face */}
                                <polygon
                                    points={leftFace}
                                    fill={isHighlight ? '#0885FE' : '#cccccc'}
                                    className="transition-colors duration-500"
                                />

                                {/* Right Face */}
                                <polygon
                                    points={rightFace}
                                    fill={isHighlight ? '#054687' : '#444444'}
                                    className="transition-colors duration-500"
                                />

                                {/* Text Label on Left Face */}
                                <text
                                    x={-dx * 0.5}
                                    y={yOff + h * 0.5 - dy * 0.5 + 6}
                                    fill={isHighlight ? '#ffffff' : '#555555'}
                                    fontSize="20"
                                    fontWeight="bold"
                                    textAnchor="middle"
                                    transform={`skewY(30)`}
                                    style={{ pointerEvents: 'none' }}
                                    className="transition-colors duration-500"
                                    stroke="none"
                                >
                                    {labelText.split('\n').map((line, i, arr) => (
                                        <tspan x={-dx * 0.5} dy={i === 0 ? (arr.length > 1 ? -12 : 0) : 24} key={i}>
                                            {line}
                                        </tspan>
                                    ))}
                                </text>
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
