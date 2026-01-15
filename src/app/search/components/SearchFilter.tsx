'use client';

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter } from "lucide-react";
import { SortOption } from "../actions";
import ProvinceCategory from "@/data/province.json";
import DistrictCategory from "@/data/district.json";
import FacilityCategory from "@/data/type.json";

export default function SearchFilter({ initialParams }: { initialParams: any }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // 입력 필드 로컬 상태
    const [searchWord, setSearchWord] = useState(initialParams.keyword ?? "");
    const [sel1, setSel1] = useState(initialParams.city ?? "");
    const [sel2, setSel2] = useState(initialParams.gugun ?? "");
    const [sel3, setSel3] = useState(initialParams.type ?? "");
    const [selectedSort, setSelectedSort] = useState<SortOption>(initialParams.sort ?? "name");

    const sortOptions: { id: SortOption; label: string }[] = [
        { id: "name", label: "이름순" },
        { id: "star", label: "평점순" },
        { id: "createDate", label: "최신순" },
    ];

    // 시/도 변경 시 시/군/구 옵션 필터링
    const districtOptions = useMemo(() => {
        return DistrictCategory[sel1 as keyof typeof DistrictCategory] || [];
    }, [sel1]);

    const updateUrl = (updates: Record<string, string | undefined>) => {
        const params = new URLSearchParams(searchParams.toString());
        // 새 검색 시 페이지는 항상 0으로 초기화
        params.set("pageNo", "0");

        Object.entries(updates).forEach(([key, value]) => {
            if (!value) params.delete(key);
            else params.set(key, value);
        });

        router.push(`/search?${params.toString()}`, { scroll: false });
    };

    const handleSearchClick = () => {
        updateUrl({
            keyword: searchWord,
            city: sel1,
            gugun: sel2,
            type: sel3,
            sort: selectedSort,
        });
    };

    return (
        <div className="space-y-4">
            {/* 검색창 */}
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Search className="text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="시설 이름 및 키워드 검색..."
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
                    className="w-full h-16 pl-12 bg-white text-lg border-2 border-gray-200 rounded-3xl focus:border-blue-500 outline-none transition-all"
                />
            </div>

            {/* 필터 그룹 */}
            <div className="flex flex-col lg:flex-row justify-between bg-white p-6 rounded-3xl border border-gray-200 shadow-sm gap-4">
                <div className="flex flex-wrap gap-4">
                    {/* 행정구역 선택 */}
                    <div className="w-60">
                        <label className="text-[14px] font-bold text-gray-500 ml-1">행정구역</label>
                        <select
                            value={sel1}
                            onChange={(e) => { setSel1(e.target.value); setSel2(""); }}
                            className="w-full p-3 bg-gray-50 rounded-2xl text-sm font-bold outline-none
                                                border border-transparent focus:ring-2 ring-blue-200 transition-all"
                        >
                            <option value="">전체</option>
                            {ProvinceCategory.map((item, idx) => <option key={idx} value={item}>{item}</option>)}
                        </select>
                    </div>

                    {/* 관할구역 선택 */}
                    <div className="w-60">
                        <label className="text-[14px] font-bold text-gray-500 ml-1">관할구역</label>
                        <select
                            value={sel2}
                            onChange={(e) => setSel2(e.target.value)}
                            className="w-full p-3 bg-gray-50 rounded-2xl text-sm font-bold outline-none
                                                border border-transparent focus:ring-2 ring-blue-200 transition-all"
                        >
                            <option value="">전체</option>
                            {districtOptions.map((item, idx) => <option key={idx} value={item}>{item}</option>)}
                        </select>
                    </div>

                    {/* 시설종목 선택 */}
                    <div className="w-60">
                        <label className="text-[14px] font-bold text-gray-500 ml-1">시설종목</label>
                        <select
                            value={sel3}
                            onChange={(e) => { setSel3(e.target.value) }}
                            className="w-full p-3 bg-gray-50 rounded-2xl text-sm font-bold outline-none
                                                border border-transparent focus:ring-2 ring-blue-200 transition-all"
                        >
                            <option value="">전체</option>
                            {
                                FacilityCategory.map((item, idx) =>
                                    <option key={idx} value={item}>{item}</option>
                                )
                            }
                        </select>
                    </div>

                    {/* 정렬 라디오 버튼 */}
                    <div className="flex items-end gap-2">
                        {sortOptions.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => setSelectedSort(option.id)}
                                className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all
                                    ${selectedSort === option.id ? "bg-blue-50 border-blue-500 text-blue-600" : "bg-white border-gray-100 text-gray-500"}`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleSearchClick}
                    className="px-8 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors"
                >
                    시설 검색
                </button>
            </div>
        </div>
    );
}