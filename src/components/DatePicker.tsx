"use client";

import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

type Props = {
  value?: string;
  onChange: (iso: string) => void;
  placeholder?: string;
};

export function DatePicker({ value, onChange, placeholder = "Pick a date" }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const selected = value ? new Date(value + "T00:00:00") : undefined;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-left text-sm text-white outline-none backdrop-blur-sm transition hover:border-white/25 focus:border-lava-400 focus:bg-white/[0.06] focus:ring-2 focus:ring-lava-500/30"
      >
        <span className={selected ? "text-white" : "text-white/40"}>
          {selected ? format(selected, "EEE, MMM d, yyyy") : placeholder}
        </span>
        <Calendar className="h-4 w-4 shrink-0 text-lava-400" />
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-50 mt-2 origin-top rounded-2xl border border-white/15 bg-night-950/95 p-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:right-auto sm:min-w-[320px]">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(d) => {
              if (!d) return;
              onChange(format(d, "yyyy-MM-dd"));
              setOpen(false);
            }}
            disabled={{ before: today }}
            showOutsideDays
            classNames={{
              months: "flex flex-col",
              month: "space-y-3",
              caption: "flex items-center justify-between px-1 pt-1",
              caption_label: "font-display text-base tracking-wide text-white",
              nav: "flex items-center gap-1",
              nav_button:
                "h-8 w-8 flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/80 hover:border-lava-400 hover:text-white",
              nav_button_previous: "",
              nav_button_next: "",
              table: "w-full border-collapse",
              head_row: "flex",
              head_cell:
                "w-9 font-bold text-[10px] uppercase tracking-widest text-white/50",
              row: "flex w-full mt-1",
              cell: "w-9 h-9 text-center p-0",
              day: "h-9 w-9 rounded-full text-sm text-white/80 transition hover:bg-white/10 focus:outline-none",
              day_selected:
                "!bg-lava-500 !text-white hover:!bg-lava-500",
              day_today: "ring-1 ring-lava-400/50",
              day_outside: "text-white/25",
              day_disabled: "text-white/20 hover:bg-transparent cursor-not-allowed",
            }}
          />
        </div>
      )}
    </div>
  );
}
