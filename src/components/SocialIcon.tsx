import { Github, Instagram, Linkedin } from "lucide-react";

/** Shared brand glyphs keep footer and contact links visually consistent. */
export default function SocialIcon({ name }: { name: string }) {
    const Icon = { github: Github, instagram: Instagram, linkedin: Linkedin }[name.toLowerCase()];
    return Icon ? <Icon size={24} strokeWidth={1.75} aria-hidden="true" /> : null;
}
