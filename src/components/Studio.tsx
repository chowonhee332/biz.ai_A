import { ChevronRight, Settings, Box, Rocket, BookOpen } from 'lucide-react';
import React from 'react';

const StudioCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="bg-[var(--color-surface)] p-10 rounded-[2rem] border border-[var(--color-outline)]/10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group flex flex-col items-center md:items-start text-center md:text-left">
    <div className="w-14 h-14 bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {React.cloneElement(icon as any, { size: 28 })}
    </div>
    <h4 className="text-xl font-bold text-[var(--color-on-surface)] mb-4">{title}</h4>
    <p className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed">{desc}</p>
  </div>
);

export default function Studio() {
  return (
    <section id="studio" className="py-24 px-6 bg-[var(--color-surface-variant)]/10">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-on-surface)] mb-10">AI Agent 스튜디오</h2>
        <p className="text-lg md:text-xl text-[var(--color-on-surface-variant)] mb-10 max-w-3xl mx-auto leading-relaxed">
          필요한 Agent, Tool, MCP를 빠르게 확인하고 시작하세요.<br className="hidden md:block" />
          쉽게 개발 가능한 AI 아키텍처와 Delivery 가이드를 제공합니다.
        </p>
        <button className="px-10 py-3 border border-[var(--color-outline)] rounded-full text-[var(--color-on-surface)] font-bold hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] hover:border-transparent hover:shadow-lg transition-all mb-20 flex items-center gap-2 mx-auto">
          더보기 <ChevronRight size={18} />
        </button>

        <div className="grid md:grid-cols-4 gap-8">
          <StudioCard icon={<Settings />} title="Agent 개발" desc="AI Agent 개발을 위한 통합 개발 환경과 도구를 제공합니다." />
          <StudioCard icon={<Box />} title="Core Agent" desc="사전 개발된 Core Agent를 활용하여 빠른 프로토타이핑이 가능합니다." />
          <StudioCard icon={<Rocket />} title="Use Case 패키징" desc="Use case 단위로 패키징된 솔루션을 통해 즉시 배포할 수 있습니다." />
          <StudioCard icon={<BookOpen />} title="Delivery 가이드" desc="AI 아키텍처 소개 및 배포 가이드를 통해 안정적인 운영을 지원합니다." />
        </div>
      </div>
    </section>
  );
}
