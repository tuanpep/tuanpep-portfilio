"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      <div className="container">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            ref={imageRef}
            className="relative h-[400px] rounded-2xl overflow-hidden border border-border shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            <Image
              src="/profile.jpg"
              alt="Thanh Tuan Bui"
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div ref={textRef} className="space-y-6">
            <h3 className="text-2xl font-bold">
              Web3 Front-end Developer (EVM & Solana)
            </h3>
            <p className="text-muted-foreground">
              Experienced Web3 Front-end Developer specializing in EVM and
              Solana blockchain development. With 4+ years of experience in both
              Web2 and Web3, I excel at building decentralized applications
              (dApps) with a focus on user experience and security.
            </p>
            <p className="text-muted-foreground">
              Proven track record in implementing smart contract interactions,
              wallet integrations, and cross-chain solutions. Passionate about
              blockchain technology and committed to building the future of
              decentralized finance and applications.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <SkillBadge>JavaScript</SkillBadge>
              <SkillBadge>TypeScript</SkillBadge>
              <SkillBadge>React</SkillBadge>
              <SkillBadge>Next.js</SkillBadge>
              <SkillBadge>Ethereum</SkillBadge>
              <SkillBadge>Solana</SkillBadge>
              <SkillBadge>Web3.js</SkillBadge>
              <SkillBadge>TailwindCSS</SkillBadge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-sm font-medium",
        "bg-secondary text-secondary-foreground",
        "border border-border",
        "transition-transform hover:scale-105"
      )}
    >
      {children}
    </span>
  );
}
