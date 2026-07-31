import React from 'react';

interface DashboardStatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  valueColor?: string;
  badge?: React.ReactNode;
}

export const DashboardStatCard: React.FC<DashboardStatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  valueColor = 'text-[#f4f6fa]',
  badge,
}) => {
  return (
    <div className="bg-[#0e1017] border border-[#1a1e2b] rounded-xl p-4 flex flex-col justify-between hover:border-[#2981eb]/40 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-[#9aa2b3]">{title}</span>
        <div className="p-2 rounded-lg bg-[#141824] text-[#2981eb] border border-[#212636]">
          {icon}
        </div>
      </div>
      <div>
        <div className={`text-xl font-bold font-mono ${valueColor}`}>{value}</div>
        {subtitle && <div className="text-[11px] text-[#5c6478] mt-1">{subtitle}</div>}
        {badge && <div className="mt-2">{badge}</div>}
      </div>
    </div>
  );
};
