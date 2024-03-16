"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Skills } from "@/types/skills-types";

interface DataResult {
  skillsFetch: Skills[];
  isLoading: boolean;
  error: string | null;
}

const useFetchSkills = (orgId: string): DataResult => {
  const { status, data: session } = useSession();

  const [skillsFetch, setSkillsFetch] = useState<Skills[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = session?.user?.access_token;

  useEffect(() => {
    if (status === "loading") return;

    const handleFetchSkills = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/organizations/${orgId}/skills`,
          {
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          },
        );

        const data = await response.json();
        setSkillsFetch(data);
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    handleFetchSkills();
  }, [orgId, token, status]);

  return { skillsFetch, isLoading, error };
};

export default useFetchSkills;
