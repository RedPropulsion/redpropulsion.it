"use client";

import React, { useState } from 'react';
import TeamCard from './TeamCard';

const PLACEHOLDER = '/placeholderRED.webp';
const PROFILE_PIC_DIR = '/profilePictures/25-26/';

// --- Types ---

export type Member = {
  firstName: string;
  lastName?: string;
  role: string;
  linkedin?: string;
  imgAvail?: boolean;
  isHead?: boolean | string;
  boardRole?: string;
};

export type Department = {
  title: string;
  head?: string;
  members: Member[];
};

type Props = {
  departments: Department[];
  boardMembers: Member[];
};

// --- Utility functions ---

/** Sort key based on surname (or firstName as fallback) */
function surnameKey(m: Member): string {
  return (m.lastName || m.firstName || '').trim().toLowerCase();
}

/** Sort members: heads first (alphabetical), then others (alphabetical) */
function orderMembers(members: Member[]): Member[] {
  const heads = members
    .filter((m) => m.isHead || m.boardRole)
    .sort((a, b) => surnameKey(a).localeCompare(surnameKey(b)));
  const others = members
    .filter((m) => !m.isHead && !m.boardRole)
    .sort((a, b) => surnameKey(a).localeCompare(surnameKey(b)));
  return [...heads, ...others];
}

/** Generate LinkedIn profile URL from a person's name or slug */
function toLinkedIn(val: string | undefined): string | undefined {
  if (!val || val.toLowerCase() === 'null') return undefined;
  // Ignore short placeholders/tags (e.g. "aes", "gr") - most real slugs are longer
  if (val.length < 4 && !val.startsWith('http')) return undefined;
  
  if (val.startsWith('http')) return val; // Already a URL
  const slug = val
    .toLowerCase()
    .replace(/[.']/g, '')
    .replace(/\s+/g, '-');
  return `https://linkedin.com/in/${slug}`;
}

/** Replace accented chars and remove punctuation for file name matching */
function sanitizeFileName(name: string): string {
  const accents: Record<string, string> = {
    'ò': 'o', 'è': 'e', 'à': 'a', 'é': 'e', 'ù': 'u', 'ì': 'i',
  };
  return name
    .replace(/[òèàéùì]/g, (char) => accents[char] || char)
    .replace(/[.'`´]/g, '')
    .replace(/\s+/g, '');
}

/** Build profile picture path for a member */
function getProfilePicture(m: Member): string {
  if (!m.imgAvail) return PLACEHOLDER;
  return `${PROFILE_PIC_DIR}${sanitizeFileName(m.firstName + (m.lastName || ''))}.webp`;
}

/** Build the LinkedIn URL for a member */
function getMemberLinkedIn(m: Member): string | undefined {
  // Only use the explicitly provided linkedin field, no fallback to name
  return toLinkedIn(m.linkedin);
}

// --- Component ---

export default function TeamTabs({ departments, boardMembers }: Props) {
  // Setup tabs
  const nonAvionics = departments.filter(d => !d.title.startsWith("Avionics"));
  const avionicsDepts = departments.filter(d => d.title.startsWith("Avionics"));

  // Top-level categories 
  const mainTabs = ['Board', 'Avionics', ...nonAvionics.map(d => d.title)];
  const [activeMainTab, setActiveMainTab] = useState('Board');

  // Select first sub-tab automatically if avionics is clicked
  const [activeSubTab, setActiveSubTab] = useState(avionicsDepts[0]?.title || "");

  // Determine which exact department data to show
  const currentActualTab = activeMainTab === 'Avionics' ? activeSubTab : activeMainTab;

  // Get active members
  const activeMembers = currentActualTab === 'Board'
    ? boardMembers
    : orderMembers(departments.find(d => d.title === currentActualTab)?.members || []);

  const leads = activeMembers.filter(m => m.isHead || m.boardRole);
  const regulars = activeMembers.filter(m => !m.isHead && !m.boardRole);

  return (
    <>
      {/* Navigation Tabs Container */}
      <div className="relative animate-fade-in-up delay-300 mb-8 md:mb-16 lg:mb-28 flex flex-col items-center">

        {/* Main Tabs — Industrial clip-path style */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 relative z-10">
          {mainTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveMainTab(tab)}
              className={`group/tab px-4 py-2 md:px-7 md:py-3 font-condensed font-bold text-xs md:text-base uppercase tracking-wider transition-all duration-500 cursor-pointer border ${activeMainTab === tab
                ? 'border-primary/60 bg-primary/10 text-white shadow-[0_0_15px_rgba(211,47,47,0.2)]'
                : 'border-white/20 bg-transparent text-white/70 hover:border-primary/50 hover:bg-primary/5 hover:text-white'
                }`}
              style={{
                clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)"
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div
          className={`md:absolute md:top-full left-0 right-0 mt-4 md:mt-6 flex flex-wrap justify-center gap-1 md:gap-2 transition-[max-height,opacity] ease-out relative z-20 ${activeMainTab === 'Avionics' ? 'max-h-20 opacity-100 pointer-events-auto duration-500' : 'max-h-0 overflow-hidden md:max-h-20 md:overflow-visible opacity-0 pointer-events-none duration-300 delay-200'}`}
        >
          {avionicsDepts.map((dept, i) => {
            // Extract "Electronics" from "Avionics — Electronics"
            const subName = dept.title.split("—")[1]?.trim() || dept.title;
            return (
              <button
                key={dept.title}
                onClick={() => setActiveSubTab(dept.title)}
                className={`relative group/sub px-3 md:px-5 py-2 font-condensed font-bold text-xs md:text-sm uppercase tracking-[0.25em] flex items-center justify-center cursor-pointer ease-out ${activeMainTab === 'Avionics' ? 'opacity-100 translate-y-0 transition-all duration-700' : 'opacity-0 -translate-y-2 transition-all duration-300'}`}
                style={{
                  transitionDelay: activeMainTab === 'Avionics'
                    ? `${i * 100 + 200}ms`
                    : `${(avionicsDepts.length - 1 - i) * 60}ms`
                }}
              >
                {/* Left Bracket - Shows on hover or if active */}
                <span className={`absolute left-1 transition-all duration-500 font-mono ${activeSubTab === dept.title ? 'opacity-100 translate-x-1 text-white' : 'opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-1 text-white/80'}`}>
                  [
                </span>
                
                {/* Text - Brighter and scales slightly on hover/active */}
                <span className={`px-2 transition-all duration-500 ${activeSubTab === dept.title ? 'text-white' : 'text-white/40 group-hover/sub:text-white/80'}`}>
                  {subName}
                </span>

                {/* Right Bracket - Shows on hover or if active */}
                <span className={`absolute right-1 transition-all duration-500 font-mono ${activeSubTab === dept.title ? 'opacity-100 -translate-x-1 text-white' : 'opacity-0 translate-x-2 group-hover/sub:opacity-100 group-hover/sub:-translate-x-1 text-white/80'}`}>
                  ]
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Members Grid with Fade Transition */}
      <div className="animate-fade-in-up delay-500" key={currentActualTab}>

        {/* Side-by-side layout: Leads on left, Regulars on right */}
        {leads.length > 0 && regulars.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

            {/* Left Column — Leads */}
            <div className={`${leads.length > 1 ? 'lg:w-[45%]' : 'lg:w-1/3'} flex-shrink-0 transition-all duration-500`}>
              <div className="font-mono text-[11px] text-white/40 uppercase tracking-[0.2em] mb-6">
                {activeMainTab === 'Board' ? 'Leadership' : 'Responsabili'}
              </div>
              <div className={`grid grid-cols-2 ${leads.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-3 md:gap-6`}>
                {leads.map((m, idx) => (
                  <TeamCard
                    key={`lead-${m.firstName}-${m.lastName ?? ''}-${idx}`}
                    firstName={m.firstName}
                    lastName={m.lastName}
                    role={m.role}
                    linkedin={getMemberLinkedIn(m)}
                    imgSrc={getProfilePicture(m)}
                    isHead={m.boardRole || m.isHead}
                    premium={m.boardRole === 'Team Lead'}
                  />
                ))}
              </div>
            </div>

            {/* Vertical Divider (desktop only) */}
            <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

            {/* Right Column — Regular Members */}
            <div className="flex-grow">
              <div className="font-mono text-[11px] text-white/40 uppercase tracking-[0.2em] mb-6">
                Membri
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-5">
                {regulars.map((m, idx) => (
                  <TeamCard
                    key={`reg-${m.firstName}-${m.lastName ?? ''}-${idx}`}
                    firstName={m.firstName}
                    lastName={m.lastName}
                    role={m.role}
                    linkedin={getMemberLinkedIn(m)}
                    imgSrc={getProfilePicture(m)}
                    isHead={false}
                    compact={true}
                  />
                ))}
              </div>
            </div>

          </div>
        ) : leads.length > 0 ? (
          /* Only leads (e.g. Board view with all leads and no regulars) */
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {leads.map((m, idx) => (
              <TeamCard
                key={`lead-${m.firstName}-${m.lastName ?? ''}-${idx}`}
                firstName={m.firstName}
                lastName={m.lastName}
                role={m.role}
                linkedin={getMemberLinkedIn(m)}
                imgSrc={getProfilePicture(m)}
                isHead={m.boardRole || m.isHead}
                premium={m.boardRole === 'Team Lead'}
              />
            ))}
          </div>
        ) : regulars.length > 0 ? (
          /* Only regulars (rare edge case) */
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {regulars.map((m, idx) => (
              <TeamCard
                key={`reg-${m.firstName}-${m.lastName ?? ''}-${idx}`}
                firstName={m.firstName}
                lastName={m.lastName}
                role={m.role}
                linkedin={getMemberLinkedIn(m)}
                imgSrc={getProfilePicture(m)}
                isHead={false}
                compact={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-foreground-dim font-condensed text-xl border border-white/10 bg-white/5 backdrop-blur-sm"
            style={{ clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }}>
            Nessun membro trovato per questo dipartimento.
          </div>
        )}

      </div>
    </>
  );
}
