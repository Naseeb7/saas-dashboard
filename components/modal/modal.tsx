"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useId, useRef } from "react";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}

export function Modal({ open, onOpenChange, title, children }: ModalProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    previouslyFocusedElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
  }, [open]);

  useEffect(() => {
    if (!open) {
      previouslyFocusedElementRef.current?.focus();
      previouslyFocusedElementRef.current = null;
      return;
    }

    closeButtonRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/20"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onOpenChange(false);
        }
      }}
    >
      <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="relative flex h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] max-w-none flex-col overflow-hidden rounded-2xl border border-border-custom bg-surface px-4 pt-8 pb-4 shadow-sm shadow-black/8 sm:h-[min(92vh,calc(100vh-2rem))] sm:w-full sm:rounded-lg sm:px-8 sm:pt-8 sm:pb-4.5 sm:max-w-5xl"
          onMouseDown={(event) => {
            event.stopPropagation();
          }}
        >
          <h2 id={titleId} className="sr-only">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close dialog"
            className="absolute right-2 top-2 flex items-center justify-center rounded-full bg-border-custom p-1 hover:cursor-pointer sm:right-3 sm:top-3"
          >
            <X size={12} />
          </button>
          <div className="flex h-full min-h-0 flex-1 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
