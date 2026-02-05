"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export function useFetch(url: string | null) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(!!url);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    setError(null);

    api
      .get(url)
      .then((res) => setData(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Something went wrong"),
      )
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
