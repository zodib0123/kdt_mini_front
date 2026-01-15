'use client';

import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="flex-1 space-y-6 animate-pulse">
      {/* DashboardContainer의 외관(White Card)을 그대로 본떠 설계 */}
      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-5">
        
        {/* 1. 상단 타이틀 영역 (DashboardContainer.tsx의 헤더 부분) */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-3">
            {/* "상세 인프라 현황" 제목 자리 */}
            <div className="h-7 w-40 bg-gray-200 rounded-md" />
            {/* "전체 시설 종목 및 행정구역 분석" 설명 자리 */}
            <div className="h-4 w-56 bg-gray-100 rounded-md" />
          </div>
        </div>

        {/* 2. FacilityChart 영역 (차트 형태 시뮬레이션) */}
        <div className="mb-10">
          <div className="flex flex-col items-center justify-center py-6">
            {/* 원형 도넛 차트 형상 */}
            <div className="relative w-44 h-44 rounded-full border-14 border-gray-50 flex items-center justify-center">
              <div className="w-12 h-4 bg-gray-100 rounded" />
            </div>
            {/* 차트 하단 범례(Legend) 아이템들 */}
            <div className="flex flex-wrap justify-center gap-3 mt-8 w-full">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-gray-100 rounded-full" />
                  <div className="w-12 h-3 bg-gray-50 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. SafetyPeriod 영역 (노후 시설 현황 부분) */}
        <div className="pt-8 border-t border-gray-100 space-y-6">
          {/* "시설 노후도 현황" 아이콘과 타이틀 */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded-lg" />
            <div className="w-32 h-5 bg-gray-200 rounded-md" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* 프로그레스 바 목록 (신축, 보통, 노후) */}
            <div className="space-y-5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="w-20 h-3 bg-gray-100 rounded" />
                    <div className="w-10 h-3 bg-gray-200 rounded" />
                  </div>
                  <div className="w-full h-2.5 bg-gray-50 rounded-full overflow-hidden" />
                </div>
              ))}
            </div>
            
            {/* 우측 노후 시설 경고 박스 (SafetyPeriod.tsx 하단 노란 박스 대응) */}
            <div className="bg-gray-50 rounded-2xl p-4 h-24 flex gap-3">
              <div className="w-5 h-5 bg-gray-200 rounded-full shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="w-20 h-3 bg-gray-200 rounded" />
                <div className="w-full h-3 bg-gray-100 rounded" />
                <div className="w-2/3 h-3 bg-gray-100 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FacilityContainer 자리에 들어갈 하단 카드들 (옵션) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-100 h-40 rounded-2xl shadow-sm" />
        ))}
      </div>
    </div>
  );
}