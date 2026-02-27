import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

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
    // Height per block slice (reduced thickness)
    const h = 45;
    // Isometric properties (base scale)
    const dx = 200;
    const dy = 115;

    // Labels from bottom to top (idx 3 is bottom, idx 0 is top)
    const layerLabels = [
        "ABC Lab",
        "AI:ON-U\nDev.AI",
        "Beast AI Gateway",
        "Ops.AI"
    ];

    return (
        // Used natural aspect ratio, scaled the SVG for larger size and adjusted padding to firmly root it vertically in center
        <div className="relative w-full max-w-[400px] md:max-w-[600px] lg:max-w-[800px] lg:scale-[1.25] flex items-center justify-center transform lg:translate-x-12 pointer-events-none mt-8 md:mt-0">
            <svg
                viewBox="-240 -260 480 480"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto drop-shadow-2xl"
            >
                <g stroke="#000000" strokeWidth="4" strokeLinejoin="round">
                    {[0, 1, 2, 3].map((layerIndex) => {
                        // isHighlight: The activeStep corresponds to how many layers from bottom are lit.
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
                                    <polygon
                                        points={topFace}
                                        fill={isHighlight ? "#4da2ff" : "#e5e7eb"}
                                        className="transition-colors duration-500"
                                    />
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
                                {/* Translating to the left center edge, and applying perfect skew matching the geometric angles */}
                                <g transform={`translate(${-dx + 28}, ${yOff - dy + h * 0.5}) skewY(30)`}>
                                    <text
                                        fill={isHighlight ? '#ffffff' : '#666666'}
                                        fontSize="22"
                                        fontWeight="bold"
                                        dominantBaseline="central"
                                        className="transition-colors duration-500"
                                        stroke="none"
                                    >
                                        {labelText.split('\n').map((line, i, arr) => {
                                            let yPos = 0;
                                            if (arr.length > 1) {
                                                yPos = i === 0 ? -12 : 14;
                                            }
                                            return (
                                                <tspan x="0" y={yPos} key={i}>
                                                    {line}
                                                </tspan>
                                            );
                                        })}
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
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center items-center">
                <div className="max-w-[1200px] mx-auto w-full px-4 md:px-6 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 pt-20 lg:pt-0">

                    {/* Left Text Content */}
                    <div className="w-full lg:w-5/12 flex flex-col justify-center relative z-10 order-2 lg:order-1 h-[300px] md:h-auto">

                        {/* Scrolling / Masked Viewport */}
                        <div
                            className="relative h-[250px] md:h-[400px] lg:h-[650px] overflow-hidden"
                            style={{
                                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 65%, transparent 100%)',
                                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 65%, transparent 100%)'
                            }}
                        >
                            <motion.div
                                className="flex flex-col absolute w-full top-[20px] md:top-[60px] lg:top-[100px]"
                                animate={{ y: -(activeStep * (window.innerWidth < 1024 ? 180 : 240)) }}
                                transition={{ type: "spring", stiffness: 100, damping: 25 }}
                            >
                                {/* Header section included in the scroll */}
                                <div className={`mb-8 md:mb-12 transition-all duration-500 pl-4 md:pl-6 ${activeStep > 0 ? 'opacity-0' : 'opacity-100'}`}>
                                    <span className="text-[#0885FE] font-bold text-[14px] md:text-[16px] tracking-widest block mb-2 md:mb-4 uppercase">Architecture</span>
                                    <h2 className="text-[36px] md:text-[48px] lg:text-[56px] font-black text-white tracking-tight leading-tight">
                                        Kt ds AI Solution
                                    </h2>
                                </div>

                                {steps.map((step, index) => {
                                    const isActive = activeStep === index;
                                    return (
                                        <div
                                            key={index}
                                            className={`h-[180px] lg:h-[240px] flex-shrink-0 transition-all duration-500 ${isActive ? 'opacity-100 pl-4 md:pl-6 border-l-2 md:border-l-4 border-[#0885FE]' : 'opacity-20 pl-4 md:pl-6 border-l-2 md:border-l-4 border-[#333333]'}`}
                                        >
                                            <div className={`text-[24px] md:text-[32px] font-bold mb-1 md:mb-2 transition-colors duration-500 ${isActive ? 'text-[#0885FE]' : 'text-[#666666]'}`}>
                                                {step.num}
                                            </div>
                                            <h3 className={`text-[20px] md:text-[24px] lg:text-[28px] font-bold mb-2 md:mb-4 transition-colors duration-500 ${isActive ? 'text-white' : 'text-[#666666]'}`}>{step.title}</h3>
                                            <div className="text-[14px] md:text-[16px] lg:text-[20px] whitespace-pre-line leading-relaxed">
                                                {step.desc.split('\n').map((line, i) => (
                                                    <div key={i} className="flex items-center gap-3">
                                                        <span className="text-[#0885FE]">•</span>
                                                        <span className={isActive ? 'text-gray-300' : 'text-[#444444]'}>{line}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Graphic Content */}
                    <div className="w-full lg:w-7/12 flex justify-center items-center relative order-1 lg:order-2">
                        <LayerGraphic activeStep={activeStep} />
                    </div>
                </div>
            </div>
        </section>
    );
}
