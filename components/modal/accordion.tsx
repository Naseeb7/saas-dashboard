"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

interface AccordionProps<T> {
  items: T[];
  defaultOpenIds?: string[];
  getItemId: (item: T) => string;
  getItemTitle: (item: T) => string;
  getItemDescription?: (item: T) => string | undefined;
  renderItem: (item: T) => ReactNode;
}

export function Accordion<T>({
  items,
  defaultOpenIds,
  getItemId,
  getItemTitle,
  getItemDescription,
  renderItem,
}: AccordionProps<T>) {
  const [openItemIds, setOpenItemIds] = useState<Set<string>>(
    () => new Set(defaultOpenIds ?? []),
  );

  const toggleItem = (itemId: string) => {
    setOpenItemIds((current) => {
      const next = new Set(current);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const itemId = getItemId(item);
        const panelId = `${itemId}-panel`;
        const buttonId = `${itemId}-button`;
        const isOpen = openItemIds.has(itemId);

        return (
          <section key={itemId} className="border">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(itemId)}
                className="flex w-full items-center justify-between gap-4 p-4 text-left"
              >
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{getItemTitle(item)}</span>
                  {getItemDescription ? (
                    <span className="block text-xs">{getItemDescription(item)}</span>
                  ) : null}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  size={14}
                  className={cn("shrink-0 transition-transform", isOpen && "rotate-180")}
                />
              </button>
            </h3>
            {isOpen ? (
              <div id={panelId} role="region" aria-labelledby={buttonId} className="p-4 pt-0">
                {renderItem(item)}
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
