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
    <div className="relative flex w-full overflow-hidden border-y border-white/10 bg-night-950 py-6">
      <div className="flex min-w-max animate-marquee gap-8">
        {row.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-display text-5xl tracking-widest text-white/90 md:text-6xl"
          >
            {t}
            <Flame className="h-8 w-8 text-lava-500" />
          </span>
        ))}
      </div>
    </div>
  );
}
