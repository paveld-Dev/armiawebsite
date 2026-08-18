"use client";

import { useSyncExternalStore } from "react";

let isReady = false;
const listeners = new Set<() => void>();

export function dispatchAppReady() {
  if (!isReady) {
    isReady = true;
    listeners.forEach((listener) => listener());
  }
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot() {
  return isReady;
}

function getServerSnapshot() {
  return false;
}

export function useAppReady() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
