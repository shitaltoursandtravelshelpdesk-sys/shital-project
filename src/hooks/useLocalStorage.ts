"use client";

import { useEffect, useState } from "react";
import { getItem } from "@/lib/storage";

/** Reads a localStorage key after mount. `ready` is false during SSR / first render. */
export function useLocalStorage<T>(key: string): { value: T | null; ready: boolean } {
  const [state, setState] = useState<{ value: T | null; ready: boolean }>({ value: null, ready: false });
  useEffect(() => {
    setState({ value: getItem<T>(key), ready: true });
  }, [key]);
  return state;
}
