import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";
import { SectionHeader } from "@/components/SectionHeader";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata = {
  title: "Blog — JYS Adventure Tour",
  description:
    "Short reads on ATV trails, family UTV tours and Guanacaste travel tips from the JYS Adventure crew.",
};

const POSTS = BLOG_POSTS;

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60svh] w-full max-w-full items-end overflow-hidden bg-night-950 pb-12 pt-32 sm:pb-16 sm:pt-40">
        <Image
          src={IMAGES.gallery[3]}
          alt="Blog"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_25%] opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/70 via-night-950/50 to-night-950" />
        <div className="absolute inset-0 bg-hero-radial" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-lava-500/40 bg-lava-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-lava-400">
            The journal
          </span>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.75rem,12vw,6rem)] leading-[0.9] tracking-wide text-white [overflow-wrap:anywhere] sm:text-8xl sm:leading-[0.85] sm:tracking-wider md:text-[9rem]">
            STORIES FROM
            <br />
            <span className="text-gradient-fire">THE TRAIL</span>
          </h1>
          <p className="mt-6 max-w-2xl text-white/70 md:text-lg">
            Travel guides, riding tips and Guanacaste secrets straight from our
            crew. New posts dropping soon.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="relative bg-night-950 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <SectionHeader
            kicker="Latest posts"
            title={
              <>
                Fresh <span className="text-gradient-fire">reads</span>
              </>
            }
            subtitle="Short reads on Guanacaste trails, gear and travel tips."
          />

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-night-900 transition hover:border-lava-400/50"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                    {p.tag}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-white/50">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {p.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {p.readTime}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl leading-tight tracking-wide text-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm text-white/65">
                    {p.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-lava-400">
                    Read more <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
