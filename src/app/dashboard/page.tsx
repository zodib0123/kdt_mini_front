"use client";

import Header from "@/components/Header";
import KoreaMap from "@/components/KoreaMap";
import DistrictCnt from "@/components/DistrictCnt";
import PacililtyChart from "@/components/PacililtyChart"
import SafetyPeriod from "@/components/SafetyPeriod";
import { useState, useTransition } from "react";
import { generateAnalysis } from "./actions";
import ReactMarkdown from 'react-markdown';

export default function DashBoardPage() {

  const [summary, setSummary] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleDistrictClick = async () => {

    const districtData = {
      regionName: '서울특별시',
      activeRegion: 20,
      facilityCnt: 500,
      seismicRate: 10
    }

    startTransition(async () => {
      const result = await generateAnalysis(districtData);
      if (result.ok && result.data) {
        setSummary(result.data);
      } else {
        alert(result.error || 'An unexpected error occurred.');
        setSummary('');
      }
    });
  }

  return (
    <div className="w-full h-screen p-5">
      <Header />
      <div className="bg-white border rounded-3xl border-gray-200 shadow-sm m-3">
        {isPending && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}
        {summary && !isPending && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden my-4">
            <div className="p-8">
              <div className="text-sm text-gray-600">
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="m-3">
        <DistrictCnt />
      </div>
      <div className="w-full flex">
        <div className="w-130 bg-white border-gray-200 p-5 rounded-3xl border shadow-sm flex flex-col mx-3">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">지역 선택</h1>
            <button onClick={handleDistrictClick}>함 눌러보던가</button>
            <div className="flex items-center text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg uppercase tracking-wider">
              Interactive Map
            </div>
          </div>
          <KoreaMap />
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-400">전국 대비 시설 점유율</span>
              <span className="text-xs font-bold text-blue-600">25%</span>
            </div>
            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full transition-all duration-700 ease-out shadow-sm"
                style={{ width: `25%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white border p-5 border-gray-200 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900">상세 인프라 현황</h3>
              <p className="text-sm text-gray-400 font-medium">전체 시설 종목 및 행정구역 분석</p>
            </div>
          </div>
          <PacililtyChart />
          <SafetyPeriod />
        </div>
      </div>
    </div>
  );
}
