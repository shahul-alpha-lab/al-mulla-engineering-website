import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EngineeringSVGBackground from "./EngineeringBackground";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Kuwait Oil Fields Expansion",
    category: "Oil & Gas",
    location: "Kuwait",
    year: "2023",
    value: "$450M",
  },
  {
    id: 2,
    title: "Dubai Metro Blue Line",
    category: "Infrastructure",
    location: "UAE",
    year: "2022",
    value: "$1.2B",
  },
  {
    id: 3,
    title: "Riyadh Power Station",
    category: "Power Generation",
    location: "Saudi Arabia",
    year: "2023",
    value: "$320M",
  },
  {
    id: 4,
    title: "Qatar Desalination Plant",
    category: "Water Treatment",
    location: "Qatar",
    year: "2024",
    value: "$280M",
  },
  {
    id: 5,
    title: "Bahrain Industrial Complex",
    category: "Industrial",
    location: "Bahrain",
    year: "2023",
    value: "$180M",
  },
  {
    id: 6,
    title: "Oman Gas Pipeline",
    category: "Oil & Gas",
    location: "Oman",
    year: "2024",
    value: "$520M",
  },
];

const FeatureSelection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-header", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  // Animate on index change
  useEffect(() => {
    gsap.fromTo(
      ".project-display",
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
    );
  }, [currentIndex]);

  const currentProject = projects[currentIndex];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-section-alt overflow-hidden"
    >
      <EngineeringSVGBackground intensity="medium" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="projects-header text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            strong commitment to quality and collaboration
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Ongoing Projects
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Main Project Display */}
        <div
          className="max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Project Visual */}
            <div className="project-display relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
              {/* Blueprint overlay */}
              <div className="absolute inset-0 blueprint-pattern opacity-30" />

              {/* Grid lines animation */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 300"
                fill="none"
              >
                {/* Technical grid */}
                <defs>
                  <pattern
                    id="grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-primary"
                      opacity="0.2"
                    />
                  </pattern>
                </defs>
                <rect width="400" height="300" fill="url(#grid)" />

                {/* Animated frame */}
                <rect
                  x="20"
                  y="20"
                  width="360"
                  height="260"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary"
                  opacity="0.3"
                />
                <rect
                  x="30"
                  y="30"
                  width="340"
                  height="240"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-primary"
                  opacity="0.2"
                  strokeDasharray="5,5"
                />

                {/* Corner details */}
                <path
                  d="M20 50 L20 20 L50 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary"
                  opacity="0.5"
                />
                <path
                  d="M350 20 L380 20 L380 50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary"
                  opacity="0.5"
                />
                <path
                  d="M380 250 L380 280 L350 280"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary"
                  opacity="0.5"
                />
                <path
                  d="M50 280 L20 280 L20 250"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary"
                  opacity="0.5"
                />
              </svg>

              {/* Project number */}
              <div className="absolute top-6 left-6 text-8xl font-bold text-primary/10">
                {String(currentIndex + 1).padStart(2, "0")}
              </div>

              {/* Category badge */}
              <div className="absolute top-8 right-8 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                {currentProject.category}
              </div>

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M3 21h18M5 21V7l7-4 7 4v14" />
                    <path d="M9 21V12h6v9" />
                  </svg>
                </div>
              </div>

              {/* Location marker */}
              <div className="absolute bottom-8 left-8 flex items-center gap-2 text-foreground">
                <svg
                  className="w-5 h-5 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="font-medium">{currentProject.location}</span>
              </div>
            </div>

            {/* Project Info */}
            <div className="project-display">
              <div className="mb-4">
                <span className="text-sm text-muted-foreground">
                  {currentProject.year}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {currentProject.title}
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                A landmark {currentProject.category.toLowerCase()} project
                demonstrating our engineering excellence and commitment to
                delivering world-class infrastructure in{" "}
                {currentProject.location}.
              </p>

              <div className="flex items-center gap-8 mb-8">
                <div>
                  <div className="text-sm text-muted-foreground">
                    Project Value
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {currentProject.value}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Category</div>
                  <div className="text-lg font-semibold text-foreground">
                    {currentProject.category}
                  </div>
                </div>
              </div>

              <button className="flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all group">
                View Project Details
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Project Thumbnails */}
          <div className="flex justify-center gap-3 mt-12">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  index === currentIndex
                    ? "border-primary shadow-lg scale-110"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <div className="absolute inset-0 bg-primary/10 blueprint-pattern" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSelection;
