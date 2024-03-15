import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <div>
      <Skeleton className="h-8 w-32" />
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Skeleton className="h-[360px]" />
        <Skeleton className="h-[360px]" />
        <Skeleton className="h-[360px]" />
        <Skeleton className="h-[360px]" />
      </div>
    </div>
  );
};

export default LoadingPage;
