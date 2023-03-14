import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

type AsyncState<T> = 
  { status: "pending" } 
  |
  { 
    status: "rejected",
    error: unknown
  } 
  |
  {
    status: "resolved",
    value: T
  }

export function useAsync<T> (
  load: () => Promise<T>,
  dependencies: unknown[],
): AsyncState<T> {

  const [state, setState] = useState<AsyncState<T>>({ status: "pending" });

  useEffect(() => {

    let canceled = false;
    
    const func = async () => {
      try { 
        const value: T = await load();
        if (!canceled) {
          setState({ status: "resolved", value });
        }
      } catch(error) {
        if (!canceled) {
          setState({ status: "rejected", error });
        }
      }
    }
    func();

    return () => {
      canceled = true;
      setState({ status: "pending" })
    }
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  dependencies)

  return state;
}

export function useRequiredParams(paramName: string): string {
  const params = useParams();
  const param = params[paramName];

  if (param === undefined) {
    throw new Error(`Route param ${paramName} is required but is missing`)
  }

  return param;
} 