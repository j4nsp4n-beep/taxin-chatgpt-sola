import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { getAllPublishedSlugs, getPostBySlug } from "@/lib/blog";

const SITE_URL = "https://aisistemi.si";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return getAllPublishedSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  const images = post.heroImage ? [{ url: post.heroImage }] : undefined;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date || undefined,
      authors: [post.author],
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.heroImage ? [post.heroImage] : undefined,
    },
  };
}

function formatDate(date: string): string {
  if (!date) return "";
  try {
    return new Date(date).toLocaleDateString("sl-SI", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return date;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const pageId = `${SITE_URL}/blog/${post.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageId}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "sl-SI",
    image: post.heroImage ? [`${SITE_URL}${post.heroImage}`] : undefined,
    author: { "@id": `${SITE_URL}/#jan-span` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageId },
    keywords: [post.primaryKeyword, ...post.secondaryKeywords].filter(Boolean).join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Domov", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };

  const faqJsonLd =
    post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${pageId}#faq`,
          mainEntity: post.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }
      : null;

  return (
    <>
      <Navbar />

      <main className="bg-white text-slate-900">
        <article className="pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-xs uppercase tracking-wider text-slate-400">
              <Link href="/blog" className="hover:text-slate-700 transition">
                Blog
              </Link>
              {post.date ? <span className="ml-3">{formatDate(post.date)}</span> : null}
              {post.type ? <span className="ml-3 text-[#ff5722]">{post.type}</span> : null}
            </p>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
              {post.title}
            </h1>

            {post.description ? (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
                {post.description}
              </p>
            ) : null}

            <div className="mt-10 flex items-center gap-3 text-sm text-slate-500">
              <span className="font-semibold text-slate-700">{post.author}</span>
              <span>·</span>
              <span>{post.publisher}</span>
            </div>

            {post.heroImage ? (
              <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.heroImage}
                  alt={post.title}
                  className="block w-full h-auto"
                  loading="eager"
                />
              </div>
            ) : null}

            <div
              className={`blog-prose ${post.heroImage ? "mt-12" : "mt-16"}`}
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            {post.faq.length > 0 ? (
              <section className="mt-20 border-t border-slate-200 pt-12" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                  Pogosta vprašanja
                </h2>
                <div className="mt-8 border-t border-slate-200">
                  {post.faq.map((item, idx) => (
                    <details key={idx} className="faq-item">
                      <summary>
                        <h3 className="text-lg font-semibold text-slate-900 md:text-xl">
                          {item.q}
                        </h3>
                        <svg
                          className="faq-icon"
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </summary>
                      <div className="faq-answer">{item.a}</div>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </article>

        <section className="border-t border-slate-100 bg-slate-50 py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
              Hočete to videti pri svojem podjetju?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600">
              30 minut, brez obveznosti. Prinesite en proces, dobite jasno oceno, ali ima AI danes smisel.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/rezervacija"
                className="rounded-full bg-[#ff5722] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ff4500]"
              >
                Brezplačen pregled procesa
              </Link>
              <Link
                href="/pregled-pripravljenosti"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
              >
                Načrt uvedbe AI
              </Link>
            </div>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
    </>
  );
}
