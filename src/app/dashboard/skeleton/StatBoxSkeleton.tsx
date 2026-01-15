
export default function StatBoxSkeleton() {
  return (
    <div className="flex flex-wrap gap-4 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white border border-gray-200 p-4 rounded-2xl flex-1 min-w-35 h-24 shadow-sm">
          <div className="w-8 h-8 bg-gray-100 rounded-lg mb-3" />
          <div className="space-y-2">
            <div className="w-12 h-2 bg-gray-50 rounded" />
            <div className="w-20 h-4 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}