import { Flame } from "lucide-react";

export function Marquee() {
  const items = [
    "PURA VIDA",
    "ATV & UTV TOURS",
    "GUANACASTE",
    "NO LIMITS",
    "RIDE THE WILD",
    "OFF-ROAD COSTA RICA",
  ];
  const row = [...items, ...items, ...items];
  return (
    <div className="relative flex w-full overflow-hidden border-y border-white/10 bg-night-950 py-5 sm:py-6">
      <div className="flex min-w-max animate-marquee gap-5 sm:gap-8">
        {row.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-5 font-display text-3xl tracking-widest text-white/90 sm:gap-8 sm:text-5xl md:text-6xl"
          >
            {t}
            <Flame className="h-6 w-6 text-lava-500 sm:h-8 sm:w-8" />
          </span>
        ))}
      </div>
    </div>
  );
}
