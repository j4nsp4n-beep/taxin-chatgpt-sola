import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

type ShowcaseBlockProps = {
  title: string;
  description: string;
  image: string;
  category: string;
  light?: boolean;
  reverse?: boolean;
};

export function ShowcaseBlock({
  title,
  description,
  image,
  category,
  light = false,
  reverse = false,
}: ShowcaseBlockProps) {
  return (
    <section
      className={`border-y ${
        light
          ? "border-black/10 bg-[#f7f7f7] text-black"
          : "border-white/10 bg-[#0a0a0a] text-white"
      }`}
    >
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-14 md:grid-cols-2 md:items-center">
        <Reveal className={reverse ? "md:order-2" : "md:order-1"}>
          <span
            className={`inline-block rounded-full border px-3 py-1 text-xs uppercase tracking-[0.14em] ${
              light
                ? "border-black/15 text-black/60"
                : "border-white/20 text-white/70"
            }`}
          >
            {category}
          </span>
          <h3 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
            {title}
          </h3>
          <p className={light ? "mt-4 text-black/65" : "mt-4 text-white/70"}>
            {description}
          </p>
          <Link
            href="#"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-[#ff5722] hover:text-[#ff4500]"
          >
            View Project
            <span aria-hidden>↗</span>
          </Link>
        </Reveal>

        <Reveal
          delay={0.08}
          className={`${reverse ? "md:order-1" : "md:order-2"} overflow-hidden border ${
            light ? "border-black/10" : "border-white/10"
          }`}
        >
          <div className="relative aspect-[16/10]">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
