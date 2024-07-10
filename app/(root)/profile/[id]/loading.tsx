import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-2 flex gap-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-[100px]" />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <Skeleton
            key={item}
            className="h-60 w-full rounded-2xl sm:w-[250px]"
          />
        ))}
      </section>
    </div>
  );
}
