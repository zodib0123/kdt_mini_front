'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (newIdx: number) => {
        if (newIdx < 0 || newIdx >= totalPages) return;
        
        const params = new URLSearchParams(searchParams.toString());
        params.set("pageNo", String(newIdx));
        router.push(`/search?${params.toString()}`, { scroll: true });
    };

    const pageNumbers = useMemo(() => {
        const numbers = [];
        const start = Math.max(0, currentPage - 2);
        const end = Math.min(totalPages - 1, start + 4);
        const adjustedStart = Math.max(0, Math.min(start, totalPages - 5));
        
        for (let i = adjustedStart; i <= end; i++) {
            if (i >= 0) numbers.push(i);
        }
        return numbers;
    }, [currentPage, totalPages]);

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-12 mb-10">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="p-2 rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-all"
            >
                <ChevronLeft size={20} />
            </button>

            {pageNumbers.map((num) => (
                <button
                    key={num}
                    onClick={() => handlePageChange(num)}
                    className={`w-10 h-10 rounded-lg text-sm font-bold transition-all
                        ${currentPage === num
                            ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                            : "bg-white text-gray-600 border border-gray-100 hover:border-blue-300"
                        }`}
                >
                    {num + 1}
                </button>
            ))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="p-2 rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-all"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
}