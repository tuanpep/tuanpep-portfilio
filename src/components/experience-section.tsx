"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Experience = {
  id: string;
  company: string;
  position: string;
  period: string;
  highlights: string[];
  type: "web2" | "web3";
};

const experiences: Experience[] = [
  {
    id: "lab3",
    company: "LAB3",
    position: "Front-end Developer",
    period: "10/2023 - Present",
    highlights: [
      "Successfully delivered multiple Web3 projects on time and within budget",
      "Implemented secure wallet integrations for multiple blockchains",
      "Developed reusable Web3 components reducing development time by 40%",
    ],
    type: "web3",
  },
  {
    id: "savvycom",
    company: "SAVVYCOM",
    position: "Front-end Developer",
    period: "6/2022 - 10/2023",
    highlights: [
      "Spearheaded development of internal R&D products",
      "Developed Personaify.ai - AI-powered document processing platform",
      "Implemented real-time document processing and visualization features",
      "Optimized performance to handle 10,000+ documents simultaneously",
    ],
    type: "web2",
  },
  {
    id: "cmc",
    company: "CMC GLOBAL",
    position: "Front-end Developer",
    period: "4/2021 - 6/2022",
    highlights: [
      "Led front-end development for 2 major client projects",
      "Improved application performance by 40% through code optimization",
      "Implemented automated testing reducing bug reports by 25%",
      "Successfully managed client communications and requirements gathering",
    ],
    type: "web2",
  },
  {
    id: "ttc",
    company: "TTC Solutions Technology",
    position: "Intern/Fresher Front-end Developer",
    period: "8/2020 - 4/2021",
    highlights: [
      "Successfully completed internship program with distinction",
      "Contributed to 3+ production projects within first year",
      "Implemented responsive designs for multiple client websites",
      "Reduced page load times by 30% through performance optimization",
    ],
    type: "web2",
  },
];

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      experienceRefs.current.forEach((ref, index) => {
        gsap.fromTo(
          ref,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 0.2 * index,
            scrollTrigger: {
              trigger: ref,
              start: "top 85%",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-muted/30"
    >
      <div className="container">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Work Experience
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />

          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              ref={(el) => {
                experienceRefs.current[index] = el;
              }}
              className={cn(
                "relative mb-16 last:mb-0 grid",
                index % 2 === 0
                  ? "md:grid-cols-[1fr_auto_1fr] text-right md:text-right"
                  : "md:grid-cols-[1fr_auto_1fr] md:text-left text-right"
              )}
            >
              {/* Content */}
              <div
                className={cn(
                  "p-6 rounded-lg border border-border bg-card shadow-md",
                  index % 2 === 0
                    ? "md:pr-10 col-span-full md:col-span-1"
                    : "md:pl-10 col-span-full md:col-start-3"
                )}
              >
                <div className="absolute top-10 hidden md:block">
                  <div
                    className={cn(
                      "w-6 h-0.5 bg-primary",
                      index % 2 === 0 ? "left-full ml-6" : "right-full mr-6"
                    )}
                    style={{
                      position: "absolute",
                      [index % 2 === 0 ? "left" : "right"]: "100%",
                    }}
                  />
                </div>
                <span
                  className={cn(
                    "inline-block mb-2 text-sm font-medium px-3 py-1 rounded-full",
                    experience.type === "web2"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                  )}
                >
                  {experience.type === "web2" ? "Web2" : "Web3"}
                </span>
                <h3 className="text-xl font-bold">{experience.company}</h3>
                <p className="text-muted-foreground mb-2">
                  {experience.position}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {experience.period}
                </p>
                <ul
                  className={cn(
                    "space-y-2 text-sm",
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  )}
                >
                  {experience.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="inline-block h-5 w-5 flex-shrink-0 text-primary">
                        {index % 2 === 0 ? (
                          <>
                            <span className="md:hidden">•</span>
                            <span className="hidden md:inline">•</span>
                          </>
                        ) : (
                          "•"
                        )}
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Center dot */}
              <div className="hidden md:flex items-center justify-center relative z-10">
                <div className="w-4 h-4 rounded-full bg-primary border-4 border-background" />
              </div>

              {/* Empty space for alternate layout */}
              <div
                className={
                  index % 2 === 0 ? "hidden md:block" : "hidden md:block"
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
