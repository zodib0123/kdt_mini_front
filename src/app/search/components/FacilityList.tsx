import { getFacilities, SortOption } from "../actions";
import FacilityCard from "@/components/FacilityCard";
import Pagination from "./Pagination"; // 페이지네이션 별도 분리 권장

export default async function FacilityList({ searchParams }: { searchParams: any }) {
    const result = await getFacilities({
        name: searchParams.keyword,
        city: searchParams.city,
        gugun: searchParams.gugun,
        type: searchParams.type,
        sort: (searchParams.sort as SortOption) || "name",
        pageNo: Number(searchParams.pageNo) || 0,
    });

    if (!result || !result.facility) return <div>검색 결과가 없습니다.</div>;

    const { content, totalElements, totalPages, number } = result.facility;

    return (
        <>
            <div className="flex items-center justify-start bg-white px-6 py-4 rounded-3xl border border-gray-200 shadow-sm">
                <p className="text-sm font-bold text-gray-700">
                    검색 결과 <span className="text-blue-600">{totalElements.toLocaleString()}</span>건
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                {content.map((item) => (
                    <FacilityCard key={item.fid} facility={item} />
                ))}
            </div>

            <Pagination totalPages={totalPages} currentPage={number} />
        </>
    );
}