import FacilityChart from "./FacilityChart";
import SafetyPeriod from "./SafetyPeriod";
import { getProvinceChartData, getSafetyPeriodData } from "../actions";

export default async function DashboardContainer({ city }: { city: string }) {

  const [chartData, safetyData] = await Promise.all([
    getProvinceChartData(city),
    getSafetyPeriodData(city)
  ]);
  
  return (
    <div className="flex-1 bg-white border border-gray-200 rounded-3xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900">상세 인프라 현황</h3>
          <p className="text-sm text-gray-400 font-medium">전체 시설 종목 및 행정구역 분석</p>
        </div>
      </div>
      <FacilityChart city={city} data={chartData} />
      <SafetyPeriod data={safetyData} />
    </div>
  );
}