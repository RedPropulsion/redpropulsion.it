"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FaqItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

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
                className="w-full flex items-center justify-between cursor-pointer p-4 md:p-6 font-orbitron text-base md:text-xl text-left text-gray-200 hover:text-white transition-colors duration-300"
            >
                <span>{question}</span>
                <ChevronDown
                    className={`ml-4 text-primary flex-shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${isOpen ? "rotate-180" : ""}`}
                    size={24}
                />
            </button>

            <div
                className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${isOpen ? "grid-rows-[1fr] opacity-100 mb-6" : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="overflow-hidden px-6 text-lg font-condensed leading-8 text-foreground-dim selection:bg-primary/30">
                    <div className="border-t border-white/10 pt-6">
                        {answer}
                    </div>
                </div>
            </div>
        </div>
    );
}
