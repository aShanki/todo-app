import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Skeleton className="h-8 w-48 mb-6" />
      <Skeleton className="h-10 w-full mb-4" />
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
}
