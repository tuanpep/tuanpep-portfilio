"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  title: string;
  description: string;
  duration: string;
  image: string;
  links: {
    website?: string;
    twitter?: string;
  };
  achievements: string[];
  technologies: string[];
};

const projects: Project[] = [
  {
    id: "whales-market",
    title: "Whales Market",
    description:
      "Ultimate OTC DEX for trading Pre-listing allocations. Whales Market offers a decentralized OTC trading platform for users to directly exchange assets across multiple blockchains, with complete trustlessness and security guaranteed.",
    duration: "10/2023 - Present",
    image: "/projects/whales-market.jpg",
    links: {
      website: "https://whales.market/",
      twitter: "https://x.com/WhalesMarket",
    },
    achievements: [
      "Developed and launched MVP within 3 months",
      "Implemented multi-chain support for 5+ EVM chains and Solana",
      "Built secure wallet integration supporting MetaMask, Phantom, and other popular wallets",
      "Created admin dashboard handling 1000+ daily transactions",
      "Optimized transaction processing reducing gas fees by 20%",
      "Implemented real-time transaction monitoring and status updates",
    ],
    technologies: [
      "Next.js",
      "ethers.js",
      "web3.js",
      "Wagmi",
      "@solana/web3.js",
      "Anchor",
      "TailwindCSS",
      "Shadcn UI",
      "React Query",
      "Zustand",
    ],
  },
  {
    id: "gm-ai",
    title: "GM.AI",
    description:
      "gmAI: The Operational Layer for Solana AI, an innovative artificial intelligence solution designed specifically for the Solana blockchain ecosystem.",
    duration: "6/2024 - 9/2024",
    image: "/projects/gm-ai.jpg",
    links: {
      website: "https://gm.ai/",
      twitter: "https://x.com/gm_dot_ai",
    },
    achievements: [
      "Developed and launched GM-ID minting platform on Solana",
      "Created Telegram mini-app with 10,000+ active users",
      "Implemented secure wallet integration with Phantom and Solflare",
      "Built real-time transaction monitoring system",
      "Optimized RPC calls reducing latency by 30%",
    ],
    technologies: [
      "@solana/web3.js",
      "Anchor",
      "Next.js",
      "Shadcn UI",
      "WebSocket",
      "React Query",
    ],
  },
  {
    id: "personaify",
    title: "Personaify.ai",
    description:
      "AI-powered document processing platform that transforms unstructured data into actionable insights.",
    duration: "1/2023 - 10/2023",
    image: "/projects/personaify.jpg",
    links: {
      website: "https://personaify.ai/",
    },
    achievements: [
      "Architected and implemented responsive UI components using React and Shadcn UI",
      "Developed real-time document processing and visualization features",
      "Integrated AI-powered chat interface with 95% user satisfaction rate",
      "Optimized performance to handle 10,000+ documents simultaneously",
      "Implemented automated testing covering 85% of codebase",
    ],
    technologies: [
      "React.js",
      "Material UI",
      "TypeScript",
      "REST APIs",
      "WebSocket",
    ],
  },
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      projectRefs.current.forEach((ref, index) => {
        gsap.fromTo(
          ref,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3 * index,
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
      id="projects"
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-muted/30"
    >
      <div className="container">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Web3 Projects
        </h2>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                projectRefs.current[index] = el;
              }}
              className={cn(
                "grid md:grid-cols-2 gap-8 rounded-lg overflow-hidden",
                index % 2 === 1 && "md:grid-flow-dense"
              )}
            >
              <div
                className={cn(
                  "relative h-[300px] md:h-auto rounded-lg overflow-hidden border border-border shadow-lg group",
                  index % 2 === 1 && "md:col-start-2"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div
                className={cn(
                  "space-y-4 flex flex-col",
                  index % 2 === 1 && "md:col-start-1"
                )}
              >
                <div>
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {project.duration}
                  </p>
                </div>

                <p className="text-muted-foreground">{project.description}</p>

                <div className="space-y-2">
                  <h4 className="font-semibold">Key Achievements:</h4>
                  <ul className="space-y-1 text-sm">
                    {project.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-auto pt-4">
                  {project.links.website && (
                    <a
                      href={project.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <WebsiteIcon className="h-4 w-4" />
                      <span>Website</span>
                    </a>
                  )}
                  {project.links.twitter && (
                    <a
                      href={project.links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <TwitterIcon className="h-4 w-4" />
                      <span>Twitter</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WebsiteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
