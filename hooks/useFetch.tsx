"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

interface ErrorData {
  message: string;
}

interface Props {
  apiKey: string;
  url?: string;
}

interface DataResult {
  data: any;
  loading: boolean;
  error: ErrorData | null;
}

const useFetch = ({ apiKey, url }: Props): DataResult => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorData | null>(null);

  const { status, data: session } = useSession();

  const token = session?.user?.access_token;

  useEffect(() => {
    const fetchData = async () => {
      if (status === "loading") return;

      try {
        setLoading(true);

        if (!token) {
          setError({
            message: "Access token is undefined. Please log in.",
          });
          return;
        }

        const response = await fetch(`${apiKey}${url}`, {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setData(responseData);
          setError(null);
        } else {
          const errorData: ErrorData = await response.json();
          setError(errorData);
        }
      } catch (error) {
        setError({
          message: "Error during data fetching. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey, url, status, token]);

  return { data, loading, error };
};

export default useFetch;
