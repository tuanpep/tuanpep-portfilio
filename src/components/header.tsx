"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/60 backdrop-blur-xl border-b border-border/40 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="relative group">
          <span className="text-2xl font-bold relative z-10 text-gradient">
            TB.
          </span>
          <span className="absolute -inset-2 rounded-lg scale-0 group-hover:scale-100 transition-all duration-300 bg-primary/10"></span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className={cn(
              "hidden md:flex px-4 py-2 rounded-full text-sm font-medium",
              "text-primary-foreground relative overflow-hidden group",
              "transition-transform hover:scale-105 border border-primary/50",
              "hover:shadow-[0_0_10px_rgba(156,81,255,0.4)]",
              "bg-gradient-to-r from-primary/80 to-secondary/80"
            )}
          >
            <span className="relative z-10">Let's Talk</span>
          </a>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-foreground/70 hover:text-foreground transition-colors relative group px-2 py-1"
    >
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 relative glass-panel rounded-lg"
        aria-label="Toggle menu"
      >
        <MenuIcon className={cn("h-6 w-6 text-primary", isOpen && "hidden")} />
        <CloseIcon
          className={cn("h-6 w-6 text-primary", !isOpen && "hidden")}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-4 w-64 py-4 glass-panel rounded-lg border border-border/40 neon-border">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-6 py-3 hover:bg-primary/10 text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mx-6 my-3 h-px bg-border/40"></div>
          <a
            href="#contact"
            className="block px-6 py-3 text-primary font-medium"
            onClick={() => setIsOpen(false)}
          >
            Let's Talk
          </a>
        </div>
      )}
    </div>
  );
}

const navItems = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
