"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThreeScene } from "./three-scene";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations
      const tl = gsap.timeline();
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          badgeRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.2"
        );

      // Scroll animations
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        opacity: 0.3,
        y: 200,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
      id="home"
    >
      <ThreeScene />

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-10 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-secondary/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center">
        <div
          ref={badgeRef}
          className="mb-6 px-4 py-2 rounded-full glass-panel flex items-center gap-2 border border-primary/30"
          style={{ boxShadow: "var(--glow-primary)" }}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-sm font-medium">Building the Web3 future</span>
        </div>

        <h1
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-4xl text-gradient"
        >
          Thanh Tuan Bui
          <span className="block mt-3">Web3 Front-end Developer</span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 text-lg md:text-xl max-w-2xl text-muted-foreground"
        >
          Specializing in{" "}
          <span className="text-primary font-semibold">EVM</span> &{" "}
          <span className="text-secondary font-semibold">Solana</span>{" "}
          blockchain development with 4+ years of experience in Web2 and Web3.
          Building the future of decentralized applications with a focus on user
          experience.
        </p>

        <div
          ref={ctaRef}
          className="mt-10 flex flex-wrap gap-4 items-center justify-center"
        >
          <a
            href="#contact"
            className={cn(
              "px-6 py-3 rounded-full border border-transparent bg-primary text-primary-foreground relative overflow-hidden group",
              "transition-transform hover:scale-105 neon-border",
              "after:absolute after:inset-0 after:bg-gradient-to-r after:from-primary after:to-secondary after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100"
            )}
          >
            <span className="relative z-10">Contact Me</span>
          </a>
          <a
            href="#projects"
            className={cn(
              "px-6 py-3 rounded-full border border-primary/50 text-primary relative overflow-hidden group",
              "transition-all hover:border-primary/80 hover:scale-105",
              "hover:shadow-[0_0_15px_rgba(156,81,255,0.5)]"
            )}
          >
            <span className="relative z-10">View Projects</span>
          </a>
        </div>

        <div className="mt-20 flex items-center gap-6">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-gradient">4+</span>
            <span className="text-sm text-muted-foreground">
              Years Experience
            </span>
          </div>
          <div className="h-10 w-px bg-border"></div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-gradient">50+</span>
            <span className="text-sm text-muted-foreground">
              Projects Completed
            </span>
          </div>
          <div className="h-10 w-px bg-border"></div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-gradient">20+</span>
            <span className="text-sm text-muted-foreground">Happy Clients</span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
            style={{ filter: "drop-shadow(0 0 5px currentColor)" }}
          >
            <path
              d="M12 5V19M12 19L19 12M12 19L5 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
