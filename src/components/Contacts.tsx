import { Mail, Github, Instagram, Linkedin, MapPin } from "lucide-react";
import Content from "@/content/footer.json";

export default function Contacts() {
    const email = "info@redpropulsion.it";

    return (
        <main className="min-h-screen pb-32 md:pb-40 relative z-10">
            {/* Page Header */}
            <section className="w-full relative h-[40vh] min-h-[320px] flex items-center justify-center">
                <div className="relative z-10 text-center px-4 mt-20 animate-fade-in-up delay-100">
                    <h1 className="text-6xl md:text-8xl font-condensed font-bold uppercase text-gradient mb-4">
                        Contatti
                    </h1>
                    <p className="font-condensed text-foreground-dim text-lg md:text-xl max-w-md mx-auto leading-relaxed">
                        Entra in contatto con il team Red Propulsion.
                    </p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-6 mt-2 md:mt-6">
                {/* Main Content Grid — with entry animation */}
                <div className="animate-fade-in-up delay-300 grid md:grid-cols-2 gap-12 md:gap-16">

                    {/* Email Card */}
                    <div
                        className="relative p-8 md:p-10 border border-white/10 bg-white/5 backdrop-blur-sm"
                        style={{ clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }}
                    >
                        <div className="flex items-start gap-5 mb-6">
                            <div className="w-12 h-12 flex items-center justify-center border border-white/10 bg-white/5"
                                style={{ clipPath: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)" }}>
                                <Mail size={20} className="text-white/50" />
                            </div>
                            <div>
                                <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2">
                                    Email
                                </div>
                                <div className="text-xl md:text-2xl font-condensed font-bold text-white">
                                    {email}
                                </div>
                            </div>
                        </div>
                        <p className="font-condensed text-sm text-foreground-dim/60 leading-relaxed">
                            Per collaborazioni, sponsorizzazioni o informazioni generali.
                        </p>
                    </div>

                    {/* Location Card */}
                    <div
                        className="relative p-8 md:p-10 border border-white/10 bg-white/5 backdrop-blur-sm"
                        style={{ clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }}
                    >
                        <div className="flex items-start gap-5 mb-6">
                            <div className="w-12 h-12 flex items-center justify-center border border-white/10 bg-white/5"
                                style={{ clipPath: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)" }}>
                                <MapPin size={20} className="text-white/50" />
                            </div>
                            <div>
                                <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2">
                                    Sede
                                </div>
                                <div className="text-xl md:text-2xl font-condensed font-bold text-white">
                                    Firenze, Italia
                                </div>
                            </div>
                        </div>
                        <p className="font-condensed text-sm text-foreground-dim/60 leading-relaxed">
                            Università degli Studi di Firenze — Dipartimenti DIEF e DINFO, Scuola di Ingegneria.
                        </p>
                        <div className="mt-6 flex gap-6 font-mono text-[10px] text-white/25 uppercase tracking-widest">
                            <span>43.7992° N</span>
                            <span>11.2501° E</span>
                        </div>
                    </div>
                </div>

                {/* Social Links — with entry animation */}
                <div className="animate-fade-in-up delay-500 mt-12 md:mt-16">
                    <div className="text-center mb-10">
                        <h2 className="font-condensed text-xl md:text-2xl font-bold text-white mb-2">Seguici</h2>
                        <p className="font-condensed text-sm text-foreground-dim/50">Resta connesso attraverso i nostri canali.</p>
                    </div>

                    <div className="flex justify-center gap-6 md:gap-8">
                        {Content.social_links.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visita il nostro profilo ${social.name}`}
                                className="group relative flex flex-col items-center justify-center gap-3 w-20 h-20 md:w-28 md:h-28 border border-white/10 bg-white/5 hover:border-primary/40 hover:bg-white/10 transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)]"
                                style={{ clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }}
                            >
                                <div className="text-white/40 group-hover:text-primary group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)]">
                                    {social.name === "Github" && <Github size={24} />}
                                    {social.name === "Instagram" && <Instagram size={24} />}
                                    {social.name === "Linkedin" && <Linkedin size={24} />}
                                </div>
                                <span className="font-mono text-[9px] text-white/30 group-hover:text-white/60 uppercase tracking-[0.15em] transition-colors duration-500">
                                    {social.name}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
