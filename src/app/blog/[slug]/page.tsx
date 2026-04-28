import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { BLOG_POSTS, getPost } from "@/lib/blog";

type Params = { slug: string };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} — JYS Adventure Tour`,
      description: post.metaDescription,
      images: [{ url: post.image }],
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[55svh] w-full max-w-full items-end overflow-hidden bg-night-950 pb-12 pt-32 sm:pb-16 sm:pt-40">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/70 via-night-950/50 to-night-950" />
        <div className="absolute inset-0 bg-hero-radial" />

        <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-5 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 transition hover:text-lava-400"
          >
            <ArrowLeft className="h-3 w-3" /> All posts
          </Link>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-lava-500/40 bg-lava-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-lava-400">
            {post.tag}
          </span>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2rem,8vw,4rem)] leading-[0.95] tracking-wide text-white [overflow-wrap:anywhere] sm:leading-[0.9] sm:tracking-wider">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.25em] text-white/60">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> {post.readTime} read
            </span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="relative bg-night-950 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-5 lg:px-8">
          <p className="text-lg leading-relaxed text-white/80 md:text-xl">
            {post.intro}
          </p>

          <div className="mt-10 space-y-8">
            {post.sections.map((s, i) => (
              <div key={i}>
                {s.heading && (
                  <h2 className="font-display text-2xl tracking-wide text-white md:text-3xl">
                    {s.heading}
                  </h2>
                )}
                <p className="mt-3 text-white/75 md:text-lg">{s.body}</p>
              </div>
            ))}
          </div>

          {post.closing && (
            <p className="mt-10 rounded-3xl border border-lava-500/30 bg-lava-500/5 p-6 text-white/80 md:text-lg">
              {post.closing}
            </p>
          )}

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link href="/tours" className="btn-primary w-full sm:w-auto">
              Explore tours <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn-ghost w-full sm:w-auto">
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* More posts */}
      {others.length > 0 && (
        <section className="relative bg-night-900 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
            <h2 className="font-display text-3xl tracking-wide text-white md:text-4xl">
              More <span className="text-gradient-fire">reads</span>
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-night-950 transition hover:border-lava-400/50"
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
                  <div className="p-5">
                    <h3 className="font-display text-xl leading-tight tracking-wide text-white">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-white/65">
                      {p.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
