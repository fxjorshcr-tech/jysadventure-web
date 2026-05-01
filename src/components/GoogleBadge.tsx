import { Star } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/info";

export function GoogleBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href={SOCIAL_LINKS.google}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Google Reviews"
      className={`inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-black/40 px-4 py-3 backdrop-blur-md shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition hover:border-lava-400/60 hover:bg-black/60 ${className}`}
    >
      <svg viewBox="0 0 48 48" className="h-9 w-9 shrink-0" aria-label="Google">
        <path
          fill="#FFC107"
          d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C33.8 6.2 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
        />
        <path
          fill="#FF3D00"
          d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C33.8 6.2 29.2 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41.9 35.8 44 30.3 44 24c0-1.3-.1-2.3-.4-3.5z"
        />
      </svg>

      <div className="flex flex-col leading-tight">
        <div className="flex gap-0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <div className="mt-0.5 text-sm font-semibold text-white">
          5.0 · Google Reviews
        </div>
      </div>
    </a>
  );
}
