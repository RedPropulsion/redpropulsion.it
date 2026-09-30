"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

export function FaqItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const panelId = useId();

    return (
        <div
            className={`group border transition-all duration-500 overflow-hidden ${isOpen ? "border-primary/40 bg-white/10" : "border-white/10 bg-white/5"
                }`}
            style={{
                clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)"
            }}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full flex items-center justify-between cursor-pointer p-4 md:p-6 font-condensed text-lg md:text-xl leading-snug text-left text-gray-200 hover:text-white transition-colors duration-300"
            >
                <span>{question}</span>
                <ChevronDown
                    className={`ml-4 text-primary flex-shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${isOpen ? "rotate-180" : ""}`}
                    size={24}
                />
            </button>

            <div
                id={panelId}
                aria-hidden={!isOpen}
                inert={!isOpen}
                hidden={!isOpen}
                className="mb-6"
            >
                <div className="px-4 md:px-6 pb-1 break-words text-lg font-condensed leading-8 text-foreground-dim selection:bg-primary/30">
                    <div className="border-t border-white/10 pt-6 whitespace-pre-line">
                        {answer}
                    </div>
                </div>
            </div>
        </div>
    );
}
