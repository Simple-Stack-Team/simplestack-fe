import SkeletonTable from "@/components/SkeletonTable";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div>
      <h1 className="mb-4">
        <Skeleton className="h-[44px] max-w-[180px] rounded-lg" />
      </h1>
      <div className="space-y-2">
        {skeleton.map((item) => (
          <SkeletonTable key={item} />
        ))}
      </div>
    </div>
  );
};

export default LoadingPage;
