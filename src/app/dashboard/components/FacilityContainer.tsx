import { Trophy } from "lucide-react";
import { getFacilities } from "../actions";
import FacilityCard from "@/components/FacilityCard";

export default async function DashboardContainer({ city }: { city: string }) {

    const facilities = await getFacilities({ city, sort: "createDate", pageNo: 0 });

    return (
        <div className="mt-8 mb-5 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Trophy size={20} className="text-yellow-500" />
                    {city} 최근 등록 시설
                </h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {facilities?.facility.content.slice(0, 8).map(f => (
                    <FacilityCard key={f.fid} facility={f} />
                ))}
            </div>
        </div>
    );
}