import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Linkedin, Youtube } from 'lucide-react';

export default function UseCasePage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
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
                        <Link to="/platform" className="hover:text-white transition-colors">멀티 에이전트 플랫폼</Link>
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

            {/* Content Body */}
            <section className="pt-48 pb-32 flex-1">
                {/* Header Section */}
                <div className="max-w-[1200px] mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-[58px] font-bold bg-gradient-to-r from-white via-white via-[40%] to-[#93C5FD] bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                            Use Cases
                        </h1>
                        <p className="text-white/70 text-[18px] max-w-2xl font-medium leading-relaxed">
                            다양한 산업 분야에서 Biz.AI를 통해 실현된 혁신 사례를 소개합니다.
                        </p>
                    </motion.div>
                </div>

                {/* Case Grid Section */}
                <div className="max-w-[1200px] mx-auto">
                    {/* Category Filter - Sticky */}
                    <div className="sticky top-[64px] bg-[#0a0a0a] z-40 flex items-center gap-8 mb-16 border-b border-white/5 py-4 overflow-x-auto no-scrollbar whitespace-nowrap">
                        {["All", "데이터 분석", "보고 / 의사결정 향상", "리스크 관리 효율화", "강력한 보안", "내부 업무 처리 향상"].map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`text-[18px] font-bold transition-colors shrink-0 ${activeCategory === category ? "text-white" : "text-white/30 hover:text-white/60"}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Card Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[
                            {
                                title: "공공·기업용 AI Gateway 구축",
                                industry: "공공/기업",
                                tag: "Beast AI Gateway",
                                category: "강력한 보안",
                                image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
                                date: "Feb 2026",
                                desc: "전사 AI 활용을 단일 게이트웨이로 통합하고, AI 사용 비용 30~50% 절감 및 민감정보 유출 위험을 제로 수준으로 감소시켰습니다."
                            },
                            {
                                title: "국정감사 AI Agent 구축",
                                industry: "공공",
                                tag: "감사 대응 Agent",
                                category: "내부 업무 처리 향상",
                                image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
                                date: "Jan 2026",
                                desc: "답변서 생성 시간 80% 단축, 문서 탐색 시간 90% 단축으로 국정감사 대응의 속도·정확도·품질을 혁신했습니다."
                            },
                            {
                                title: "공공기관 데이터 분석 챗봇 구축",
                                industry: "공공기관",
                                tag: "AI:ON-U",
                                category: "데이터 분석",
                                image: "https://images.unsplash.com/photo-1504868584819-f8e8b496d74b?auto=format&fit=crop&q=80&w=800",
                                date: "Jan 2026",
                                desc: "자연어 기반 데이터 분석 플랫폼으로 민원 처리 시간 80% 단축, 보고서 작성 시간을 3일에서 30분으로 혁신했습니다."
                            },
                            {
                                title: "AI 회의록 구축 사례",
                                industry: "기업",
                                tag: "AI 회의록",
                                category: "내부 업무 처리 향상",
                                image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800",
                                date: "Dec 2025",
                                desc: "화자 분리와 겹침 발화 처리로 회의록 작성 시간 85% 단축, 온프레미스 보안으로 회의 생산성의 기준을 바꿨습니다."
                            },
                            {
                                title: "Works AI 도입 사례",
                                industry: "기업",
                                tag: "Works AI",
                                category: "보고 / 의사결정 향상",
                                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
                                date: "Nov 2025",
                                desc: "사내 AI Agent Portal로 업무 처리 클릭 수 대폭 감소, CSAT 40% 향상, 전사 업무 혁신을 실현했습니다."
                            },
                            {
                                title: "Cloud TR 엔지니어링 솔루션 적용 사례",
                                industry: "통신·ICT",
                                tag: "Codebox",
                                category: "데이터 분석",
                                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
                                date: "Oct 2025",
                                desc: "대규모 레거시 전환 공수 48% 절감, 전환율 100% 달성으로 Cloud 전환 경쟁력을 강화했습니다."
                            },
                            {
                                title: "CloudWiz 멀티클라우드 운영혁신 사례",
                                industry: "제조",
                                tag: "Cloudwiz",
                                category: "강력한 보안",
                                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
                                date: "Sep 2025",
                                desc: "멀티클라우드 비용 30% 절감, 운영 생산성 2배 향상으로 비용·보안·운영 자동화를 실현했습니다."
                            },
                            {
                                title: "AI:ON-U 지능형 검색 챗봇 구축",
                                industry: "금융",
                                tag: "AI:ON-U",
                                category: "데이터 분석",
                                image: "https://images.unsplash.com/photo-1551288049-bbda38a10ad1?auto=format&fit=crop&q=80&w=800",
                                date: "Aug 2025",
                                desc: "상담 응답 시간 80% 단축, 리포트 리드타임 수일에서 30분으로 혁신한 금융 지능형 검색 플랫폼입니다."
                            }
                        ].filter(item => activeCategory === "All" || item.category === activeCategory).map((item, i) => (
                            <motion.div
                                key={i}
                                onClick={() => navigate(`/use-cases/${i + 1}`, { state: { news: item } })}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, duration: 0.5 }}
                                className="group cursor-pointer flex flex-col"
                            >
                                <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 bg-zinc-900 border border-white/5">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="text-blue-500 text-[15px] font-medium transition-colors">
                                        {item.industry}
                                    </span>
                                    <h3 className="text-white text-[22px] font-bold leading-tight group-hover:text-blue-400 transition-colors whitespace-pre-line">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/50 text-[15px] leading-relaxed line-clamp-2">
                                        {item.desc}
                                    </p>
                                    <div className="mt-1">
                                        <span className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[13px] font-bold text-blue-400 inline-block">
                                            {item.tag}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0a0a0a] py-32 border-t border-white/5">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-24 px-6 md:px-0">
                        <div className="flex flex-col">
                            <div className="mb-8">
                                <h4 className="text-[22px] font-bold text-white tracking-tight">kt ds</h4>
                            </div>
                            <p className="text-white/80 text-[16px] leading-relaxed mb-10 break-keep font-medium">
                                비즈니스를 위한 엔터프라이즈급<br />
                                AI Agent 플랫폼
                            </p>
                            <div className="flex gap-4 mt-auto">
                                <a href="#" className="text-white/40 hover:text-white transition-all"><Linkedin size={22} strokeWidth={1.5} /></a>
                                <a href="#" className="text-white/40 hover:text-white transition-all"><Youtube size={22} strokeWidth={1.5} /></a>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h4 className="text-white font-bold text-[16px]">Solutions</h4>
                            <div className="flex flex-col gap-4 text-white/60 text-[15px]">
                                <a href="#" className="hover:text-white transition-colors">AI Agent Builder</a>
                                <a href="#" className="hover:text-white transition-colors">Enterprise RAG</a>
                                <a href="#" className="hover:text-white transition-colors">Multi-Agent System</a>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h4 className="text-white font-bold text-[16px]">Product</h4>
                            <div className="flex flex-col gap-4 text-white/60 text-[15px]">
                                <a href="#" className="hover:text-white transition-colors">Features</a>
                                <a href="#" className="hover:text-white transition-colors">Pricing</a>
                                <a href="#" className="hover:text-white transition-colors">Case Studies</a>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h4 className="text-white font-bold text-[16px]">Company</h4>
                            <div className="flex flex-col gap-4 text-white/60 text-[15px]">
                                <a href="#" className="hover:text-white transition-colors">About</a>
                                <a href="#" className="hover:text-white transition-colors">Blog</a>
                                <a href="#" className="hover:text-white transition-colors">Contact</a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-4 px-6 md:px-0">
                        <p className="text-white/40 text-[14px]">© 2026 kt ds. All rights reserved.</p>
                        <div className="flex items-center gap-6 text-white/40 text-[14px]">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
