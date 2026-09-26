"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Wordmark } from "../brand/Wordmark";

export function Header() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-forest/15 bg-paper">
      <div
        className={cn(
          "container flex items-center justify-between gap-6 transition-[height] duration-300 ease-instrument",
          compact ? "h-[3.75rem]" : "h-[4.75rem]",
        )}
      >
        <Link href="/" className="text-forest" aria-label="GridSync, home">
          <Wordmark className="text-[17px]" />
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-[3px] px-3 py-2 text-[15px] transition-colors",
                    isActive(item.href) ? "text-forest" : "text-mineral-ink hover:text-forest",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && <span className="absolute inset-x-3 -bottom-[3px] h-px bg-copper" aria-hidden />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <Link href="/platform" className="hidden text-[15px] text-mineral-ink hover:text-forest lg:inline">
            View platform
          </Link>
          <Link href="/contact" className="btn-primary hidden !min-h-[2.5rem] !px-4 sm:inline-flex">
            Discuss a building
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 items-center gap-2 px-1 text-[15px] font-medium text-forest xl:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5" aria-hidden>
              <span className={cn("absolute left-0 h-[1.5px] w-5 bg-current transition-transform", open ? "top-1.5 rotate-45" : "top-0")} />
              <span className={cn("absolute left-0 h-[1.5px] w-5 bg-current transition-transform", open ? "top-1.5 -rotate-45" : "top-3")} />
            </span>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav id="site-menu" aria-label="Site" className="h-[calc(100dvh-3.75rem)] overflow-y-auto border-t border-forest/15 bg-paper xl:hidden">
          <ul className="container divide-y divide-forest/10 py-4">
            {[{ label: "Home", href: "/" }, ...primaryNav, { label: "Grid events", href: "/grid-events" }, { label: "Data & integrations", href: "/integrations" }, { label: "Outcomes", href: "/outcomes" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="flex items-center justify-between py-4 text-[1.35rem] text-forest"
                >
                  {item.label}
                  {pathname === item.href && <span className="label">Current</span>}
                </Link>
              </li>
            ))}
          </ul>
          <div className="container pb-10">
            <Link href="/contact" className="btn-primary w-full">
              Discuss a building
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
