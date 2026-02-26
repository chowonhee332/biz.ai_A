import { useState, useEffect } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'motion/react';

export default function UseCaseDetailPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const item = location.state?.news || {
        title: "글로벌 금융사 A사 AI 기반 여신 심사 자동화",
        date: "2026년 02월",
        category: "Finance",
        image: "https://images.unsplash.com/photo-1554224155-16974a4ea2c5?auto=format&fit=crop&q=80&w=2500"
    };

    const [activeSection, setActiveSection] = useState<string>("introduction");

    useEffect(() => {
        window.scrollTo(0, 0);

        const sections = ["introduction", "objective", "solution", "results"];
        const observers = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-20% 0px -70% 0px", // 화면 중앙 근처에 올 때 인식하도록 마진 조정
                threshold: 0
            }
        );

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observers.observe(el);
        });

        return () => observers.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-pretendard flex flex-col">
            {/* GNB */}
            <nav className="fixed w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl py-4 px-6 md:px-10 border-b border-white/5">
                <div className="max-w-[1200px] mx-auto flex justify-between items-center px-6 md:px-0">
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <img src="/bizai_logo.png" alt="Biz.AI Logo" className="h-6 w-auto" />
                        <span className="text-xl font-bold text-white tracking-tight hidden sm:inline">Biz.AI</span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8 text-white/90 text-[14px] font-medium">
                        <Link to="/" className="hover:text-white transition-colors">멀티 에이전트 플랫폼</Link>
                        <Link to="/use-cases" className="text-white font-semibold transition-colors">고객 사례</Link>
                        <Link to="/news" className="hover:text-white transition-colors">새로운 소식</Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" className="hidden md:flex text-white/90 hover:text-white hover:bg-white/10">
                            kt ds <ExternalLink size={14} />
                        </Button>
                        <Button size="sm" className="hidden md:flex bg-white text-black hover:bg-white/90 px-4 py-2 rounded-md font-semibold font-pretendard">
                            AI Agent 스튜디오 <ExternalLink size={14} />
                        </Button>
                        <button className="lg:hidden text-white p-2 smooth-gpu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="lg:hidden absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl py-4 px-6 overflow-hidden border-b border-white/10"
                        >
                            <div className="flex flex-col gap-4">
                                <Link to="/" className="text-white/90 hover:text-white font-medium py-1" onClick={() => setIsMenuOpen(false)}>멀티 에이전트 플랫폼</Link>
                                <Link to="/use-cases" className="text-white font-bold py-1" onClick={() => setIsMenuOpen(false)}>고객 사례</Link>
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

            {/* Header */}
            <section className="pt-48 pb-16 px-6">
                <div className="max-w-[900px] mx-auto text-center flex flex-col items-center">
                    <div className="flex items-center gap-3 mb-6 text-white/50 text-[15px] font-medium tracking-wide">
                        <span>{item.category}</span>
                        <span className="text-xs">|</span>
                        <span>{item.date}</span>
                    </div>
                    <h1 className="text-[36px] md:text-[50px] font-bold text-white mb-10 leading-snug break-keep tracking-tight">
                        {item.title}
                    </h1>
                </div>
            </section>

            {/* Hero Image */}
            <div className="w-full px-0 sm:px-6 mb-24 max-w-[1200px] mx-auto">
                <div className="w-full aspect-[21/9] sm:aspect-[24/9] md:aspect-[2.5/1] overflow-hidden sm:rounded-[32px] bg-zinc-900 border border-white/5">
                    <img src={item.image} alt="Case Study Hero" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Main Content with Sticky ToC */}
            <main className="max-w-[1200px] mx-auto px-6 pb-48 flex flex-col lg:flex-row gap-20 relative">
                {/* Left: Article Content */}
                <div className="flex-1 lg:max-w-[840px]">
                    <article className="flex flex-col gap-24 font-pretendard">
                        {/* Section 1 */}
                        <section id="introduction" className="flex flex-col scroll-mt-32">
                            <h2 className="text-[32px] font-bold text-white mb-6 border-b-2 border-white/10 pb-4">
                                1. 고객사 소개 및 배경
                            </h2>
                            <div className="text-white/80 text-[18px] leading-relaxed mb-8 break-keep">
                                국내 대형 증권사 B 금융사는 매일 수천 건의 상품·리서치·약관·수수료 관련 문의에 대응하며, 내부적으로도 애널리스트 리포트·거래 데이터·리스크 지표 등 복수의 데이터 소스를 다룹니다. 그러나 다음과 같은 어려움이 고착화되어 있었습니다.
                            </div>

                            <div className="bg-white/5 rounded-3xl p-10 border border-white/5 mb-8">
                                <ul className="flex flex-col gap-6">
                                    <li className="flex items-start gap-4 text-white/90">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2.5 shrink-0" />
                                        <div className="text-[17px] font-medium leading-relaxed">
                                            <span className="font-bold text-blue-400">데이터 접근의 단절:</span> 리서치, 리테일, 준법·리스크 등 부서별 시스템이 분절되어 질의마다 전담자가 직접 검색/취합해야 했음
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4 text-white/90">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2.5 shrink-0" />
                                        <div className="text-[17px] font-medium leading-relaxed">
                                            <span className="font-bold text-blue-400">반복형 문의의 과부하:</span> 수수료·약관·상품 비교 등 유사 문의가 반복되어 콜 및 상담 대기 시간 증가
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4 text-white/90">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2.5 shrink-0" />
                                        <div className="text-[17px] font-medium leading-relaxed">
                                            <span className="font-bold text-blue-400">의사결정 리드타임 지연:</span> 주간 브리핑/보고서 초안 생성 시 데이터 추출·시각화·검증에 수일 소요
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="text-white/60 text-[17px] italic border-l-4 border-blue-500/30 pl-6 py-2">
                                B사는 "자연어로 질문 → 근거 데이터와 함께 즉시 설명과 차트로 답"하는 환경을 목표로, AI:ON-U 기반 지능형 검색 챗봇을 도입했습니다.
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section id="objective" className="scroll-mt-32">
                            <h2 className="text-[32px] font-bold text-white mb-6 border-b-2 border-white/10 pb-4">
                                2. 도입 목표
                            </h2>
                            <div className="text-white/80 text-[18px] leading-relaxed mb-10">
                                AI 기반 대화형 검색·분석 플랫폼 구축을 통해 다음을 달성:
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    "누구나 자연어로 사내 DB·문서 탐색, 표/차트 결과 자동 생성",
                                    "RAG 기반으로 금융사 고유 문서(약관·금융 가이드) 검색 정확도 확보",
                                    "민원·상담 응답 시간 단축 및 상담 품질의 표준화 실현",
                                    "데이터 기반 의사결정의 현업 확산 및 협업 속도 개선"
                                ].map((text, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                                        <div className="text-blue-500 shrink-0">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </div>
                                        <div className="text-[16px] text-white/90 font-medium">{text}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section 3 */}
                        <section id="solution" className="scroll-mt-32">
                            <h2 className="text-[32px] font-bold text-white mb-6 border-b-2 border-white/10 pb-4">
                                3. 솔루션: AI:ON-U 기반 지능형 검색 구조
                            </h2>
                            <div className="text-white/80 text-[18px] leading-relaxed mb-10">
                                AI:ON-U는 다음과 같은 5단계로 작동하여 최적의 답변을 도출합니다.
                            </div>

                            <div className="flex flex-col gap-6">
                                {[
                                    { step: "01", title: "자연어 질의 처리 (NLQ)", desc: "일상적인 문장으로 복잡한 금융 데이터 요청 가능 (예: '해외주식 수수료 변동 추이 보여줘')" },
                                    { step: "02", title: "SQL/검색 쿼리 자동 생성", desc: "SQL Generator Agent가 메타데이터를 활용해 자연어를 쿼리로 자동 변환" },
                                    { step: "03", title: "실시간 데이터 조회 및 시각화", desc: "API Gateway를 통해 조회된 데이터를 표, 그래프, 차트로 즉시 응답" },
                                    { step: "04", title: "인사이트 자동 생성", desc: "데이터 추이 분석 및 주요 변동 요인 요약 텍스트 자동 생성" },
                                    { step: "05", title: "출처 제시 및 연관 질문", desc: "근거 데이터 링크 제공 및 후속 탐색을 위한 연관 질문 추천" }
                                ].map((item, idx) => (
                                    <div key={idx} className="p-7 rounded-[24px] bg-white/[0.02] border border-white/10 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                                        <div className="flex flex-col gap-3 relative z-10">
                                            <div className="flex items-center gap-4 text-blue-400 text-[18px] font-bold">
                                                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-[13px]">{item.step}</div>
                                                {item.title}
                                            </div>
                                            <p className="text-white/60 text-[16px] leading-[1.6] pl-12">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section id="results" className="scroll-mt-32">
                            <h2 className="text-[32px] font-bold text-white mb-6 border-b-2 border-white/10 pb-4">
                                4. 기대 효과 및 결과
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                                <div className="flex flex-col gap-2 p-6 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="text-[14px] text-white/40 font-bold uppercase tracking-wider">상담 응답 시간</div>
                                    <div className="text-[36px] font-bold text-blue-400">80% <span className="text-[16px] text-white/60">단축</span></div>
                                    <p className="text-[14px] text-white/50 leading-relaxed">수일 소요 업무가 수분 내 단축</p>
                                </div>
                                <div className="flex flex-col gap-2 p-6 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="text-[14px] text-white/40 font-bold uppercase tracking-wider">리포트 작성</div>
                                    <div className="text-[36px] font-bold text-blue-400">30분 <span className="text-[16px] text-white/60">이내</span></div>
                                    <p className="text-[14px] text-white/50 leading-relaxed">기존 수일 걸리던 리드타임 혁신</p>
                                </div>
                                <div className="flex flex-col gap-2 p-6 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="text-[14px] text-white/40 font-bold uppercase tracking-wider">응대 품질</div>
                                    <div className="text-[36px] font-bold text-white">Full <span className="text-[16px] text-white/60">Standard</span></div>
                                    <p className="text-[14px] text-white/50 leading-relaxed">AI 답변을 통한 일관성 확보</p>
                                </div>
                            </div>
                        </section>
                    </article>
                </div>

                {/* Right: Sticky Table of Contents */}
                <aside className="hidden lg:block w-[240px] shrink-0">
                    <div className="sticky top-32 flex flex-col gap-6">
                        <div className="text-[14px] font-bold text-white/40 uppercase tracking-widest pl-4">Contents</div>
                        <nav className="flex flex-col border-l border-white/5">
                            {[
                                { id: "introduction", label: "고객사 소개 및 배경" },
                                { id: "objective", label: "도입 목표" },
                                { id: "solution", label: "솔루션 구조" },
                                { id: "results", label: "기대 효과 및 결과" }
                            ].map((nav) => (
                                <a
                                    key={nav.id}
                                    href={`#${nav.id}`}
                                    className={`py-3 pl-4 text-[15px] font-medium transition-all border-l-2 -ml-[1px] ${activeSection === nav.id
                                        ? "text-white border-blue-500"
                                        : "text-white/30 border-transparent hover:text-white/60"
                                        }`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById(nav.id)?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    {nav.label}
                                </a>
                            ))}
                        </nav>

                        <div className="mt-10 p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-4">
                            <h4 className="text-[16px] font-bold text-white break-keep">비슷한 과제를 겪고 계신가요?</h4>
                            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-11">상담 문의하기</Button>
                        </div>
                    </div>
                </aside>
            </main>

            {/* Footer */}
            <footer className="bg-[#0a0a0a] py-24 px-6 border-t border-white/5">
                <div className="max-w-[1200px] mx-auto text-center px-6 md:px-0">
                    <p className="text-white/40 text-[14px] font-medium leading-relaxed">
                        © 2026 kt ds. All rights reserved. <br />
                        본 페이지는 Biz.AI 시스템 데모를 위해 구성되었습니다.
                    </p>
                </div>
            </footer>
        </div>
    );
}
