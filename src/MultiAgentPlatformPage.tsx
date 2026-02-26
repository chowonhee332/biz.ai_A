import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ExternalLink, ChevronRight, PlayCircle, Download, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function MultiAgentPlatformPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Codebox");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sidebarItems = [
        "AI Portal",
        "AI 회의록",
        "AI:ON-U",
        "Codebox",
        "Beast AI Gateway",
        "CloudWiz"
    ];

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
                        <Link to="/platform" className="text-white font-semibold transition-colors">멀티 에이전트 플랫폼</Link>
                        <Link to="/use-cases" className="hover:text-white transition-colors">고객 사례</Link>
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
                                <Link to="/platform" className="text-white font-bold py-1" onClick={() => setIsMenuOpen(false)}>멀티 에이전트 플랫폼</Link>
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

            {/* Content Body */}
            <section className="pt-48 pb-32 flex-1">
                {/* Header Section */}
                <div className="max-w-[1200px] mx-auto mb-20 px-6 lg:px-0">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-[58px] font-bold bg-gradient-to-r from-white via-white via-[40%] to-[#93C5FD] bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                            Multi-Agent Platform
                        </h1>
                        <p className="text-white/70 text-[18px] max-w-2xl font-medium leading-relaxed">
                            Biz.AI의 멀티 에이전트 플랫폼은 각 산업 분야에 최적화된 전문 AI 에이전트들을 통해 비즈니스 혁신을 지원합니다.
                        </p>
                    </motion.div>
                </div>

                {/* Grid Layout: Sidebar + Main Content */}
                <div className="max-w-[1200px] mx-auto px-6 lg:px-0">
                    <div className="flex flex-col lg:flex-row gap-20">
                        {/* Sidebar (LNB) */}
                        <aside className="lg:w-[220px] shrink-0">
                            <ul className="flex flex-col gap-8 sticky top-[100px] border-l border-white/5 py-2">
                                {sidebarItems.map((item) => (
                                    <li key={item}>
                                        <button
                                            onClick={() => setActiveTab(item)}
                                            className={`pl-8 relative text-[18px] font-bold transition-all text-left w-full ${activeTab === item ? "text-white" : "text-white/30 hover:text-white/60"}`}
                                        >
                                            {activeTab === item && <div className="absolute left-[-1.5px] top-0 bottom-0 w-[3px] bg-[#3B82F6] rounded-full" />}
                                            {item}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </aside>

                        {/* Main Content Area */}
                        <main className="flex-1 min-w-0">
                            <div className="flex-1 min-w-0">
                                {/* Title & Top Description */}
                                <div className="mb-12">
                                    <h2 className="text-[36px] font-bold text-white mb-6">폐쇄망 설치형 AI 코드 개발 어플라이언스 'CODEBOX'</h2>
                                    <div className="space-y-4 text-white/60 text-[16px] leading-relaxed break-keep">
                                        <p>내부망에서 작동하는 코드 생성형 AI봇, LLM 기반 멀티 에이전트 인터페이스 솔루션입니다.</p>
                                        <p>본 서비스는 폐쇄망 환경에서도 실시간 코드 개발을 지원하며 믿을 수 있는 설치형 보안 솔루션입니다.</p>
                                        <p>저렴한 GPU 기반 서버 + 저비용 어플라이언스 + 전용 LLM을 탑재하여 낮은 비용으로 최고의 생산성을 경험하게 해드립니다.</p>
                                    </div>
                                </div>

                                {/* 주요 고객군 */}
                                <div className="mb-12">
                                    <h3 className="text-[14px] font-bold text-[#0885FE] mb-4 tracking-wider uppercase">주요 고객군</h3>
                                    <p className="text-white/80 text-[16px] font-medium leading-relaxed">보안 규제가 강하거나 내부 AI 개발 환경 구축이 필요한 금융·공공·의료·방위 기관</p>
                                </div>

                                {/* 핵심가치 Grid */}
                                <div className="mb-12">
                                    <h3 className="text-[14px] font-bold text-[#0885FE] mb-6 tracking-wider uppercase">핵심가치</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {[
                                            { title: "보안 준수", desc: "폐쇄망 내 설치로 코드 유출 걱정 무" },
                                            { title: "개발 생산성 향상", desc: "코드 작성, 분석, 테스트 자동화로 프로젝트 가속화" },
                                            { title: "경제적 비용 확보", desc: "낮은 비용의 운영 인프라 구축 지원" }
                                        ].map((item, i) => (
                                            <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/5">
                                                <h4 className="text-[15px] font-bold text-white mb-2">{item.title}</h4>
                                                <p className="text-white/40 text-[13px] leading-snug">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 주요 기능 List */}
                                <div className="mb-12">
                                    <h3 className="text-[14px] font-bold text-[#0885FE] mb-6 tracking-wider uppercase">주요기능</h3>
                                    <div className="bg-white/5 rounded-2xl p-8 border border-white/5 space-y-4">
                                        {[
                                            "코드 자동 생성: 고품질 코드 생성 및 자동 완성 지원",
                                            "코드 분석/최적화: 코드 리펙토링 제안 및 분석 보고서 자동 생성",
                                            "코드 문서화 생성: 스스로 라이브러리/코멘트 추가 기능",
                                            "전용 LLM 지원: 보안 특화 Fine-Tuned 전용 모델 사용",
                                            "IDE 연동: 사용중인 개발 플러그인 연동 실시간 개발 보조",
                                            "자산 보안 보존: 모든 코드·지적재산은 조직 내 설치된 장치 내에만 저장"
                                        ].map((feature, i) => (
                                            <div key={i} className="flex gap-4 text-white/60 text-[15px]">
                                                <span className="text-white/30 shrink-0">›</span>
                                                <span className="break-keep">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 특장점 (Pink Background Section) */}
                                <div className="mb-12">
                                    <h3 className="text-[14px] font-bold text-[#0885FE] mb-6 tracking-wider uppercase">특장점</h3>
                                    <div className="bg-[#0885FE]/5 rounded-2xl p-8 border border-[#0885FE]/10 space-y-10">
                                        {[
                                            { title: "1) 폐쇄망 특화 설치형 패키지", desc: "GPU 기반 Workstation 또는 Server 형태로 기업 내부 직접 설치되어 외부 연결 없이 보호할 수 있습니다.\n공공·국방·금융 등 보안 문제가 민감한 환경의 AI 개발을 선도적으로 돕습니다." },
                                            { title: "2) AI 개발 에이전트 일체 내장", desc: "Code Assistant, Data Analyst 등 특화 Agent를 기본 탑재하고 있습니다.\n복잡한 설치 과정 없이 바로 사용 가능한 통합형 Appliance입니다." },
                                            { title: "3) 코드 전용 LLM 내장", desc: "KT DS Fine-Tuned 전문 모델로 오픈소스 대비 약 5배 하이 성능을 지원합니다.\n기업 내부 데이터를 바탕으로 맞춤 코드 가이드를 제시하여 분석 품질을 높였습니다." },
                                            { title: "4) AI 가공 품질·거버넌스 형성", desc: "코드 작성 표준 준수 여부 자동 분석, 가상 가이드를 매뉴얼화 하여 품질을 관리합니다.\n신규 개발자의 코드 적응을 빠르게 도와 조직의 자산화 흐름 유지를 지원합니다." },
                                            { title: "5) 환경 제약 최소화", desc: "클라우드 인프라 활용이 불가한 기업도 자체 서버만으로 AI 개발 생산성을 확보할 수 있습니다." }
                                        ].map((item, i) => (
                                            <div key={i}>
                                                <h4 className="text-[17px] font-bold text-white mb-3">{item.title}</h4>
                                                <p className="text-white/50 text-[15px] leading-relaxed whitespace-pre-line break-keep">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 이렇게 활용하세요 */}
                                <div className="mb-12">
                                    <h3 className="text-[14px] font-bold text-[#0885FE] mb-6 tracking-wider uppercase">이렇게 활용하세요</h3>
                                    <div className="space-y-4">
                                        {[
                                            { title: "보안이 중요한 프로젝트에서 AI 코딩 도구를 내부망에 사용하고 싶으신 경우", desc: "폐쇄망 환경에서의 AI 코드 생성 및 분석 지원" },
                                            { title: "공공 또는 금융 프로젝트에서 코드 품질 보장을 위한 규제 관리가 필요한 경우", desc: "표준 가이드 기반 코드 가공 및 리뷰 관리" },
                                            { title: "개발팀 생산성을 높이면서도 IT 자산 유출을 최소화해야 하는 경우", desc: "보안된 환경에서의 신규 개발 지원 자동화" }
                                        ].map((item, i) => (
                                            <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                                <h4 className="text-[16px] font-bold text-white mb-2 break-keep">{item.title}</h4>
                                                <p className="text-white/40 text-[14px] flex items-center gap-2">
                                                    <span className="text-[#0885FE]">›</span> {item.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 고객사례 */}
                                <div className="mb-12">
                                    <h3 className="text-[14px] font-bold text-[#0885FE] mb-6 tracking-wider uppercase">고객사례</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            {
                                                company: "S사 금융지능팀 성공 금융 AI/POC 진행",
                                                industry: "공공·금융기관",
                                                challenge: "데이터 외부 유출 보전 이슈",
                                                solution: "폐쇄형 서버에 AI봇 구축 + 코드 자동 생성",
                                                benefit: "연구 개발 가속",
                                                result: "코드 완성까지의 생성 시간을 기존 대비 30% 감소",
                                                icon: "🏢"
                                            },
                                            {
                                                company: "중앙부처 B",
                                                industry: "공공",
                                                challenge: "코드 품질 표준화 및 보안 감사 대비 부족",
                                                solution: "CodeBox의 내부 자산 전담 코드 관리 지원",
                                                benefit: "품질 보증",
                                                result: "코드 리뷰 시간 60% 단축, 품질 표준성 확보",
                                                icon: "🏛️"
                                            }
                                        ].map((item, i) => (
                                            <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="size-10 bg-white/10 rounded-lg flex items-center justify-center text-[20px]">{item.icon}</div>
                                                    <div>
                                                        <h4 className="text-[15px] font-bold text-white leading-tight">{item.company}</h4>
                                                        <p className="text-white/40 text-[12px]">{item.industry}</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="text-[13px]">
                                                        <p className="text-white/30 mb-1">Challenge</p>
                                                        <p className="text-white/60">{item.challenge}</p>
                                                    </div>
                                                    <div className="text-[13px]">
                                                        <p className="text-white/30 mb-1">Solution</p>
                                                        <p className="text-white/60">{item.solution}</p>
                                                    </div>
                                                    <div className="text-[13px]">
                                                        <p className="text-[#0885FE] font-bold mb-1">Result</p>
                                                        <p className="text-[#0885FE] font-bold">{item.result}</p>
                                                    </div>
                                                </div>
                                                <button className="mt-4 text-white/40 text-[12px] flex items-center gap-1 hover:text-white transition-all">자세히 보기 <ChevronRight size={12} /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 소개동영상 (Video Placeholder) */}
                                <div className="mb-12">
                                    <h3 className="text-[14px] font-bold text-[#0885FE] mb-6 tracking-wider uppercase">소개동영상</h3>
                                    <div className="relative aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-white/5 group cursor-pointer">
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-4 bg-black/60 opacity-100 group-hover:bg-black/40 transition-all">
                                            <PlayCircle size={64} className="text-white/60 group-hover:text-white group-hover:scale-110 transition-all" />
                                            <div>
                                                <p className="text-white font-bold text-[18px]">Codebox 소개 영상</p>
                                                <p className="text-white/40 text-[14px]">준비중입니다...</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 요금제 */}
                                <div className="mb-12">
                                    <h3 className="text-[14px] font-bold text-[#0885FE] mb-6 tracking-wider uppercase">요금제</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { name: "CodeBox Standard", price: "Workstation GPU 탑재 + 전용 LLM" },
                                            { name: "CodeBox Enterprise", price: "Server급 GPU 탑재 + 커스텀 LLM + 전문가 지원" }
                                        ].map((plan, i) => (
                                            <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/5 hover:border-[#0885FE]/30 transition-all cursor-pointer group">
                                                <h4 className="text-[16px] font-bold text-white mb-2 group-hover:text-[#0885FE] transition-colors uppercase">{plan.name}</h4>
                                                <p className="text-white/40 text-[13px] mb-4">{plan.price}</p>
                                                <button className="text-[#0885FE] text-[13px] font-bold flex items-center gap-1">자세히 보기 <ChevronRight size={12} /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 제품 상세 문의 */}
                                <div className="mb-12">
                                    <h3 className="text-[14px] font-bold text-[#0885FE] mb-6 tracking-wider uppercase">제품 상세 문의</h3>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="flex-1 bg-white/5 rounded-xl p-4 border border-white/5 flex items-center justify-center gap-3 text-white/60 text-[14px]">
                                            <span className="text-[18px]">📧</span> codebox@ktds.com
                                        </div>
                                        <div className="flex-1 bg-white/5 rounded-xl p-4 border border-white/5 flex items-center justify-center gap-3 text-white/60 text-[14px]">
                                            <span className="text-[18px]">📞</span> 02-822-7272
                                        </div>
                                    </div>
                                </div>

                                {/* 관련 리소스 */}
                                <div className="mb-12">
                                    <h3 className="text-[14px] font-bold text-[#0885FE] mb-6 tracking-wider uppercase">관련 리소스</h3>
                                    <div className="space-y-3">
                                        {[
                                            { name: "CodeBox 제품 브로셔", size: "PDF" },
                                            { name: "폐쇄형 환경 구축 가이드", size: "PDF" }
                                        ].map((res, i) => (
                                            <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 bg-white/5 rounded-lg flex items-center justify-center"><Download size={16} className="text-white/40" /></div>
                                                    <span className="text-white/80 text-[14px] font-medium">{res.name}</span>
                                                    <span className="text-white/20 text-[12px]">{res.size}</span>
                                                </div>
                                                <ChevronRight size={16} className="text-white/10 group-hover:text-white/40 transition-all" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0a0a0a] border-t border-white/5 py-12 px-6">
                <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="flex flex-col gap-6">
                        <Link to="/" className="flex items-center gap-2">
                            <img src="/bizai_logo.png" alt="Biz.AI Logo" className="h-6 w-auto" />
                            <span className="text-xl font-bold text-white tracking-tight">Biz.AI</span>
                        </Link>
                        <p className="text-white/40 text-sm max-w-sm leading-relaxed font-pretendard">
                            kt ds의 Biz.AI는 기업 환경에 최적화된 안전하고 효율적인<br />AI 에이전트 구축 플랫폼을 제공합니다.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-all group border border-white/5">
                                <Linkedin className="w-5 h-5 text-white/40 group-hover:text-white" />
                            </a>
                            <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-all group border border-white/5">
                                <Youtube className="w-5 h-5 text-white/40 group-hover:text-white" />
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
                        <div className="flex flex-col gap-4">
                            <h4 className="text-white font-bold text-[14px] font-pretendard uppercase tracking-wider mb-2">Platform</h4>
                            <Link to="/platform" className="text-white/40 hover:text-white text-[13px] transition-colors font-pretendard">멀티 에이전트 플랫폼</Link>
                            <Link to="/news" className="text-white/40 hover:text-white text-[13px] transition-colors font-pretendard">새로운 소식</Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="text-white font-bold text-[14px] font-pretendard uppercase tracking-wider mb-2">Company</h4>
                            <a href="#" className="text-white/40 hover:text-white text-[13px] transition-colors font-pretendard">제품 소개서</a>
                            <Link to="/use-cases" className="text-white/40 hover:text-white text-[13px] transition-colors font-pretendard">고객 사례</Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="text-white font-bold text-[14px] font-pretendard uppercase tracking-wider mb-2">Legal</h4>
                            <a href="#" className="text-white/40 hover:text-white text-[13px] transition-colors font-pretendard">개인정보처리방침</a>
                            <a href="#" className="text-white/40 hover:text-white text-[13px] transition-colors font-pretendard">이용약관</a>
                        </div>
                    </div>
                </div>
                <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/20 text-xs font-pretendard">
                        © 2026 kt ds Inc. All rights reserved.
                    </p>
                    <p className="text-white/20 text-xs font-pretendard">
                        Contact: bizai@ktds.com | 02-1234-5678
                    </p>
                </div>
            </footer>
        </div>
    );
}
