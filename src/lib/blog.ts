import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const HERO_DIR = path.join(process.cwd(), "public", "blog-heroes");

export type FaqItem = { q: string; a: string };

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  publisher: string;
  primaryKeyword?: string;
  secondaryKeywords: string[];
  ctaTarget?: string;
  topic?: string | string[];
  type?: string;
  heroImage?: string;
  faq: FaqItem[];
  status: "draft" | "published";
};

export type BlogPost = BlogPostMeta & {
  html: string;
  rawBody: string;
  bodyHasFaqSection: boolean;
};

function fileSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function parseFile(slug: string): { data: matter.GrayMatterFile<string>["data"]; content: string } | null {
  const filepath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);
  return { data, content };
}

function resolveHeroImage(slug: string): string | undefined {
  const webp = path.join(HERO_DIR, `${slug}.webp`);
  if (fs.existsSync(webp)) return `/blog-heroes/${slug}.webp`;
  const png = path.join(HERO_DIR, `${slug}.png`);
  if (fs.existsSync(png)) return `/blog-heroes/${slug}.png`;
  return undefined;
}

function normalizeDate(value: unknown): string {
  if (!value) return "";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value;
  return "";
}

function normalizeFaq(value: unknown): FaqItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item): FaqItem | null => {
      if (!item || typeof item !== "object") return null;
      const obj = item as Record<string, unknown>;
      const q = typeof obj.q === "string" ? obj.q.trim() : "";
      const a = typeof obj.a === "string" ? obj.a.trim() : "";
      if (!q || !a) return null;
      return { q, a };
    })
    .filter((x): x is FaqItem => x !== null);
}

function parseFaqFromBody(body: string): FaqItem[] {
  const faqHeadingMatch = body.match(/^##\s+(?:Pogosta\s+vpra[sš]anja|FAQ)\s*$/im);
  if (!faqHeadingMatch) return [];
  const startIdx = body.indexOf(faqHeadingMatch[0]);
  const after = body.slice(startIdx + faqHeadingMatch[0].length);
  const nextH2 = after.search(/\n##\s+[^#]/);
  const section = nextH2 === -1 ? after : after.slice(0, nextH2);

  const items: FaqItem[] = [];
  const blockRe = /<details>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi;
  let m: RegExpExecArray | null;
  while ((m = blockRe.exec(section)) !== null) {
    const q = m[1].replace(/\s+/g, " ").trim();
    const a = m[2]
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (q && a) items.push({ q, a });
  }
  return items;
}

function normalizeMeta(slug: string, data: Record<string, unknown>): BlogPostMeta {
  const secondary = data.secondary_kwds;
  const secondaryKeywords: string[] = Array.isArray(secondary)
    ? secondary.filter((s): s is string => typeof s === "string")
    : [];

  return {
    slug,
    title: (data.title_tag as string) || (data.title as string) || slug,
    description: (data.meta_description as string) || (data.description as string) || "",
    date: normalizeDate(data.date),
    author: (data.author as string) || "Jan Špan",
    publisher: (data.publisher as string) || "AI Sistemi",
    primaryKeyword: (data.primary_kwd as string) || undefined,
    secondaryKeywords,
    ctaTarget: (data.cta_target as string) || undefined,
    topic: (data.topic as string | string[]) || undefined,
    type: (data.tip as string) || undefined,
    heroImage: resolveHeroImage(slug),
    faq: normalizeFaq(data.faq),
    status: ((data.status as string) === "published" ? "published" : "draft") as
      | "draft"
      | "published",
  };
}

function stripLeadingH1(body: string): string {
  return body.replace(/^\s*#\s+.+\n+/, "");
}

export function getAllPublishedPosts(): BlogPostMeta[] {
  return fileSlugs()
    .map((slug) => {
      const parsed = parseFile(slug);
      if (!parsed) return null;
      return normalizeMeta(slug, parsed.data);
    })
    .filter((m): m is BlogPostMeta => m !== null && m.status === "published")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const parsed = parseFile(slug);
  if (!parsed) return null;
  const meta = normalizeMeta(slug, parsed.data);
  if (meta.status !== "published") return null;

  const body = stripLeadingH1(parsed.content);
  const bodyFaq = parseFaqFromBody(body);
  const bodyHasFaqSection = bodyFaq.length > 0;
  if (meta.faq.length === 0 && bodyHasFaqSection) {
    meta.faq = bodyFaq;
  }
  const processed = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(body);
  return { ...meta, html: processed.toString(), rawBody: body, bodyHasFaqSection };
}

export function getAllPublishedSlugs(): string[] {
  return getAllPublishedPosts().map((p) => p.slug);
}
