"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Projects } from "@/types/projects-types";

interface DataResult {
  projectsFetch: Projects[];
  isLoading: boolean;
  error: string | null;
}

const useFetchProjects = (orgId: string): DataResult => {
  const { status, data: session } = useSession();

  const [projectsFetch, setProjectsFetch] = useState<Projects[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = session?.user?.access_token;

  useEffect(() => {
    if (status === "loading") return;

    const handleFetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/organizations/${orgId}/projects/manager/`,
          {
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          },
        );

        const data = await response.json();
        setProjectsFetch(data);
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    handleFetchProjects();
  }, [orgId, token, status]);

  return { projectsFetch, isLoading, error };
};

export default useFetchProjects;
