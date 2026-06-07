"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = Array.from({ length: 4 }, () => ({
  title: "How to Integrate 2 Way HubSpot",
  description:
    "Prerequisites for this Integration is that you should have a HubSpot account and Copy the API key. We simple aad our API key through the integrations page and we are good to go.",
  posted: "Posted today",
}));

export function LatestUpdateCard() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      aria-labelledby="latest-update-heading"
      className="rounded-lg bg-update-bg/80 px-5 py-4 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 id="latest-update-heading" className="font-medium text-update-text">
          Latest from Bitscale
        </h2>
        <div
          aria-label={`Slide ${activeIndex + 1} of ${slides.length}`}
          className="flex items-center gap-1"
        >
          {slides.map((_, index) => (
            <span
              key={index}
              className={`h-2 rounded-full transition ${
                index === activeIndex
                  ? "w-6 bg-update-text border-blue-100"
                  : "w-2 bg-update-dot"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <article key={index} className="min-w-full">
              <div className="flex flex-col gap-4 md:flex-row w-full">
                <Image
                  src={"/images/cards/latestCard.webp"}
                  alt="latest"
                  width={143}
                  height={97}
                  className="h-auto flex w-1/4"
                />
                <div className="flex flex-col gap-1 w-2/3">
                  <h3 className="text-[13px] font-medium text-sidebar">
                    {slide.title}
                  </h3>
                  <p className="text-xs text-muted wrap-anywhere">
                    {slide.description}
                  </p>
                  <p className="text-[10px] text-update-muted">
                    {slide.posted}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
