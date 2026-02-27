import { ChevronRight, Monitor } from 'lucide-react';
import { motion } from 'motion/react';

const Tag = ({ text }: { text: string }) => (<span className="border border-[var(--color-primary)] text-[var(--color-primary)] text-xs px-4 py-1.5 rounded-full font-medium bg-[var(--color-primary-container)]/10">{text}</span>);

export default function UseCases() {
    return (
        <section id="use-cases" className="py-24 px-6 bg-[var(--color-surface)] border-b border-[var(--color-outline)]/10">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-24">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">솔루션/멀티 에이전트 Use Cases</h2>
                </div>

                <div className="space-y-40">
                    {/* Case 01: Works AI */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <p className="text-lg md:text-xl font-medium mb-12 text-center text-[var(--color-on-surface)] bg-[var(--color-surface-variant)] px-6 py-3 rounded-2xl">🧐 “회사에서 사용하는 수많은 메뉴를 사내 최적화하여, 한 곳에서 모아 볼 수는 없나요?”</p>
                        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
                            <div className="order-2 md:order-1">
                                <span className="text-[var(--color-primary)] font-bold text-sm mb-2 block">기업의 모든 것을 한 곳에서</span>
                                <div className="flex items-center gap-2 mb-6">
                                    <h3 className="text-3xl font-bold text-[var(--color-on-surface)]">AI Portal</h3>
                                    <span className="text-3xl font-light text-[var(--color-outline)] ml-1">Works AI</span>
                                    <ChevronRight className="text-[var(--color-outline)] ml-1" size={24} />
                                </div>
                                <p className="text-[var(--color-on-surface-variant)] mb-8 leading-relaxed">
                                    AI 챗봇 기반으로 다양한 업무 처리를 지원하는 AI Agent 포털 서비스로 기업 전체 AI 서비스를 통합 관리하고 접근할 수 있는 중앙 플랫폼입니다.
                                </p>
                                <ul className="space-y-4 mb-10 text-[var(--color-on-surface-variant)]">
                                    <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] mt-2"></div><span>기본적인 업무 기반에 최적화된 AI Agent 제공</span></li>
                                    <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] mt-2"></div><span>업무에 필요한 에이전트를 직접 만들어 사내 공유/활용</span></li>
                                    <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] mt-2"></div><span>그룹웨어 위젯 및 메뉴 커스텀을 통해 개인 맞춤형 컨텐츠 제공</span></li>
                                </ul>
                                <div className="flex flex-wrap gap-2">
                                    <Tag text="AI 비서+그룹웨어" />
                                    <Tag text="맞춤형" />
                                    <Tag text="사내 데이터 연동" />
                                </div>
                            </div>
                            <div className="order-1 md:order-2 bg-[var(--color-surface-variant)] rounded-[2rem] p-4 shadow-inner border border-[var(--color-outline)]/10 h-64 md:h-96 flex items-center justify-center text-[var(--color-on-surface-variant)] italic">
                                {/* Placeholder for image */}
                                <div className="text-center opacity-50">Image Placeholder</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Case 02: Audit Agent */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <p className="text-lg md:text-xl font-medium mb-12 text-center text-[var(--color-on-surface)] bg-[var(--color-surface-variant)] px-6 py-3 rounded-2xl italic">😭 “(국정)감사에 필요한 방대한 자료를 한 번에 분석해서 보고 싶어요”</p>
                        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
                            <div className="bg-[var(--color-surface-variant)] rounded-[2rem] p-4 shadow-inner border border-[var(--color-outline)]/10 h-64 md:h-96 flex items-center justify-center text-[var(--color-on-surface-variant)] italic">
                                {/* Placeholder for image */}
                                <div className="text-center opacity-50">Image Placeholder</div>
                            </div>
                            <div className="pl-4">
                                <span className="text-[var(--color-primary)] font-bold text-sm mb-2 block leading-relaxed">복잡한 국정감사 / 컴플라이언스(Compliance)를 최단 기간에</span>
                                <div className="flex items-center gap-2 mb-6">
                                    <h3 className="text-4xl font-bold text-[var(--color-on-surface)] tracking-tight">Audit Agent</h3>
                                    <ChevronRight className="text-[var(--color-outline)] ml-1" size={24} />
                                </div>
                                <p className="text-[var(--color-on-surface-variant)] mb-8 leading-relaxed">
                                    국정감사 / 컴플라이언스 관련 방대한 자료를 분석하고 필요한 정보를 빠르게 찾아냅니다.
                                </p>
                                <ul className="space-y-4 text-[var(--color-on-surface-variant)]">
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></div><span>대량 문서 자동 분석</span></li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></div><span>주요 이슈 및 키워드 추출</span></li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></div><span>관련 자료 연결 및 검색</span></li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></div><span>답변 자료 자동 생성</span></li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* Case 03: 지능형 회의록 Agent */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <div className="grid md:grid-cols-2 gap-12 items-center w-full mt-12">
                            <div className="pr-4">
                                <span className="text-[var(--color-primary)] font-bold text-sm mb-2 block">성능, 편의성, 보안을 모두 갖춘</span>
                                <div className="flex items-center gap-2 mb-6">
                                    <h3 className="text-4xl font-bold text-[var(--color-on-surface)] tracking-tight">지능형 회의록 Agent</h3>
                                    <ChevronRight className="text-[var(--color-outline)] ml-1" size={24} />
                                </div>
                                <p className="text-[var(--color-on-surface-variant)] mb-8 leading-relaxed">
                                    회의의 시작부터 끝까지, AI가 알아서 기록하고 정리하는 통합 회의 솔루션입니다.
                                </p>
                                <ul className="space-y-4 text-[var(--color-on-surface-variant)] mb-10">
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></div><span>실시간 음성 인식 및 텍스트 변환</span></li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></div><span>자동 요약 및 액션 아이템 추출</span></li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></div><span>참석자별 발언 구분</span></li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></div><span>다국어 회의 지원</span></li>
                                </ul>
                            </div>
                            <div className="relative flex justify-center items-center">
                                <div className="bg-[var(--color-surface-variant)] rounded-[2rem] p-4 shadow-inner border border-[var(--color-outline)]/10 w-full h-64 md:h-96 flex flex-col items-center justify-center">
                                    <Monitor size={80} className="text-[var(--color-outline)] mb-4" />
                                    <div className="text-[var(--color-on-surface-variant)] italic text-sm text-center px-10"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
