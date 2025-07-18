"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type SkillCategory = {
  title: string;
  skills: Skill[];
};

type Skill = {
  name: string;
  level: number; // 1-5
};

const skillCategories: SkillCategory[] = [
  {
    title: "Blockchain Development",
    skills: [
      { name: "EVM Chains", level: 5 },
      { name: "Solana Chain", level: 4 },
      { name: "Smart Contract Integration", level: 5 },
      { name: "Wallet Integration", level: 5 },
      { name: "Web3 Libraries", level: 5 },
      { name: "Transaction Management", level: 4 },
    ],
  },
  {
    title: "Front-End Development",
    skills: [
      { name: "JavaScript", level: 5 },
      { name: "TypeScript", level: 5 },
      { name: "React.js", level: 5 },
      { name: "Next.js", level: 5 },
      { name: "State Management", level: 4 },
      { name: "UI Libraries", level: 5 },
    ],
  },
  {
    title: "Development Tools & Practices",
    skills: [
      { name: "Git & GitHub", level: 5 },
      { name: "Testing", level: 4 },
      { name: "Design Tools", level: 4 },
      { name: "API Tools", level: 4 },
    ],
  },
  {
    title: "Blockchain Concepts",
    skills: [
      { name: "Token Standards", level: 5 },
      { name: "DeFi Protocols", level: 4 },
      { name: "Gas Optimization", level: 4 },
      { name: "Transaction Batching", level: 4 },
      { name: "RPC Node Management", level: 4 },
    ],
  },
];

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      categoryRefs.current.forEach((ref, index) => {
        gsap.fromTo(
          ref,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2 * index,
            scrollTrigger: {
              trigger: ref,
              start: "top 85%",
            },
          }
        );

        // Animate skill bars
        const skillBars = ref?.querySelectorAll(".skill-bar");
        skillBars?.forEach((bar, i) => {
          gsap.fromTo(
            bar,
            { width: 0 },
            {
              width: "100%",
              duration: 1,
              delay: 0.3 * index + 0.1 * i,
              ease: "power2.out",
              scrollTrigger: {
                trigger: bar,
                start: "top 90%",
              },
            }
          );
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      <div className="container">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Technical Skills
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              ref={(el) => {
                categoryRefs.current[index] = el;
              }}
              className="p-6 rounded-lg border border-border bg-card shadow-md"
            >
              <h3 className="text-xl font-bold mb-4">{category.title}</h3>
              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground text-sm">
                        {getLevelLabel(skill.level)}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className={cn(
                          "h-full skill-bar rounded-full",
                          getColorForLevel(skill.level)
                        )}
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function getLevelLabel(level: number): string {
  switch (level) {
    case 1:
      return "Beginner";
    case 2:
      return "Elementary";
    case 3:
      return "Intermediate";
    case 4:
      return "Advanced";
    case 5:
      return "Expert";
    default:
      return "";
  }
}

function getColorForLevel(level: number): string {
  switch (level) {
    case 1:
      return "bg-red-500";
    case 2:
      return "bg-orange-500";
    case 3:
      return "bg-yellow-500";
    case 4:
      return "bg-blue-500";
    case 5:
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
}
