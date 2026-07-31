import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TradesPaginationProps {
  currentPage: number;
  totalPages: number;
  startItem: number;
  endItem: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export const TradesPagination: React.FC<TradesPaginationProps> = ({
  currentPage,
  totalPages,
  startItem,
  endItem,
  totalItems,
  onPageChange,
}) => {
  return (
    <div className="px-5 py-3.5 border-t border-[#1a1e2b] flex items-center justify-between text-xs text-[#5c6478]">
      <div>
        Showing <span className="text-[#f4f6fa] font-mono font-medium">{startItem}</span> to{' '}
        <span className="text-[#f4f6fa] font-mono font-medium">{endItem}</span> of{' '}
        <span className="text-[#f4f6fa] font-mono font-medium">{totalItems}</span> trades
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded-lg border border-[#212636] bg-[#141824] text-[#f4f6fa] disabled:opacity-30 hover:bg-[#1a1f30] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="font-mono text-xs text-[#9aa2b3] px-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-1.5 rounded-lg border border-[#212636] bg-[#141824] text-[#f4f6fa] disabled:opacity-30 hover:bg-[#1a1f30] transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
