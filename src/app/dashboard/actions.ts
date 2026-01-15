"use server";

import { FacilityType } from "@/type/FacilityType";
import { ProvinceType } from "@/type/ProvinceType";

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface FacilityResponse {
  facility: {
    content: FacilityType[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    empty: boolean;
  };
}

export type SortOption = "name," | "star" | "createDate";

export interface GetFacilitiesRequest {
  name?: string;
  city?: string;
  gugun?: string;
  type?: string;
  sort: SortOption;
  pageNo: number;
}

type districtData = {
  city: string,
  provinceData: ProvinceType,
};

const apiKey = process.env.GOOGLE_GENERATIVE_AI_KEY;

// gemini api 연결 action
export async function generateAnalysis({ city, provinceData }: districtData): Promise<{ ok: boolean; data?: string; error?: string }> {
  const { city_count_total, number_of_guguns, erdsgn, avg_old } = provinceData;

  if (!apiKey) {
    return { ok: false, error: "Google Generative AI Key is missing" };
  }

  const prompt = `
    너는 도시 인프라 및 공공 안전 정책 전문가야. 
    다음은 ${city}의 공공 체육 시설 데이터 분석 결과야:
    - 총 시설 수: ${city_count_total}개 (${number_of_guguns}개 구역 분산)
    - 내진 설계 적용: ${erdsgn}개 시설
    - 시설 평균 노후도: ${avg_old}%

    이 지표를 바탕으로 ${city}의 '공공 체육 시설 안전 리포트'를 아래 조건에 맞춰 3문장으로 작성해줘:
    1. 첫 문장은 시설 보유량 대비 내진 설계 비율을 근거로 한 현재의 안전 등급을 평가할 것.
    2. 두 문장째는 노후도(${avg_old}%)를 기반으로 향후 필요한 유지보수 방향성을 제시할 것.
    3. 마지막은 시민들이 안심하고 이용할 수 있는 시설 관리 체계에 대해 전문가적 제언을 할 것.
    4. 문장은 신뢰감 있고 간결한 '평어체(하게/임/함)' 또는 '경어체(입니다)' 중 하나로 통일할 것.
    `;
  const maxRetries = 3;
  const retryDelay = 1000; // 1 second

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
          return { ok: false, error: "No text generated from API" };
        }
        return { ok: true, data: text }; // Success
      }

      // Check for specific overload error to retry
      if (response.status === 503 && attempt < maxRetries) {
        console.warn(`Attempt ${attempt} failed with 503. Retrying in ${retryDelay / 1000}s...`);
        await new Promise(res => setTimeout(res, retryDelay));
        continue; // Go to next attempt
      }

      // For other errors or if it's the last attempt, return error
      const errorData = await response.json();
      console.error("Gemini API Error Data:", JSON.stringify(errorData, null, 2));
      return { ok: false, error: errorData.error?.message || `API request failed with status ${response.status}` };

    } catch (error: any) {
      console.error(`Attempt ${attempt} failed with error:`, error);
      if (attempt < maxRetries) {
        await new Promise(res => setTimeout(res, retryDelay));
        continue;
      }
      return { ok: false, error: error.message || "An unknown network error occurred" };
    }
  }

  return { ok: false, error: "Failed to generate analisis after multiple retries." };
}

// 상세검색 action
export async function getFacilities(params: GetFacilitiesRequest): Promise<FacilityResponse | null> {
  const { name, city, gugun, type, sort, pageNo } = params;

  const queryParams = new URLSearchParams({
    pageNo: pageNo.toString(),
    sort: sort,
  });

  if (name) queryParams.append("name", name);
  if (city) queryParams.append("city", city);
  if (gugun) queryParams.append("gugun", gugun);
  if (type) queryParams.append("type", type);

  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/facility?${queryParams.toString()}`;
    const resp = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    });

    if (resp.ok) {
      return await resp.json();
    }
    console.error(`Error fetching facility lists: ${resp.statusText}`);
    return null;
  } catch (error) {
    console.error('Error fetching facility lists:', error);
    return null;
  }
}

// 행정구역 간략 조회 action
export async function getProvinceStats(city: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const url = `${baseUrl}/count/erdsgn?city=${encodeURIComponent(city)}`;
  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!resp.ok) return null;
    return await resp.json();
  } catch (error) {
    console.error("[Server Fetch] Error:", error);
    return null;
  }
}

// 행정구역 chart data 조회 action
export async function getProvinceChartData(city: string) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/count?city=${encodeURIComponent(city)}`;
  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!resp.ok) {
      console.error(`[Server Fetch] Failed: ${resp.status}`);
      return null;
    }

    return await resp.json();
  } catch (error) {
    console.error("[Server Fetch] Error:", error);
    return null;
  }
}

// 행정구역 노후도 조회 action
export async function getSafetyPeriodData(city: string) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/count/old?city=${encodeURIComponent(city)}`;
  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!resp.ok) {
      console.error(`[Server Fetch] Failed: ${resp.status}`);
      return null;
    }

    return await resp.json();
  } catch (error) {
    console.error("[Server Fetch] Error:", error);
    return null;
  }
}

// 지도에 표시할 전국 시설 수 데이터 action
export async function getAllProvinceCounts() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/count`;
  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!resp.ok) {
      console.error(`[Server Fetch] Failed: ${resp.status}`);
      return null;
    }

    return await resp.json();
  } catch (error) {
    console.error("[Server Fetch] Error:", error);
    return null;
  }
}