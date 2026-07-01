"use client";

import { CSSProperties } from "react";

const stars = [
  ["8%", "18%", "1px", ".42", "2.8s"],
  ["16%", "52%", "1px", ".34", "3.6s"],
  ["22%", "28%", "2px", ".48", "4.4s"],
  ["31%", "74%", "1px", ".32", "3.8s"],
  ["40%", "16%", "1px", ".45", "2.9s"],
  ["46%", "48%", "1px", ".3", "5.2s"],
  ["54%", "22%", "2px", ".48", "3.4s"],
  ["60%", "82%", "1px", ".36", "4.8s"],
  ["68%", "36%", "1px", ".32", "3.2s"],
  ["74%", "64%", "2px", ".46", "4.2s"],
  ["83%", "24%", "1px", ".34", "3.7s"],
  ["90%", "76%", "1px", ".4", "5s"],
  ["12%", "84%", "1px", ".3", "4.6s"],
  ["28%", "9%", "1px", ".36", "3.3s"],
  ["52%", "68%", "1px", ".34", "5.5s"],
  ["86%", "48%", "1px", ".38", "3.9s"]
];

export function CosmicBackground() {
  return (
    <>
      <div aria-hidden="true" className="cosmic-background">
        <div className="starfield">
          {stars.map(([x, y, size, opacity, duration], index) => (
            <span
              key={`${x}-${y}-${index}`}
              style={
                {
                  "--x": x,
                  "--y": y,
                  "--s": size,
                  "--o": opacity,
                  "--d": duration
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="space-noise" />
    </>
  );
}
