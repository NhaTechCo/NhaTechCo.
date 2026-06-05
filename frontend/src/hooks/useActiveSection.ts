"use client";

import { useEffect, useMemo, useState } from "react";

type UseActiveSectionOptions = {
  defaultId?: string;
  rootMargin?: string;
  threshold?: number | number[];
};

const defaultThresholds = [0.08, 0.18, 0.32, 0.5];

export function useActiveSection(
  sectionIds: string[],
  {
    defaultId,
    rootMargin = "-25% 0px -58% 0px",
    threshold = defaultThresholds
  }: UseActiveSectionOptions = {}
) {
  const idsKey = sectionIds.join("|");
  const thresholdKey = Array.isArray(threshold)
    ? threshold.join("|")
    : String(threshold);
  const initialId = defaultId ?? sectionIds[0] ?? "";
  const [activeId, setActiveId] = useState(initialId);

  const thresholds = useMemo(
    () => (Array.isArray(threshold) ? threshold : [threshold]),
    [thresholdKey]
  );

  useEffect(() => {
    const ids = idsKey.split("|").filter(Boolean);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin,
        threshold: thresholds
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [idsKey, rootMargin, thresholds]);

  return activeId;
}
