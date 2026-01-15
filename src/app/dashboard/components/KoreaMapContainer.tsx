'use client';

import { useRouter } from "next/navigation";
import KoreaMap from "./KoreaMap";

export default function KoreaMapContainer({ initialCity, facilityCount }: any) {
    const router = useRouter();

    const facilityCountByProvince: Record<string, number> = Object.fromEntries(facilityCount.city_count_list)
    const total = facilityCount.count_all;
    const selectedCity = facilityCountByProvince[initialCity];
    const provinceValue = ((selectedCity / total) * 100).toFixed(0);

    const handleProvinceClick = (city: string) => {
        router.push(`/dashboard?city=${encodeURIComponent(city)}`, { scroll: false });
    };

    return (
        <div className="w-130 h-fit bg-white border-gray-200 px-5 py-10 rounded-3xl border shadow-sm flex flex-col mr-3">
            <div className="flex justify-between">
                <h1 className="text-xl font-bold">지역 선택</h1>
                <div className="flex items-center text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg uppercase tracking-wider">
                    Interactive Map
                </div>
            </div>
            <KoreaMap
                onProvinceClick={handleProvinceClick}
                selectedProvince={initialCity}
                facilityCount={facilityCountByProvince}
            />
            <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-gray-400">{initialCity} 전국 대비 시설 점유율</span>
                    <span className="text-xs font-bold text-blue-600">{provinceValue}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full transition-all duration-700 ease-out shadow-sm"
                        style={{ width: `${provinceValue}%` }}
                    ></div>
                </div>
            </div>
        </div>

    );
}