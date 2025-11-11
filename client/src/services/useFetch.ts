// src/hooks/useFetch.ts
import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await fetchFunction();
            setData(response);
            setError(null);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "An unexpected error occurred";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setData(null);
        setError(null);
        setIsLoading(false);
    };

    useEffect(() => {
        if (autoFetch) {
            (async () => {
                await fetchData();
            })();
        }
    }, []);


    return { data, isLoading, error, refetch: fetchData, reset };
};

export default useFetch;
