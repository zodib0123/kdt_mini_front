'use client';

import { useState, useEffect, useTransition } from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateAnalysis } from '../actions';

export default function GeminiAnalysis({ city, provinceData }: { city: string, provinceData: any }) {
    const [summary, setSummary] = useState(''); // 원본 텍스트 저장
    const [displayedText, setDisplayedText] = useState(''); // 화면에 한 글자씩 보여줄 텍스트
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (!city || !provinceData) return;

        startTransition(async () => {
            setSummary('');
            setDisplayedText(''); // 초기화
            const result = await generateAnalysis({ city, provinceData });
            if (result.ok && result.data) {
                setSummary(result.data);
            } else {
                setSummary("데이터 분석 중 오류가 발생했습니다.");
            }
        });
    }, [city, provinceData]);

    // 타이핑 효과 로직
    useEffect(() => {
        if (!summary) return;

        // 1. 시작 전 초기화
        setDisplayedText('');

        // index를 변수로 관리 (0부터 시작)
        let index = 0;

        const interval = setInterval(() => {
            // summary의 길이에 도달할 때까지 반복
            if (index < summary.length) {
                const nextChar = summary[index]; // 현재 인덱스의 글자 추출
                setDisplayedText((prev) => prev + nextChar);
                index++; // 다음 글자로 이동
            } else {
                clearInterval(interval);
            }
        }, 20);

        return () => {
            clearInterval(interval);
        };
    }, [summary]);

    return (
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden group min-h-50 transition-all duration-500">
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <ShieldCheck size={200} />
            </div>

            <div className="flex items-center gap-2 mb-3 relative z-10">
                <div className="p-1.5 bg-white/20 backdrop-blur rounded-lg">
                    <Sparkles size={18} className="text-yellow-300" />
                </div>
                <h3 className="font-bold text-lg">{city} 시설 통합 안전 진단</h3>
            </div>

            {isPending && (
                <div className="flex h-32 justify-center items-center relative z-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-4"></div>
                    <p className="text-sm font-medium">지역 데이터를 분석하여 안전 리포트를 생성하고 있습니다...</p>
                </div>
            )}

            {/* displayedText를 ReactMarkdown으로 렌더링 */}
            {displayedText && !isPending && (
                <div className="relative z-10 mt-8 max-h-60 overflow-y-auto custom-scrollbar">
                    <div className="text-sm leading-relaxed prose prose-invert max-w-none">
                        <ReactMarkdown
                            components={{
                                // p 태그(문단)를 인라인 div나 span으로 변경하여 커서와 한 줄에 있게 함
                                p: ({ children }) => <span className="inline">{children}</span>,
                                // 강조 텍스트 스타일 유지
                                strong: ({ children }) => <strong className="text-yellow-300 font-bold">{children}</strong>,
                            }}
                        >
                            {displayedText}
                        </ReactMarkdown>

                        {/* 커서: 이제 위 p 태그가 span으로 바뀌었으므로 바로 뒤에 붙습니다 */}
                        {displayedText.length < summary.length && (
                            <span className="inline-block w-1 h-4 bg-yellow-300 ml-1 mb-0.5 animate-pulse align-middle" />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}