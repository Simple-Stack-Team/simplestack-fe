import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface TeamRole {
  id: string;
  name: string;
}

interface DataResult {
  data: TeamRole[];
  isLoading: boolean;
  error: string | null;
}

const useFetchTeamRoles = (orgId: string): DataResult => {
  const { status, data: session } = useSession();

  const [data, setData] = useState<TeamRole[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  //@ts-ignore
  const token = session?.user?.access_token;

  useEffect(() => {
    if (status === "loading") return;

    const handleFetchSkills = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/organizations/${orgId}/teamroles`,
          {
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          },
        );
        const responseData = await response.json();
        setData(responseData.teamRoles);
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    handleFetchSkills();
  }, [orgId, token, status]);

  return { data, isLoading, error };
};

export default useFetchTeamRoles;
