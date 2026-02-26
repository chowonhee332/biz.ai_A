import { useState, useEffect } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'motion/react';

export default function NewsDetailPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const news = location.state?.news || {
        title: "카카오, '사이좋은 AI 포럼' 통해 미래세대 위한 AI 시민성 교육 담론 주도",
        date: "2026년 02월 25일",
        tag: "뉴스",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2500"
    };

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-pretendard flex flex-col">
            {/* GNB (Header) */}
            <nav className="fixed w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl py-4 px-6 md:px-10 border-b border-white/5">
                <div className="max-w-[1200px] mx-auto flex justify-between items-center px-6 md:px-0">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <img src="/bizai_logo.png" alt="Biz.AI Logo" className="h-6 w-auto" />
                        <span className="text-xl font-bold text-white tracking-tight hidden sm:inline">Biz.AI</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8 text-white/90 text-[14px] font-medium">
                        <Link to="/" className="hover:text-white transition-colors">멀티 에이전트 플랫폼</Link>
                        <Link to="/use-cases" className="hover:text-white transition-colors">고객 사례</Link>
                        <Link to="/news" className="text-white font-semibold">새로운 소식</Link>
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
                            className="lg:hidden absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl py-4 px-6 overflow-hidden border-b border-white/10"
                        >
                            <div className="flex flex-col gap-4">
                                <Link to="/" className="text-white/90 hover:text-white font-medium py-1" onClick={() => setIsMenuOpen(false)}>멀티 에이전트 플랫폼</Link>
                                <Link to="/use-cases" className="text-white/90 hover:text-white font-medium py-1" onClick={() => setIsMenuOpen(false)}>고객 사례</Link>
                                <Link to="/news" className="text-white font-semibold py-1" onClick={() => setIsMenuOpen(false)}>새로운 소식</Link>
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

            {/* 1. News Detail Header (Article Title Info) */}
            <section className="pt-48 pb-16 px-6">
                <div className="max-w-[900px] mx-auto text-center flex flex-col items-center">
                    {/* Category & Date */}
                    <div className="flex items-center gap-3 mb-6 text-white/50 text-[15px] font-medium tracking-wide">
                        <span>{news.tag}</span>
                        <span className="text-xs">|</span>
                        <span>{news.date}</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-[36px] md:text-[50px] font-bold text-white mb-10 leading-snug break-keep tracking-tight">
                        {news.title}
                    </h1>
                </div>
            </section>

            {/* 2. Hero Image */}
            <div className="w-full px-0 sm:px-6 mb-20 max-w-[1400px] mx-auto">
                <div className="w-full aspect-[21/9] sm:aspect-[24/9] md:aspect-[2.5/1] overflow-hidden sm:rounded-[32px] bg-zinc-900 border border-white/5">
                    <img
                        src={news.image}
                        alt="Event Detail"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* 3. Main Article Content */}
            <main className="max-w-[800px] mx-auto px-6 pb-32 flex-1">
                <article className="prose prose-invert prose-lg max-w-none prose-p:text-white/80 prose-p:leading-[1.8] prose-p:font-medium text-[17px] md:text-[19px]">
                    <p className="mb-8">
                        Biz.AI는 기업의 AI 에이전트 도입을 돕기 위해 진행된 첫 번째 대규모 밋업 행사를 서울 코엑스에서 성공적으로 개최했다고 밝혔다. 이번 행사는 금융, 제조, 공공 등 다양한 산업군의 디지털 전환(DX) 담당자 및 개발자 약 500여 명이 참석한 가운데 뜨거운 관심 속에 진행되었다.
                    </p>
                    <p className="mb-8">
                        이날 기조연설에 나선 Biz.AI 대표이사 조원희는 "지금은 단일 AI 모델의 성능을 넘어, 여러 AI 에이전트가 협력하며 실제 비즈니스 가치를 창출하는 Multi-Agent 시대"라며 "Biz.AI 플랫폼은 복잡한 기업 환경에서도 빠르고 안전하게 에이전트를 구성하고 배포할 수 있는 최적의 솔루션을 제공한다"고 강조했다.
                    </p>
                    <h3 className="text-white text-[28px] font-bold mt-16 mb-6">차세대 AI 에이전트 빌더, AI:ON-U 시연</h3>
                    <p className="mb-8">
                        행사의 가장 큰 주목을 받은 세션은 하반기 정식 출시되는 'AI:ON-U' 플랫폼의 라이브 시연이었다. 코딩 지식이 없는 현업 실무자도 단 3분 만에 사내 규정 문서와 실시간 데이터에 접근하는 맞춤형 AI 비서를 생성하는 과정이 공개되며 참석자들의 탄성을 자아냈다.
                    </p>
                    <p className="mb-8">
                        특히, 환각(Hallucination) 현상을 최소화하기 위한 자체 RAG(검색 증강 생성) 최적화 기술과, 기업의 민감 데이터를 완벽히 보호하는 온프레미스/프라이빗 클라우드 지원 아키텍처는 보수적인 금융 및 공공 부문 담당자들에게 큰 호응을 얻었다.
                    </p>
                    <div className="my-14 border-l-4 border-blue-500 pl-6 py-2 bg-white/5 rounded-r-2xl">
                        <p className="text-white text-[20px] font-bold leading-relaxed mb-0">
                            "AI:ON-U는 단순히 똑똑한 챗봇이 아닙니다. 회사의 ERP, 그룹웨어와 연동되어 직접 결재를 기안하고 리포트를 작성하는 '진짜 일하는 동료'가 될 것입니다."
                        </p>
                    </div>
                    <p className="mb-8">
                        Biz.AI는 이번 밋업을 시작으로 매 분기 정기적인 기술 세미나와 파트너스 데이를 개최하여, 국내 멀티 에이전트 생태계 확장에 적극적으로 나설 계획이다.
                    </p>
                </article>
            </main>

            {/* Footer */}
            <footer className="bg-[#0a0a0a] py-24 px-6 border-t border-white/5">
                <div className="max-w-[1200px] mx-auto text-center">
                    <p className="text-white/40 text-[14px] font-medium leading-relaxed">
                        © 2026 kt ds. All rights reserved. <br />
                        본 페이지는 Biz.AI 시스템 데모를 위해 구성되었습니다.
                    </p>
                </div>
            </footer>
        </div>
    );
}
