import { Suspense } from "react";
import Header from "@/components/Header";
import KoreaMapContainer from "./components/KoreaMapContainer";
import DashboardContainer from "./components/DashboardContainer";
import FacilityContainer from "./components/FacilityContainer";
import LoadingSkeleton from "./skeleton/LoadingSkeleton";
import { getAllProvinceCounts, getProvinceStats } from "./actions";
import ProvinceCnt from "./components/ProvinceCnt";
import StatBoxSkeleton from "./skeleton/StatBoxSkeleton";
import GeminiAnalysis from "./components/GeminiAnalysis";

export default async function DashBoardPage({
  searchParams
}: {
  searchParams: Promise<{ city?: string }>
}) {
  const params = await searchParams;
  const selectedCity = params.city || "서울특별시";

  const facilityCount = await getAllProvinceCounts();
  const provinceStats = await getProvinceStats(selectedCity);

  return (
    <div className="w-full bg-gray-50/50 min-h-screen">
      <Header name="전국 체육시설 대시보드" isSearchBar={true} />
      <div className="my-5">
        <GeminiAnalysis city={selectedCity} provinceData={provinceStats} />
      </div>

      <div className="my-5">
        <Suspense fallback={<StatBoxSkeleton />}>
          <ProvinceCnt provinceData={provinceStats} />
        </Suspense>
      </div>
      <div className="flex flex-col lg:flex-row gap-5">
        {/* 지도 영역 (Client Interaction) */}
        <KoreaMapContainer
          initialCity={selectedCity}
          facilityCount={facilityCount}
        />
        {/* 통계 영역 (Server Data Fetching) */}
        <Suspense key={selectedCity} fallback={<LoadingSkeleton />}>
          <DashboardContainer city={selectedCity} />
        </Suspense>
      </div>
      <FacilityContainer city={selectedCity} />
    </div >
  );
}