import Image from "@/components/ResponsiveImage";
import type { Metadata } from "next";
import content from "@/content/projects_page.json";
import { validateProjects } from "@/lib/content-validation.mjs";

validateProjects(content);

export const metadata: Metadata = {
  title: "Progetti",
  description: content.description,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <main className="relative z-10 min-h-screen px-5 pb-32 pt-36 sm:px-8 md:pb-40 md:pt-44">
      <div className="mx-auto max-w-5xl">
        <header className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <h1 className="animate-fade-in-up delay-100 text-gradient mb-6 text-balance font-condensed text-[clamp(2.75rem,7vw,6rem)] font-bold uppercase leading-none">
            {content.title}
          </h1>
          <p className="animate-fade-in-up delay-300 text-pretty font-condensed text-lg leading-relaxed text-foreground-dim md:text-xl">
            {content.description}
          </p>
        </header>

        <div className="animate-fade-in-up delay-500 space-y-6">
          {content.projects.map((project, index) => {
            const positions = project.roles.reduce((sum, role) => sum + role.positions, 0);
            return (
              <details key={project.title} style={{ clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }} className="project-card group overflow-hidden border border-white/10 bg-white/5 transition-colors duration-300 hover:border-white/25 open:border-primary/40 open:bg-white/[0.07]">
                <summary className="project-summary scroll-mt-28 grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_24px] items-center gap-x-4 gap-y-5 p-5 sm:grid-cols-[140px_minmax(0,1fr)_24px] sm:gap-x-7 sm:p-7 lg:grid-cols-[190px_minmax(0,1fr)_24px] lg:gap-x-10 lg:p-9">
                  <div className="col-span-2 mx-auto w-full max-w-[180px] sm:col-span-1 sm:max-w-none">
                  <Image loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} sizes="(max-width: 639px) 180px, (max-width: 1023px) 140px, 190px" className="h-28 w-full object-contain sm:h-36 lg:h-44" />
                  </div>
                  <div className="min-w-0">
                    <span className="mb-3 block font-condensed text-sm uppercase tracking-[0.2em] text-foreground-dim">
                      {project.tag}
                    </span>
                    <h2 className="mb-4 break-words text-balance font-orbitron text-[clamp(1.125rem,2.4vw,1.75rem)] font-medium leading-snug text-gray-200 transition-colors group-hover:text-white">
                      {project.title}
                    </h2>
                    <p className="font-condensed text-lg leading-relaxed text-foreground-dim">
                      {project.tagline}
                    </p>
                    <span className="mt-4 block font-condensed text-base text-gray-200">
                      {positions} ruoli aperti
                    </span>
                  </div>
                  <svg className="h-6 w-6 shrink-0 text-primary transition-transform duration-300 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>

                <div className="border-t border-white/10 p-5 sm:p-7 lg:p-9">
                  <p className="mb-10 max-w-3xl font-condensed text-lg leading-8 text-foreground-dim">{project.description}</p>
                  <h3 className="mb-5 font-orbitron text-lg font-medium text-gray-200">Ruoli disponibili</h3>
                  <dl className="mb-10 divide-y divide-white/10 border-y border-white/10">
                    {project.roles.map((role) => (
                      <div key={role.title} className="grid gap-3 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-10">
                        <dt className="font-condensed text-xl font-medium leading-snug text-gray-200">
                          {role.title}
                          {role.positions > 1 && <span className="ml-2 inline-block text-base text-foreground-dim" aria-label={`${role.positions} posti`}>×{role.positions}</span>}
                        </dt>
                        <dd className="font-condensed text-lg leading-relaxed text-foreground-dim">{role.description}</dd>
                      </div>
                    ))}
                  </dl>
                  <a href={project.applicationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex scroll-mt-28 min-h-14 w-full items-center justify-center rocket-gradient px-6 py-4 text-center text-white font-condensed text-lg font-bold uppercase tracking-wider transition-opacity hover:opacity-90 active:opacity-80 sm:w-auto sm:text-xl" style={{ clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }}>
                    {project.applicationLabel}
                  </a>
                  <p className="mt-4 font-condensed text-base text-foreground-dim">{project.applicationNote}</p>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </main>
  );
}
