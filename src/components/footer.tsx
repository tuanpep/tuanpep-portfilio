"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold">
              TB.
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              &copy; {currentYear} Thanh Tuan Bui. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center gap-4 mb-4">
              <FooterSocialLink
                href="https://linkedin.com/in/your-profile"
                icon="linkedin"
              />
              <FooterSocialLink
                href="https://github.com/your-username"
                icon="github"
              />
              <ThemeToggle />
            </div>
            <p className="text-sm text-muted-foreground">
              Built with Next.js, TailwindCSS, Three.js, GSAP
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterSocialLink({
  href,
  icon,
}: {
  href: string;
  icon: "linkedin" | "github";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-foreground transition-colors"
      aria-label={icon}
    >
      {icon === "linkedin" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      )}
    </a>
  );
}
