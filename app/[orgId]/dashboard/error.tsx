"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  const { orgId } = useParams();

  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold">There was a problem</p>
        <h1 className="sm:text mt-4 text-3xl font-bold tracking-tight text-slate-800">
          {error.message || "Something went wrong"}
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Please try again later
        </p>
        <div className="mt-4 space-x-4">
          <Button onClick={reset}>Try again</Button>
          <Link href={`/${orgId}/dashboard`}>Go back dashboard</Link>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
