'use client';

interface TailCardProps {
    label: string,
    data: string,
}

export default function TailCard({ label, data }: TailCardProps) {

    const amount = Number(data);
    const formatted = amount.toLocaleString('ko-KR');

    return (
        <div className="w-60 h-30 flex flex-col justify-center items-center border-2 border-gray-400 rounded-2xl overflow-hidden">
            <div className="w-full h-4/10 bg-gray-400 flex justify-center items-center">
                <h1 className="text-xl font-bold ">{label}</h1>
            </div>
            <div className="h-6/10 flex justify-center items-center">
                <p className="text-lg">{formatted}개</p>
            </div>
        </div>
    );
}