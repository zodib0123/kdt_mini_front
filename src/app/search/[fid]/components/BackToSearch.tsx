'use client';

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function BackToSearch() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="p-2 rounded-xl border border-gray-300 hover:bg-gray-200 transition-all"
        >
            <ChevronLeft />
        </button>
    );
}
