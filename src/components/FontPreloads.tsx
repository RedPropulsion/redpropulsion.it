"use client";

import { preload } from "react-dom";

/** React deduplicates these hints during server rendering and navigation. */
export default function FontPreloads() {
  preload("/fonts/roboto-condensed-latin-variable.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/fonts/orbitron-latin-variable.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return null;
}
