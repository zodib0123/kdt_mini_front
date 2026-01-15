'use client';

import { useEffect } from 'react';
import { RotateCcw, AlertCircle } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Dashboard Error:', error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-100 p-6 bg-white border border-red-100 rounded-3xl shadow-sm">
            <div className="p-4 bg-red-50 rounded-full mb-4">
                <AlertCircle size={40} className="text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">데이터를 불러오지 못했습니다</h2>
            <p className="text-gray-500 text-center mb-6 max-w-md">
                서버와 통신 중 문제가 발생했거나 데이터를 분석하는 도중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
            </p>
            <button
                onClick={() => reset()} // 에러가 발생한 컴포넌트만 다시 렌더링 시도
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-blue-100"
            >
                <RotateCcw size={18} />
                다시 시도하기
            </button>
        </div>
    );
}