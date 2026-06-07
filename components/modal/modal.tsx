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
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="flex h-[min(92vh,calc(100vh-2rem))] w-full max-w-5xl flex-col overflow-hidden border border-border-custom bg-surface rounded-lg shadow-sm shadow-black/8 px-8 pt-8 pb-4.5 relative"
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
            className="absolute top-3 right-3 rounded-full p-1 bg-border-custom flex justify-center items-center hover:cursor-pointer"
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
