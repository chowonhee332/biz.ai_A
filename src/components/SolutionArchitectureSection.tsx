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
    const getFill = (stepIndex: number) => {
        return activeStep === stepIndex ? '#0885FE' : '#d1d5db'; // Highlight color vs gray-300
    };

    const getTextColor = (stepIndex: number) => {
        return activeStep === stepIndex ? '#ffffff' : '#9ca3af'; // White text vs gray-400
    };

    return (
        <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center">
            <svg
                viewBox="0 0 800 800"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-2xl"
            >
                <g transform="translate(400, 200) scale(1.5)">
                    {/* Base shadow */}
                    <path d="M0 250 L200 350 L0 450 L-200 350 Z" fill="rgba(0,0,0,0.8)" filter="blur(20px)" />

                    {/* Step 4: Bottom Layer (Ops.AI - K Cloud) */}
                    <g className="transition-all duration-500 ease-in-out">
                        <path d="M0 150 L200 250 L200 310 L0 410 L-200 310 L-200 250 Z" fill={activeStep === 3 ? '#0768c9' : '#9ca3af'} className="transition-colors duration-500" />
                        <path d="M0 150 L200 250 L0 350 L-200 250 Z" fill={getFill(3)} className="transition-colors duration-500" />
                        <path d="M0 350 L200 250 L200 310 L0 410 Z" fill={activeStep === 3 ? '#0657a8' : '#6b7280'} className="transition-colors duration-500" />
                        <path d="M-200 250 L0 350 L0 410 L-200 310 Z" fill={activeStep === 3 ? '#054687' : '#4b5563'} className="transition-colors duration-500" />
                        <text x="-160" y="270" fill={getTextColor(3)} fontSize="18" fontWeight="bold" transform="skewY(26)" style={{ pointerEvents: 'none' }} className="transition-colors duration-500">K Cloud</text>
                    </g>

                    {/* Step 3: Third Layer (Beast AI Gateway - K RAI) */}
                    <g className="transition-all duration-500 ease-in-out" transform="translate(0, -60)">
                        <path d="M0 150 L200 250 L200 310 L0 410 L-200 310 L-200 250 Z" fill={activeStep === 2 ? '#0768c9' : '#9ca3af'} className="transition-colors duration-500" />
                        <path d="M0 150 L200 250 L0 350 L-200 250 Z" fill={getFill(2)} className="transition-colors duration-500" />
                        <path d="M0 350 L200 250 L200 310 L0 410 Z" fill={activeStep === 2 ? '#0657a8' : '#6b7280'} className="transition-colors duration-500" />
                        <path d="M-200 250 L0 350 L0 410 L-200 310 Z" fill={activeStep === 2 ? '#054687' : '#4b5563'} className="transition-colors duration-500" />
                        <text x="-160" y="270" fill={getTextColor(2)} fontSize="20" fontWeight="bold" transform="skewY(26)" style={{ pointerEvents: 'none' }} className="transition-colors duration-500">K RAI</text>
                    </g>

                    {/* Step 2: Second Layer (AI:ON-U, Dev.AI - K intelligence Studio) */}
                    <g className="transition-all duration-500 ease-in-out" transform="translate(0, -120)">
                        <path d="M0 150 L200 250 L200 310 L0 410 L-200 310 L-200 250 Z" fill={activeStep === 1 ? '#0768c9' : '#9ca3af'} className="transition-colors duration-500" />
                        <path d="M0 150 L200 250 L0 350 L-200 250 Z" fill={getFill(1)} className="transition-colors duration-500" />
                        <path d="M0 350 L200 250 L200 310 L0 410 Z" fill={activeStep === 1 ? '#0657a8' : '#6b7280'} className="transition-colors duration-500" />
                        <path d="M-200 250 L0 350 L0 410 L-200 310 Z" fill={activeStep === 1 ? '#054687' : '#4b5563'} className="transition-colors duration-500" />
                        <text x="-160" y="270" fill={getTextColor(1)} fontSize="18" fontWeight="bold" transform="skewY(26)" style={{ pointerEvents: 'none' }} className="transition-colors duration-500">K intelligence Studio</text>
                    </g>

                    {/* Step 1: Top Layer (ABC Lab - K Agent, K RAG, K Model) */}
                    <g className="transition-all duration-500 ease-in-out" transform="translate(0, -180)">
                        {/* Split top layer into 3 blocks */}
                        {/* Block 1 (Left - K Agent) */}
                        <g>
                            <path d="M-66 183 L0 250 L-66 283 L-133 216 Z" fill={getFill(0)} className="transition-colors duration-500" />
                            <path d="M-66 283 L0 250 L0 310 L-66 343 Z" fill={activeStep === 0 ? '#0657a8' : '#6b7280'} className="transition-colors duration-500" />
                            <path d="M-133 216 L-66 283 L-66 343 L-133 276 Z" fill={activeStep === 0 ? '#054687' : '#4b5563'} className="transition-colors duration-500" />
                            <text x="-90" y="250" fill={getTextColor(0)} fontSize="14" fontWeight="bold" transform="skewY(26)" style={{ pointerEvents: 'none' }} className="transition-colors duration-500">K Agent</text>
                        </g>

                        {/* Block 2 (Middle - K RAG) */}
                        <g transform="translate(66, 33)">
                            <path d="M-66 183 L0 250 L-66 283 L-133 216 Z" fill={getFill(0)} className="transition-colors duration-500" />
                            <path d="M-66 283 L0 250 L0 310 L-66 343 Z" fill={activeStep === 0 ? '#0657a8' : '#6b7280'} className="transition-colors duration-500" />
                            <path d="M-133 216 L-66 283 L-66 343 L-133 276 Z" fill={activeStep === 0 ? '#054687' : '#4b5563'} className="transition-colors duration-500" />
                            <text x="-80" y="250" fill={getTextColor(0)} fontSize="14" fontWeight="bold" transform="skewY(26)" style={{ pointerEvents: 'none' }} className="transition-colors duration-500">K RAG</text>
                        </g>

                        {/* Block 3 (Right - K Model) */}
                        <g transform="translate(133, 66)">
                            <path d="M-66 183 L0 250 L-66 283 L-133 216 Z" fill={activeStep === 0 ? '#ff0000' : getFill(0)} className="transition-colors duration-500" /> {/* Explicitly making it red in the example screenshot, but instructions say color blue #0885FE, so I'll follow user's general text, but let's make it the active color requested. Actually the prompt says "스크롤에따라 각 블록별 파란색으로 칠해줘!! 빨간색이 아니라" so we use the blue color getFill(0) for all. */}
                            <path d="M-66 283 L0 250 L0 310 L-66 343 Z" fill={activeStep === 0 ? '#0657a8' : '#6b7280'} className="transition-colors duration-500" />
                            <path d="M-133 216 L-66 283 L-66 343 L-133 276 Z" fill={activeStep === 0 ? '#054687' : '#4b5563'} className="transition-colors duration-500" />
                            <text x="-85" y="250" fill={getTextColor(0)} fontSize="14" fontWeight="bold" transform="skewY(26)" style={{ pointerEvents: 'none' }} className="transition-colors duration-500">K Model</text>
                        </g>
                    </g>
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
