/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useScroll, useTransform, useMotionTemplate, motion, useInView, AnimatePresence, animate, useAnimation, useMotionValueEvent } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ParticleEngine from './components/ParticleEngine';
import SolutionArchitectureSection from './components/SolutionArchitectureSection';
import HeroContent from './components/HeroContent';
import { LightRays } from './components/LightRays';
import Silk from './components/Silk';
import Aurora from './components/Aurora';
import { BackgroundGradientAnimation } from './components/ui/background-gradient-animation';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowUp,
  Search,
  Zap,
  Target,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Code,
  Brain,
  Cpu,
  Rocket,
  Settings,
  Box,
  BookOpen,
  Globe,
  Youtube,
  Linkedin,
  Mail,
  Smartphone,
  Info,
  Menu,
  X,
  ExternalLink,
  Utensils,
  Monitor,
  Layers,
} from 'lucide-react';

// Sub-components (Moved to top for hoisting/scoping clarity)

const StudioCard = ({ icon, title, desc }: { icon: React.ReactElement; title: string; desc: string }) => (
  <Card className="p-10 rounded-3xl bg-[#111] border-white/5 hover:bg-[#1a1a1a] hover:border-white/20 transition-all duration-500 group flex flex-col items-center md:items-start text-center md:text-left shadow-2xl relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-colors duration-500" />
    <div className="size-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-white/10 relative z-10 text-white/80 group-hover:text-blue-400">
      {React.cloneElement(icon as any, { size: 32 })}
    </div>
    <h4 className="text-2xl font-bold text-white mb-4 relative z-10">{title}</h4>
    <p className="text-white/50 leading-relaxed font-medium relative z-10">{desc}</p>
  </Card>
);

const AnimatedCounter = ({ from, to }: { from: number; to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: false, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !nodeRef.current) return;

    const controls = animate(from, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate(value) {
        if (nodeRef.current) {
          nodeRef.current.textContent = Intl.NumberFormat("en-US").format(Math.floor(value));
        }
      }
    });

    return () => controls.stop();
  }, [isInView, from, to]);

  return <span ref={nodeRef}>{Intl.NumberFormat("en-US").format(from)}</span>;
};

const SolutionCard = ({ image, title, desc, highlight }: { image: string; title: string; desc: string; highlight: string }) => (
  <div className="w-[320px] h-[280px] mx-auto rounded-[20px] bg-white flex items-center justify-center p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/[0.03] cursor-pointer transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 group relative overflow-hidden">
    {/* Default Logo View */}
    <img
      src={image}
      alt={title}
      className="w-[200px] h-auto object-contain transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
    />

    {/* Hover Overlay View */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col p-8 text-left">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url('/thumbnail_bg.png')` }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col h-full font-pretendard">
        <h4 className="text-white text-[24px] font-bold mb-4">{title}</h4>
        <p className="text-white/80 text-[15px] leading-relaxed mb-8 break-keep font-medium">
          {desc}
        </p>
        <div className="mt-auto">
          <span className="text-[#00E5FF] font-bold text-[16px] tracking-tight">{highlight}</span>
        </div>
      </div>
    </div>
  </div>
);

const InteractiveMockup = ({ image }: { image: string }) => {
  return (
    <div className="w-full flex items-center justify-center lg:justify-end relative group/frame shrink-0 bg-transparent">
      <img
        src={image}
        alt="Dashboard Content"
        className="w-full h-auto rounded-[32px] pointer-events-none block shadow-2xl"
      />
    </div>
  );
};

const UseCaseVisual = ({ image, index, setActive }: { key?: React.Key; image: string; index: number; setActive: (idx: number) => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-15% 0px -15% 0px", amount: 0.1 });

  useEffect(() => {
    if (isInView) setActive(index);
  }, [isInView, index, setActive]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 30,
        mass: 1,
        restDelta: 0.001,
        delay: 0.1
      }}
      className="w-full h-full smooth-gpu"
    >
      <InteractiveMockup image={image} />
    </motion.div>
  );
};


const CTAParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.parentElement.clientHeight * window.devicePixelRatio;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 1000; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    resize();
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 translate-z-0" />;
};

const DomainAccordionItem = ({
  title,
  agents,
  image,
  isActive,
  onMouseEnter
}: {
  title: string;
  agents: string[];
  image: string;
  isActive: boolean;
  onMouseEnter: () => void
}) => {
  return (
    <motion.div
      layout
      onMouseEnter={onMouseEnter}
      className="relative h-[700px] overflow-hidden cursor-pointer rounded-2xl smooth-gpu"
      style={{ willChange: 'flex, width' }}
      animate={{
        flex: isActive ? 680 : 122,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 24,
        mass: 0.8
      }}
    >
      <div className="absolute inset-0">
        <motion.img
          src={image}
          alt={title}
          loading="eager"
          className="w-full h-full object-cover"
          animate={{
            filter: isActive ? 'grayscale(0) brightness(0.9) contrast(1.1)' : 'grayscale(1) brightness(0.5)',
            scale: isActive ? 1.05 : 1
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      <div className={`absolute inset-x-0 top-0 p-8 flex flex-col justify-start h-full ${isActive ? 'text-left' : 'text-center'}`}>
        <div className={`flex flex-col gap-4 ${isActive ? 'items-start' : 'items-center'}`}>
          <motion.div
            layout
            initial={false}
          >
            <h4 className={`text-white font-normal transition-colors duration-500 whitespace-nowrap ${isActive ? 'text-[18px] mb-4' : 'text-[18px]'}`}>
              {title}
            </h4>
          </motion.div>

          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-2"
            >
              {agents.map((agent, i) => (
                <div key={i} className="flex items-center">
                  <span className="text-gray-100 text-[28px] font-bold">{agent}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Tag = ({ text }: { text: string }) => (
  <Badge variant="outline" className="border-blue-500 text-blue-500 rounded-full px-4 py-1.5 font-medium whitespace-nowrap">
    {text}
  </Badge>
);

const ProcessSection = () => {
  const processRef = useRef(null);
  const { scrollYProgress: scrollYProcess } = useScroll({
    target: processRef,
    offset: ["start end", "center center"]
  });

  const clipPathProcess = useTransform(
    scrollYProcess,
    [0.1, 0.6],
    ["inset(200px 300px round 40px)", "inset(0px 24px round 40px)"]
  );

  return (
    <div className="relative w-full py-10" ref={processRef}>
      <motion.div
        style={{ clipPath: clipPathProcess, scrollMarginTop: "100px" }}
        className="bg-[#F3F5FC] border border-black/5 relative z-20 overflow-hidden shadow-2xl smooth-gpu"
      >
        <section id="process" className="py-32 px-6 relative overflow-hidden">
          <div className="max-w-[1240px] mx-auto relative z-10">
            <div className="text-center mb-24">
              <span className="text-[#0885FE] text-[20px] font-bold mb-4 block tracking-wider">Why kt ds</span>
              <h2 className="text-[52px] font-black text-black mb-6 tracking-tight leading-tight">
                왜 KT DS와 함께 해야 할까요?
              </h2>
              <p className="text-black/80 text-[18px] max-w-2xl mx-auto font-medium">
                기업의 복잡한 요구사항을 기획부터 구축, 검증, 운영까지<br className="hidden md:block" />
                표준화된 프로세스로 완성합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { num: "01", title: "분석/설계", subtitle: "Retriever,\nAnalyst", desc: "데이터 협의체를 통해 데이터 분석 및 선별 이를 기반으로 RAG 및 Agent 구현에 최적화된 체계 구축\n원인 분석, 옵션 비교, 리스크/영향 평가, 계획 수립", color: "text-[#0885FE]" },
                { num: "02", title: "개발/구현", subtitle: "Writer,\nExecutor", desc: "Enterprise 맞춤형 워크플로우 생성 및 RAG 엔진 기반 지식 증강 최적화\n원인 분석, 옵션 비교, 리스크/영향 평가, 계획 수립", color: "text-[#0885FE]" },
                { num: "03", title: "검증/테스트", subtitle: "Validator,\nQuality", desc: "답변 정확도 및 안정성 검증을 위한 자동화 테스트와 멀티 레벨 QA 수행\n원인 분석, 옵션 비교, 리스크/영향 평가, 계획 수립", color: "text-[#0885FE]" },
                { num: "04", title: "운영/안정화", subtitle: "Maintainer,\nSRE", desc: "실시간 모니터링 및 성능 최적화를 통해 멈춤 없는 엔터프라이즈 AI 환경 제공\n원인 분석, 옵션 비교, 리스크/영향 평가, 계획 수립", color: "text-[#0885FE]" }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 60, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: false, margin: "-50px" }}
                  className="bg-white rounded-[20px] p-10 hover:shadow-lg transition-shadow duration-500 group flex flex-col min-h-[420px]"
                >
                  <div className="min-h-[130px]">
                    <span className={`${step.color} text-lg font-black mb-4 block`}>{step.num}</span>
                    <h3 className="text-[32px] font-black text-gray-900 leading-tight whitespace-pre-line">{step.subtitle}</h3>
                  </div>
                  <div className="flex-1" />
                  <div className="min-h-[160px]">
                    <h4 className="text-[18px] font-medium text-gray-900 mb-3">{step.title}</h4>
                    <p className="text-gray-400 text-[14px] leading-[1.8] whitespace-pre-line">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

const StudioSection = () => {
  return (
    <section id="studio-v2" className="bg-[#000000] py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* 메인 배너 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[440px] w-full rounded-[40px] border border-white/5 overflow-hidden group mb-16"
        >
          {/* LightRays 배경 - 박스 없이 전체로 활용 */}
          <div className="absolute inset-0 z-0">
            <LightRays
              raysOrigin="right"
              raysColor="#3B82F6"
              raysSpeed={0.15}
              lightSpread={0.8}
              rayLength={2}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-[1]" />

          <div className="relative z-10 pl-20 h-full flex flex-col justify-center max-w-2xl font-pretendard">
            <h2 className="text-[52px] font-black bg-gradient-to-r from-white via-white via-[40%] to-[#93C5FD] bg-clip-text text-transparent mb-4 tracking-tight leading-tight">
              AI Agent Studio
            </h2>
            <p className="text-white/80 text-[18px] leading-relaxed break-keep font-normal mb-8 max-w-xl">
              필요한 Agent, Tool, MCP를 빠르게 확인하고 시작하세요.<br />
              쉽게 개발 가능한 AI 아키텍처와 Delivery 가이드를 제공합니다.
            </p>

            <button className="w-[120px] h-[48px] text-[16px] font-medium border border-white/40 bg-transparent text-white rounded-lg transition-all group flex items-center justify-center p-0 hover:border-white/60 hover:bg-transparent">
              <span>더보기</span>
              <ChevronRight size={16} className="max-w-0 opacity-0 group-hover:max-w-[18px] group-hover:opacity-100 group-hover:ml-[2px] transition-all duration-300 overflow-hidden" />
            </button>
          </div>
        </motion.div>

        {/* 하단 4개 기능 카드 - Neubau 스타일 (다크 박스) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Agent 개발",
              desc: "AI Agent 개발을 위한 통합 개발 환경과 도구를 제공합니다.",
              icon: <Code className="text-white/80" strokeWidth={1.5} size={20} />
            },
            {
              title: "Core Agent",
              desc: "사전 개발된 Core Agent를 활용하여 빠른 프로토타이핑이 가능합니다.",
              icon: <Cpu className="text-white/80" strokeWidth={1.5} size={20} />
            },
            {
              title: "Use Case 패키징",
              desc: "Use case 단위로 패키징된 솔루션을 통해 즉시 배포할 수 있습니다.",
              icon: <Layers className="text-white/80" strokeWidth={1.5} size={20} />
            },
            {
              title: "Delivery 가이드",
              desc: "AI 아키텍처 소개 및 배포 가이드를 통해 안정적인 운영을 지원합니다.",
              icon: <BookOpen className="text-white/80" strokeWidth={1.5} size={20} />
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-[32px] border border-white/5 p-8 pt-4 transition-all duration-300 group hover:border-white/10"
            >
              <div className="size-10 rounded-full border border-white/10 flex items-center justify-center mb-8 group-hover:bg-white/5 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-white text-[20px] font-bold mb-2 tracking-tight">{item.title}</h3>
              <p className="text-white/60 text-[15px] leading-relaxed break-keep font-normal">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [activeDomain, setActiveDomain] = useState<number>(0);
  const navigate = useNavigate();
  const { scrollY, scrollYProgress } = useScroll();
  const newsScrollRef = useRef<HTMLDivElement>(null);

  const scrollNews = (direction: 'left' | 'right') => {
    if (newsScrollRef.current) {
      const scrollAmount = 400; // 380px card + 24px gap
      newsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };


  // Re-added clip path animation for the expanding background effect
  const clipPath = useTransform(
    scrollYProgress,
    [0.01, 0.03],
    ["inset(200px 300px round 40px)", "inset(0px 24px round 40px)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [activeUseCase, setActiveUseCase] = useState(0);
  const isScrollingRef = useRef(false);

  const scrollToTop = () => {
    isScrollingRef.current = true;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Re-enable intersection updates after the smooth scroll completes
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  };

  const handleSetActiveUseCase = (idx: number) => {
    if (!isScrollingRef.current) {
      setActiveUseCase(idx);
    }
  };

  const useCaseItems = [
    {
      id: "works-ai",
      titlePrefix: "AI Portal",
      titleSuffix: "Works AI",
      desc: "AI 챗봇 기반으로 다양한 업무 처리를 지원하는 AI Agent 포털 서비스로 기업 전체 AI 서비스를 통합 관리하고 접근할 수 있는 중앙 플랫폼입니다.",
      tags: ["AI 비서+그룹웨어", "맞춤형"],
      themeColor: "blue",
      features: [
        "기본적인 업무 기반에 최적화된 AI Agent 제공",
        "업무에 필요한 에이전트를 직접 만들어 사내 공유/ 활용",
        "그룹웨어 위젯 및 메뉴 커스텀을 통해 개인 맞춤형 컨텐츠 제공"
      ],
      icon: <Utensils className="w-8 h-8" />,
      image: "/test-1.png"
    },
    {
      id: "audit-agent",
      titlePrefix: "Audit Agent",
      desc: "방대한 기업 규제 및 감사 문서를 AI가 신속히 분석하여, 법적 리스크를 사전에 파악하고 완벽한 컴플라이언스 대응을 지원합니다.",
      tags: ["자료검색", "감사/리스크"],
      themeColor: "sky",
      features: [
        "사내 규정 및 가이드라인 기반의 AI 감사 수행",
        "키워드/의미 기반의 빠른 법령 및 판례 검색",
        "감사 보고서 자동 초안 작성 및 리스크 등급 분류"
      ],
      icon: <Search className="w-8 h-8" />,
      image: "/test-2.png"
    },
    {
      id: "meeting-agent",
      titlePrefix: "지능형 회의록 Agent",
      desc: "음성 인식(STT)과 NLP를 결합하여 회의 중 나오는 화자를 구분하고, 자동으로 액션 아이템을 추출합니다.",
      tags: ["음성인식", "업무추출"],
      themeColor: "emerald",
      features: [
        "실시간 음성 인식 및 화자 분리 기록",
        "회의 내용 자동 요약 및 주요 의사결정 사항 추출",
        "참석자 대상 회의록 자동 메일/메신저 발송 연동"
      ],
      icon: <Monitor className="w-8 h-8" />,
      image: "/test-3.png"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* GNB - Global Navigation Bar */}
      <nav
        className="fixed w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl py-4 px-6 md:px-10 border-b border-white/5"
      >
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <img src="/bizai_logo.png" alt="Biz.AI Logo" className="h-6 w-auto" />
            <span className="text-xl font-bold text-white tracking-tight hidden sm:inline">Biz.AI</span>
          </a>

          <div className="hidden lg:flex items-center gap-8 text-white/90 text-[14px] font-medium">
            <Link to="/platform" className="hover:text-white transition-colors">멀티 에이전트 플랫폼</Link>
            <Link to="/use-cases" className="hover:text-white transition-colors">고객 사례</Link>
            <Link to="/news" className="hover:text-white transition-colors">새로운 소식</Link>
          </div>

          {/* Right: CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden md:flex text-white/90 hover:text-white hover:bg-white/10">
              kt ds <ExternalLink size={14} />
            </Button>
            <Button size="sm" className="hidden md:flex bg-white text-black hover:bg-white/90 px-4 py-2 rounded-md font-semibold font-pretendard">
              AI Agent 스튜디오 <ExternalLink size={14} />
            </Button>
            <button className="lg:hidden text-white p-2 smooth-gpu" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="메뉴">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-[#0a0a0a]/80 backdrop-blur-xl py-4 px-6 overflow-hidden border-b border-white/10"
            >
              <div className="flex flex-col gap-4">
                <Link to="/platform" className="text-white/90 hover:text-white font-medium py-1" onClick={() => setIsMenuOpen(false)}>멀티 에이전트 플랫폼</Link>
                <Link to="/use-cases" className="text-white/90 hover:text-white font-medium py-1" onClick={() => setIsMenuOpen(false)}>고객 사례</Link>
                <Link to="/news" className="text-white/90 hover:text-white font-medium py-1" onClick={() => setIsMenuOpen(false)}>새로운 소식</Link>
                <div className="pt-2 mt-2 border-t border-white/10 flex flex-col gap-2">
                  <Button variant="ghost" size="sm" className="text-white/90 hover:text-white justify-start">
                    kt ds <ExternalLink size={14} />
                  </Button>
                  <Button size="sm" className="bg-white text-black hover:bg-white/90 w-full justify-center font-semibold">
                    AI Agent 스튜디오 <ExternalLink size={14} />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative z-20 h-screen flex items-center justify-center overflow-clip bg-[#0a0a0a] font-poppins">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ParticleEngine scrollYProgress={scrollYProgress} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[500px] bg-[radial-gradient(ellipse_at_bottom,rgba(37,99,235,0.15)_0%,transparent_70%)] pointer-events-none z-0" />
        <div className="relative z-10 flex items-center justify-center w-full">
          <HeroContent />
        </div>

        {/* 스크롤 다운 인디케이터 */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={28} className="text-white/60" strokeWidth={1.5} />
            <ChevronDown size={28} className="text-white/30 -mt-4" strokeWidth={1.5} />
          </motion.div>
          <span className="text-white/40 text-sm font-medium tracking-wider">Scroll down</span>
        </motion.div>
      </section>

      {/* Main Content Area */}
      <div className="relative z-20 bg-[#0a0a0a]">
        <div className="relative w-full pt-10">
          {/* Continuous gradient from the Hero section into the gap */}
          <div className="absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.15)_0%,transparent_70%)] pointer-events-none z-0" />
          <motion.div
            style={{ clipPath, willChange: 'clip-path' }}
            className="bg-[#F3F5FC] border border-black/5 relative z-20 overflow-hidden mb-20 smooth-gpu"
          >
            <section id="solution" className="py-32 px-6">
              <div className="max-w-[1200px] mx-auto relative">
                <div className="text-center mb-20 font-pretendard flex flex-col items-center relative z-10">
                  <h2 className="text-[58px] font-black text-black mb-6 tracking-tight leading-tight">
                    Kt ds AI Solutions
                  </h2>
                  <p className="text-black/80 text-[18px] max-w-2xl mx-auto font-medium">
                    AI 전략부터 운영까지, 기업 AI의 전 과정을 통합 지원합니다.
                  </p>
                </div>


                {/* 그룹 1: 전사 공통 */}
                <div className="mb-20 max-w-[984px] mx-auto">
                  <div className="flex items-center gap-2 mb-6 ml-4">
                    <span className="text-[18px] font-bold text-gray-800">전사 공통 (General Business)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px] justify-items-center">
                    {[
                      {
                        image: "/logo_1.png",
                        title: "AI:ON-U",
                        desc: "엔터프라이즈 맞춤형 AI Agent를 빠르게 구축하는 No-Code 기반 Agent Builder",
                        highlight: "#3분 완성 Agent"
                      },
                      {
                        image: "/logo_2.png",
                        title: "WorksAI",
                        desc: "AI Agent 기반으로 다양한 업무처리를 지원하는 사내 AI Agent Portal",
                        highlight: "#업무 효율 200% 향상"
                      },
                      {
                        image: "/logo_3.png",
                        title: "CloudWiz",
                        desc: "클라우드 운영 효율화와 자동화를 지원하는 관리 서비스",
                        highlight: "#멀티 클라우드 비용 30% 절감"
                      }
                    ].map((card, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                      >
                        <SolutionCard {...card} />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 그룹 2: IT 서비스/개발 직군 */}
                <div className="mb-14 max-w-[984px] mx-auto">
                  <div className="flex items-center gap-2 mb-6 ml-4">
                    <span className="text-[18px] font-bold text-gray-800">IT 서비스/개발 직군 (IT Service & Dev)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px] justify-items-center">
                    {[
                      {
                        image: "/logo_3.png",
                        title: "CloudWiz",
                        desc: "클라우드 운영 효율화와 자동화를 지원하는 관리 서비스",
                        highlight: "#멀티 클라우드 비용 30% 절감"
                      },
                      {
                        image: "/logo_5.png",
                        title: "Beast AI Gateway",
                        desc: "엔터프라이즈용 AI 기술, API를 통합 관리하는 솔루션",
                        highlight: "#안전한 AI API 통합 관리"
                      },
                      {
                        image: "/logo_4.png",
                        title: "Codebox",
                        desc: "폐쇄형 설치형 AI 코드 개발 어플라이언스",
                        highlight: "#보안 특화 AI 개발 환경"
                      }
                    ].map((card, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                      >
                        <SolutionCard {...card} />
                      </motion.div>
                    ))}
                  </div>
                </div>


              </div>
            </section>
          </motion.div>
        </div>

        <SolutionArchitectureSection />

        <section id="domain" className="py-32 px-6 relative overflow-hidden bg-[#0a0a0a] pb-16">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-left mb-16 font-pretendard">
              <span className="text-[#0885FE] font-bold text-[20px] mb-4 block tracking-tight">Multi Agent</span>
              <h2 className="text-[52px] font-black bg-gradient-to-r from-white via-white via-[40%] to-[#93C5FD] bg-clip-text text-transparent mb-6 tracking-tight">도메인별 Multi Agent</h2>
              <p className="text-white/80 text-[18px] font-normal tracking-tight">공공/금융 등 도메인별로 KTDS의 Multi-Agent를 활용해 보세요.</p>
            </div>

            <div className="flex gap-2 w-full">
              <DomainAccordionItem
                title="금융"
                agents={['Audit Agent', 'SQL Agent', 'RFP Agent']}
                image="https://images.unsplash.com/photo-1643258367012-1e1a983489e5?auto=format&fit=crop&q=80&w=1200"
                isActive={activeDomain === 0}
                onMouseEnter={() => setActiveDomain(0)}
              />
              <DomainAccordionItem
                title="공공기관"
                agents={['Audit Agent', 'RFP Agent', 'SQL Agent']}
                image="https://images.unsplash.com/photo-1665865298238-ec7a85eb3f9a?auto=format&fit=crop&q=80&w=1200"
                isActive={activeDomain === 1}
                onMouseEnter={() => setActiveDomain(1)}
              />
              <DomainAccordionItem
                title="일반기업"
                agents={['SQL Agent', 'RFP Agent', 'Codebox', 'beast AI Gateway']}
                image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                isActive={activeDomain === 2}
                onMouseEnter={() => setActiveDomain(2)}
              />
              <DomainAccordionItem
                title="미디어"
                agents={['SQL Agent', 'TA Agent']}
                image="https://images.unsplash.com/photo-1652166553819-f892e61fc12c?auto=format&fit=crop&q=80&w=1200"
                isActive={activeDomain === 3}
                onMouseEnter={() => setActiveDomain(3)}
              />
              <DomainAccordionItem
                title="통신/네트워크"
                agents={['SQL Agent', 'beast AI Gateway', 'Codebox']}
                image="https://images.unsplash.com/photo-1680992044138-ce4864c2b962?auto=format&fit=crop&q=80&w=1200"
                isActive={activeDomain === 4}
                onMouseEnter={() => setActiveDomain(4)}
              />
            </div>
          </div>
        </section>

        <section id="use-cases" className="py-32 bg-[#000000] relative">
          <div className="max-w-[1200px] mx-auto w-full min-h-[150vh] relative flex flex-col items-start px-6">
            <div className="w-full mb-6 pt-[80px]">
              <h2 className="text-[58px] font-black bg-gradient-to-r from-white via-white via-[40%] to-[#93C5FD] bg-clip-text text-transparent tracking-tight leading-[1.1] font-pretendard">
                Solution, <br />
                Multi Agent <br />
                Use Cases
              </h2>
            </div>

            <div className="w-full flex flex-col lg:flex-row items-start relative gap-0">
              <div className="w-full lg:w-[42%] lg:sticky lg:top-0 lg:h-screen flex flex-col justify-start z-20 pr-12 lg:pr-16 pt-[100px]">
                <div className="flex flex-col">
                  {useCaseItems.map((item, index) => {
                    const isActive = index === activeUseCase;
                    return (
                      <div key={item.id} className="group py-[23px] border-b border-white/10">
                        <h3
                          className={`text-[32px] tracking-tight transition-all duration-500 cursor-pointer flex items-center gap-4 ${isActive ? 'text-white' : 'text-white/30 hover:text-white/50'}`}
                          onClick={() => setActiveUseCase(index)}
                        >
                          <span className="font-bold">{item.titlePrefix}</span>
                          {item.titleSuffix && <span className="font-light">{item.titleSuffix}</span>}
                        </h3>

                        <AnimatePresence mode="wait">
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2.5">
                                <motion.p
                                  initial={{ y: 10, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                  className="text-[16px] text-white/80 leading-relaxed max-w-lg mb-6 whitespace-pre-line font-normal"
                                >
                                  {item.desc}
                                </motion.p>

                                {item.tags && (
                                  <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex flex-wrap gap-4 mb-8"
                                  >
                                    {item.tags.map((tag: string, i: number) => {
                                      return (
                                        <span key={i} className="text-[16px] font-medium text-[#00AEFF] transition-none">
                                          # {tag}
                                        </span>
                                      );
                                    })}
                                  </motion.div>
                                )}



                                <Link to="/use-cases">
                                  <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="mt-6 w-[80px] h-[36px] rounded-lg border border-white/40 text-white text-[15px] font-medium transition-all group flex items-center justify-center gap-0 hover:border-white/60 p-0"
                                  >
                                    <span>더보기</span><ChevronRight size={16} className="max-w-0 opacity-0 group-hover:max-w-[18px] group-hover:opacity-100 group-hover:ml-[2px] transition-all duration-300 overflow-hidden" />
                                  </motion.button>
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="w-full lg:w-[58%] flex flex-col gap-[30vh] pb-[30vh] pt-[140px] items-center lg:items-end overflow-visible">
                {useCaseItems.map((item, index) => (
                  <UseCaseVisual key={index} image={item.image} index={index} setActive={handleSetActiveUseCase} />
                ))}
              </div>
            </div>

            <div className="w-full flex justify-center -mt-16 relative z-30">
              <Link to="/use-cases">
                <Button
                  className="w-[220px] h-[48px] text-[16px] font-medium border border-white/40 bg-transparent text-white rounded-lg transition-all group flex items-center justify-center p-0 hover:border-white/60 hover:bg-transparent"
                >
                  <span>AI Agent / Solution 더보기</span><ChevronRight size={16} className="max-w-0 opacity-0 group-hover:max-w-[18px] group-hover:opacity-100 group-hover:ml-[2px] transition-all duration-300 overflow-hidden" />
                </Button>
              </Link>
            </div>
          </div>
        </section>\n\n        <ProcessSection />\n\n\n        <section id="logos" className="relative py-12 bg-[#000000] overflow-hidden">
          <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
            <div className="relative overflow-hidden w-full py-4">
              <motion.div
                className="flex items-center gap-x-20 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                }}
              >
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center gap-x-20 shrink-0 px-10">
                    {[
                      { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
                      { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
                      { name: "GitHub", url: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" },
                      { name: "Uber", url: "https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" },
                      { name: "Notion", url: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg" },
                      { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
                      { name: "Slack", url: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg" },
                    ].map((logo, idx) => (
                      <div key={`${i}-${idx}`} className="h-7 w-auto opacity-100 transition-opacity duration-300">
                        <img
                          src={logo.url}
                          alt={logo.name}
                          className="h-full w-auto object-contain filter brightness-0 invert"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section id="stats" className="py-32 px-6 bg-[#000000]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-32">

              <h2 className="text-[58px] font-black bg-gradient-to-r from-white via-white via-[40%] to-[#93C5FD] bg-clip-text text-transparent mb-6 tracking-tight">
                수치로 증명하는 Biz.AI
              </h2>
              <p className="text-white/80 text-[18px] max-w-3xl mx-auto font-normal">
                150+ 고객과 600+ AI Agent 구축 경험으로 Biz.AI의 역량을 증명합니다.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-x-16">
              {[
                { label: "IT Engineers", value: 1700, suffix: "+", sub: "Cloud & AI 기술을 선도하는 전문 인력" },
                { label: "Solution", value: 18, suffix: "", sub: "AX를 리딩하는 자체 개발 솔루션" },
                { label: "Clients", value: 150, suffix: "+", sub: "금융·공공·유통·미디어 등 다양한 산업 고객" },
                { label: "AI Agent", value: 600, suffix: "+", sub: "도메인별 특화 AI 에이전트" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-start font-pretendard">
                  <div className="text-[80px] font-medium text-white tracking-tighter leading-none mb-12">
                    <AnimatedCounter from={0} to={stat.value} />
                    <span className="text-[#0885FE] ml-1">{stat.suffix}</span>
                  </div>
                  <span className="text-white text-[18px] font-bold mb-1">{stat.label}</span>
                  <p className="text-white/80 text-[16px] leading-relaxed font-normal break-keep">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-24 px-6 bg-[#000000] relative">
          <div className="max-w-[1000px] mx-auto">
            <div className="max-w-[1000px] mx-auto relative group">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-3 space-y-3">
                {[
                  { user: "Musa M.", role: "Figma for web design.", stars: 4.5, quote: "Kt ds의 AI 솔루션은 상상 그 이상이었습니다. No-code 기반으로 이렇게 정교한 에이전트를 만들 수 있다는 게 믿기지 않네요." },
                  { user: "Marcelo A.", role: "CEO and Co-Founder", stars: 5, quote: "Great marketing site building in no time. 복잡한 지식 베이스를 RAG로 구축하는 과정이 너무나 간결합니다." },
                  { user: "Jorge H.", role: "Founder", stars: 5, quote: "Web design and development brought to a new level - also friendly for non-tech people. 비전문가도 수준 높은 AI 서비스를 운영할 수 있습니다." },
                  { user: "Ayush S.", role: "Product Designer", stars: 5, quote: "Design and publish websites in minutes! And for free! 디자인 작업과 AI 로직 구현이 완벽하게 시너지를 냅니다." },
                  { user: "Priya P.", role: "Product Designer", stars: 5, quote: "Best tool in market to create and ship website live faster. 기업용 AI 도입 속도를 획기적으로 단축시켜주었습니다." },
                  { user: "Erman M.", role: "Freelance designer", stars: 5, quote: "The easiest web design tool I've ever used. 정말 직관적이고 강력합니다." },
                  { user: "Durvesh C.", role: "User Interface Designer", stars: 5, quote: "Smooth and easy to migrate no code tool. 기존 레거시 시스템과의 연동이 매끄럽게 이루어집니다." },
                  { user: "Alex C.", role: "Manager", stars: 4.5, quote: "A good balance between full customization and easy to use platform. 커스터마이징의 유연성과 편의성을 모두 잡았습니다." },
                  { user: "Selçuk K.", role: "Senior DevOps Consultant", stars: 5, quote: "Easy and powerful. 인프라와 AI의 결합이 완벽한 자동화를 만들어냅니다." },
                  { user: "Shaddy", role: "My go-to tool for website designing.", stars: 5, quote: "복잡했던 업무들이 AI 에이전트 하나로 자동화되는 경험은 놀라웠습니다." },
                  { user: "Nidhi B.", role: "Content Writer", stars: 4.5, quote: "The road to no-code interface designing has been made easy with applications like Framer." },
                  { user: "Leo A.", role: "Amazing tool for no-code modern web design and publishing", stars: 5, quote: "엔터프라이즈 AI의 패러다임을 바꿀 만한 강력한 도구입니다!" },
                ].map((post, i) => (
                  <div key={i} className="break-inside-avoid bg-white/[0.01] border border-white/5 rounded-[20px] p-7 hover:border-white/20 transition-all duration-300 group/card">
                    <div className="mb-4">
                      <div className="text-white font-bold text-[18px] mb-1">{post.user}</div>
                      <div className="text-white/40 text-[14px] font-medium leading-tight mb-4">{post.role}</div>
                      <p className="text-white/80 text-[15px] leading-[1.6] font-normal break-keep mb-5">{post.quote}</p>

                      {/* 별점 */}
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill={index < Math.floor(post.stars) ? "#3B82F6" : "rgba(255,255,255,0.1)"}
                            className="shrink-0"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 바닥 그라데이션 페이드 아웃 */}
              <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent z-20 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* 새로운 소식 섹션: 우측 블리드(Bleed) 레이아웃 */}
        <section id="news" className="py-32 bg-[#000000] relative">
          {/* 헤더 영역: 컨테이너 내부 */}
          <div className="max-w-[1200px] mx-auto px-6 mb-16">
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-start text-left">
                <h2 className="text-[58px] font-bold bg-gradient-to-r from-white via-white via-[40%] to-[#93C5FD] bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                  새로운 소식
                </h2>
                <p className="text-white/70 text-[18px] max-w-2xl font-medium leading-relaxed">
                  Biz.AI가 전하는 최신 업데이트와 인사이트를 확인하세요.
                </p>
              </div>

              {/* 내비게이션 버튼 (우측 상단) */}
              <div className="flex gap-3 mb-2">
                <button
                  onClick={() => scrollNews('left')}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all bg-white/5 hover:bg-white/10"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => scrollNews('right')}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all bg-white/5 hover:bg-white/10"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* 뉴스 카드 리스트: 타이틀 정렬 + 우측 블리드 */}
          <div
            ref={newsScrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-12 pl-[calc(max(24px,(100vw-1200px)/2+24px))] pr-6"
          >
            {[
              { title: "AI Agent Builder\nAI:ON-U 정식 출시", date: "Feb 20, 2026", tag: "Product", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" },
              { title: "Enterprise RAG\n엔진 2.0 업데이트", date: "Jan 15, 2026", tag: "Product", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800" },
              { title: "Kt ds, AI Agent\n도입 사례 공개", date: "Dec 22, 2025", tag: "Case Study", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" },
              { title: "2025 AI Trends\nReport 발간", date: "Nov 30, 2025", tag: "Insight", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" },
              { title: "AI Agent Builder\nAI:ON-U 정식 출시", date: "Feb 20, 2026", tag: "Product", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" },
              { title: "Enterprise RAG\n엔진 2.0 업데이트", date: "Jan 15, 2026", tag: "Product", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800" }
            ].map((news, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group cursor-pointer shrink-0 w-[380px]"
                onClick={() => navigate(`/news/${(i % 4) + 1}`, { state: { news } })}
              >
                {/* 썸네일: 380 * 240 사이즈 */}
                <div className="relative w-full aspect-[380/240] rounded-2xl overflow-hidden mb-5 bg-zinc-900 border border-white/5 shadow-2xl">
                  <motion.img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover transition-all duration-700"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
                </div>

                {/* 텍스트 */}
                <div className="flex flex-col px-1">
                  <span className="text-blue-400 text-[14px] font-bold mb-3">{news.tag}</span>
                  <h3 className="text-white text-[24px] font-bold leading-snug mb-3 whitespace-pre-line group-hover:text-blue-400 transition-colors">
                    {news.title}
                  </h3>
                  <span className="text-white/40 text-[14px] font-medium">{news.date}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 더보기 버튼: 중앙 정렬 */}
          <div className="flex justify-center mt-8">
            <Link to="/news">
              <button className="w-[120px] h-[48px] text-[16px] font-medium border border-white/40 bg-transparent text-white rounded-lg transition-all group flex items-center justify-center p-0 hover:border-white/60 hover:bg-transparent">
                <span>전체보기</span><ChevronRight size={16} className="max-w-0 opacity-0 group-hover:max-w-[18px] group-hover:opacity-100 group-hover:ml-[2px] transition-all duration-300 overflow-hidden" />
              </button>
            </Link>
          </div>
        </section>

        {/* FAQ 섹션 */}
        <section id="faq" className="py-24 px-6 bg-[#000000] relative overflow-hidden">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-20">
              {/* 왼쪽: 헤더 */}
              <div className="lg:w-1/3">
                <h2 className="text-[52px] font-black bg-gradient-to-r from-white via-white via-[40%] to-[#93C5FD] bg-clip-text text-transparent mb-8 tracking-tight leading-tight font-pretendard">
                  FAQ
                </h2>
              </div>

              {/* 오른쪽: 아코디언 리스트 */}
              <div className="lg:w-2/3">
                <div className="space-y-4">
                  {[
                    {
                      q: "Biz.AI는 기존 레거시 시스템과 연동이 가능한가요?",
                      a: "네, 가능합니다. Biz.AI는 표준 API 및 전용 커넥터를 통해 기존의 ERP, CRM, 데이터베이스 등 다양한 내부 시스템과 유연하게 연동됩니다. 특히 폐쇄형 환경에서도 안전하게 작동하도록 설계되었습니다."
                    },
                    {
                      q: "AI Agent 구축 기간은 보통 어느 정도 소요되나요?",
                      a: "도메인과 복잡도에 따라 다르지만, Biz.AI의 Agent Builder와 사전 개발된 Core Agent를 활용하면 단순 업무용 에이전트는 1~2주 내에, 분석형 에이전트는 약 4~8주 내에 실무 적용이 가능합니다."
                    },
                    {
                      q: "보안 및 데이터 유출 방지 대책은 어떻게 되어 있나요?",
                      a: "Biz.AI는 기업 내부의 폐쇄형 서버(On-premise) 또는 프라이빗 클라우드에 설치가 가능하며, 사용자의 질문과 데이터가 외부 모델 학습에 사용되지 않도록 철저한 가드레일 보안 체계를 갖추고 있습니다."
                    },
                    {
                      q: "AI 비전문가도 Agent를 직접 만들고 운영할 수 있나요?",
                      a: "네, Biz.AI Agent Studio는 No-Code/Low-Code 기반의 직관적인 UI를 제공합니다. 복잡한 코딩 없이도 워크플로우를 설계하고 에이전트의 페르소나를 설정할 수 있어 현업 실무자가 직접 운영하기에 용이합니다."
                    },
                    {
                      q: "도입 이후 유지보수 및 업데이트는 어떻게 이루어지나요?",
                      a: "엔터프라이즈급 운영 지원 서비스를 제공하며, 급변하는 AI 모델 트렌드에 맞춰 정기적인 엔진 업데이트와 기술 지원을 지원합니다. 또한 에이전트 성능을 실시간으로 모니터링할 수 있는 대시보드도 제공됩니다."
                    }
                  ].map((item, i) => {
                    const [isOpen, setIsOpen] = useState(false);
                    return (
                      <motion.div
                        key={i}
                        className="border-b border-white/10"
                        initial={false}
                      >
                        <button
                          onClick={() => setIsOpen(!isOpen)}
                          className="w-full py-8 flex items-center justify-between text-left group"
                        >
                          <span className={`text-[20px] font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/60 group-hover:text-white/90'}`}>
                            {item.q}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            className="text-white/30"
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M6 9l6 6 6-6" />
                            </svg>
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <p className="pb-8 text-white/50 text-[17px] leading-relaxed font-normal break-keep max-w-2xl">
                                {item.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* AI Agent 스튜디오 섹션 */}
        <StudioSection />

        {/* CTA 배너 - Full Width (Premium Aurora Style) 복구 */}
        <div className="w-full py-0">
          <section className="relative h-[500px] w-full overflow-hidden flex items-center justify-center bg-black border-y border-white/5">
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-60">
              <Silk
                speed={5}
                scale={0.6}
                color="#5d7cda"
                noiseIntensity={2.5}
                rotation={1.2}
              />
            </div>
            <div className="relative z-10 w-full max-w-[1200px] mx-auto text-center font-pretendard px-6 py-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <h2 className="text-white text-[48px] font-extrabold mb-10 tracking-tighter leading-[1.2] drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                  Biz.AI와 함께<br />
                  AI 혁신을 지금 실행하세요.
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    className="group bg-white text-[#000000] hover:bg-white/90 w-[140px] h-[40px] py-0 text-[14px] font-semibold rounded-full transition-all flex items-center justify-center gap-0 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    무료체험 신청
                    <ChevronRight size={18} className="max-w-0 opacity-0 group-hover:max-w-[24px] group-hover:opacity-100 group-hover:ml-1 transition-all duration-300 overflow-hidden" />
                  </Button>
                  <Button
                    className="group bg-white/10 text-white border-none hover:bg-white/20 w-[140px] h-[40px] py-0 text-[14px] font-semibold rounded-full transition-all flex items-center justify-center gap-0 mt-3 sm:mt-0"
                  >
                    솔루션 문의
                    <ChevronRight size={18} className="max-w-0 opacity-0 group-hover:max-w-[24px] group-hover:opacity-100 group-hover:ml-1 transition-all duration-300 overflow-hidden" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        {/* 풋터 */}
        <footer className="bg-[#000000] py-32 px-6 border-t border-white/5">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-24">
              <div className="flex flex-col">
                <div className="mb-8">
                  <h4 className="text-[22px] font-bold text-white tracking-tight">kt ds</h4>
                </div>
                <p className="text-white/80 text-[16px] leading-relaxed mb-10 break-keep font-medium">
                  비즈니스를 위한 엔터프라이즈급<br />
                  AI Agent 플랫폼
                </p>
                <div className="flex gap-4 mt-auto">
                  <a href="#" className="text-white/40 hover:text-white transition-all">
                    <Linkedin size={22} strokeWidth={1.5} />
                  </a>
                  <a href="#" className="text-white/40 hover:text-white transition-all">
                    <Youtube size={22} strokeWidth={1.5} />
                  </a>
                  <a href="#" className="text-white/40 hover:text-white transition-all">
                    <Mail size={22} strokeWidth={1.5} />
                  </a>
                </div>
              </div>

              <div>
                <h5 className="text-white font-bold mb-8 text-[15px]">AI 솔루션</h5>
                <ul className="space-y-4 text-[14px] font-medium text-white/40">
                  <li><a href="#" className="hover:text-white transition-colors">고객지원·VOC 자동화</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">데이터 기반 의사결정</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">내부 운영·업무 자동화</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">기획·보고·문서 업무</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">리스크·품질 관리</a></li>
                </ul>
              </div>

              <div>
                <h5 className="text-white font-bold mb-8 text-[15px]">제품</h5>
                <ul className="space-y-4 text-[14px] font-medium text-white/40">
                  <li><a href="#" className="hover:text-white transition-colors">데이터 Agent</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">분류·분석 Agent</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">리포트·문서 Agent</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">운영·지원 Agent</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">AI Agent 스튜디오</a></li>
                </ul>
              </div>

              <div>
                <h5 className="text-white font-bold mb-8 text-[15px]">회사</h5>
                <ul className="space-y-4 text-[14px] font-medium text-white/40">
                  <li><a href="#" className="hover:text-white transition-colors">우수 사례</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">가격 안내</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">문서</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">고객 지원</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">파트너십</a></li>
                </ul>
              </div>
            </div>

            <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] text-white/30 font-medium">
              <p>© 2026 AI Biz Portal. All rights reserved.</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
                <a href="#" className="hover:text-white transition-colors">이용약관</a>
                <a href="#" className="hover:text-white transition-colors">보안정책</a>
              </div>
            </div>
          </div>
        </footer>
      </div >

      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[100] w-[40px] h-[40px] flex items-center justify-center bg-[#0a0a0a]/60 text-white hover:bg-[#0a0a0a]/80 rounded-full transition-all border border-white/20"
            aria-label="맨 위로 가기"
          >
            <ArrowUp size={16} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </div >
  );
};

export default App;
