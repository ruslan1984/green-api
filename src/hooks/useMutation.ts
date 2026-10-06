import { useState, useCallback } from "react";

type TUseMutation<T = unknown, R = unknown> = [
  func: (
    data?: Partial<T> | null,
    url_f?: string,
    method_f?: "GET" | "POST" | "DELETE",
  ) => Promise<R>,
  {
    data?: T;
    loading: boolean;
    error: string;
    statusCode?: number;
  },
];

export const useMutation = <T = unknown, R = unknown>(
  url?: string,
  method?: "GET" | "POST" | "DELETE",
): TUseMutation<T, R> => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const func = useCallback(
    async (
      body?: Partial<T> | null,
      url_f?: string,
      method_f?: "GET" | "POST" | "DELETE",
    ) => {
      try {
        setError("");
        setLoading(true);

        const request: RequestInit = {
          method: method_f || method,
          headers: {
            "content-type": "application/json",
          },
        };
        if (body) {
          request["body"] = JSON.stringify(body);
        }
        const response = await fetch("/api" + (url_f || url), request);

        if (response.status > 299) {
          let err = await response.text();
          if (!err) {
            if (response.status === 401) {
              err = "Ошибка авторизации";
            } else {
              err = "Ошибка ";
            }
          }
          setError(err);
          throw new Error(err);
        }
        const json = await response.json();
        setData(json);
        return json;
      } catch (e) {
        console.error(e);
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [url],
  );
  return [func, { data, loading, error }];
};
