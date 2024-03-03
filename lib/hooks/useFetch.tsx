import { useState, useEffect } from "react";

interface ErrorData {
  message: string;
}

interface Props {
  apiKey: string;
  path?: string;
}

interface DataResult {
  data: any[];
  loading: boolean;
  error: ErrorData | null;
}

const useFetch = ({ apiKey, path }: Props): DataResult => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiKey}${path}`);

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
  }, [apiKey, path]);

  return { data, loading, error };
};

export default useFetch;
