'use client';

import React from 'react';

export default function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-50 rounded-xl">
                {icon}
            </div>
            <div>
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
                <p className="text-sm font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );
}
