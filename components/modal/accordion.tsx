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
    <div className="flex flex-col">
      {items.map((item) => {
        const itemId = getItemId(item);
        const panelId = `${itemId}-panel`;
        const buttonId = `${itemId}-button`;
        const isOpen = openItemIds.has(itemId);

        return (
          <section
            key={itemId}
            className="border-b border-border-custom py-3 flex flex-col gap-3"
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(itemId)}
                className="flex w-full items-center justify-between"
              >
                <span className="flex flex-col items-start gap-1.5">
                  <span className="flex gap-2 text-sm font-semibold text-modal-header">
                    {getItemTitle(item)}
                  </span>
                  {getItemDescription ? (
                    <span className="block text-xs text-muted">
                      {getItemDescription(item)}
                    </span>
                  ) : null}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  size={16}
                  className={cn(
                    "shrink-0 transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </h3>
            {isOpen ? (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className=""
              >
                {renderItem(item)}
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
