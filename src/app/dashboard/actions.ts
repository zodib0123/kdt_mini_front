"use server";

type districtData = {
  regionName : string,
  activeRegion : number,
  facilityCnt : number,
  seismicRate : number,
};

const apiKey = process.env.GOOGLE_GENERATIVE_AI_KEY;

export async function generateAnalysis({regionName, activeRegion, facilityCnt, seismicRate} : districtData): Promise<{ ok: boolean; data?: string; error?: string }> {
  if (!apiKey) {
    return { ok: false, error: "Google Generative AI Key is missing" };
  }

  const prompt = `${regionName} 공공체육시설 현황: 시설 ${activeRegion}개, ${facilityCnt}개 종목 운영 중. 내진설계 ${seismicRate}%, 시설 노후도와 종목 다양성을 고려하여 정책 제언을 포함한 리포트를 3문장 이내로 작성해줘.`;
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
