
import { Suspense } from "react";
import Header from "@/components/Header";
import SearchFilter from "./components/SearchFilter";
import FacilityList from "./components/FacilityList";
import { SortOption } from "./actions";

interface PageProps {
  searchParams: Promise<{
    keyword?: string;
    city?: string;
    gugun?: string;
    type?: string;
    sort?: SortOption;
    pageNo?: string;
  }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  
  // key를 변경함으로써 파라미터가 바뀔 때마다 Suspense가 다시 트리거되게 합니다.
  const suspenseKey = JSON.stringify(params);

  return (
    <div className="w-full">
      <Header name="상세 시설 검색" isSearchBar={false} />
      
      {/* 클라이언트 컴포넌트: 필터 UI */}
      <SearchFilter initialParams={params} />

      <div className="space-y-6 mt-4">
        <Suspense key={suspenseKey} fallback={<SearchSkeleton />}>
          {/* 서버 컴포넌트: 데이터 페칭 및 리스트 출력 */}
          <FacilityList searchParams={params} />
        </Suspense>
      </div>
    </div>
  );
}

function SearchSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-pulse">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-64 bg-gray-100 rounded-3xl" />
      ))}
    </div>
  );
}