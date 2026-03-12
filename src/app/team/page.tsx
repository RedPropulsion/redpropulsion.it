import Image from 'next/image';
import TeamTabs, { Member, Department } from '../../components/TeamTabs';
import teamData from '../../content/team_page.json';

export function generateMetadata() {
  return {
    title: "Team",
    description: teamData.banner.description,
  };
}

export default function TeamPage() {
  const { banner, departments, board } = teamData;
  
  // Board = explicit board members + department members who have a boardRole
  const departmentsData = departments as Department[];
  const boardData = board as { members: Member[] };

  const boardMembers: Member[] = [
    ...boardData.members,
    ...departmentsData.flatMap((d) => d.members.filter((m) => m.boardRole)),
  ];

  return (
    <main className="min-h-screen pb-32 md:pb-40 relative z-10 bg-background-dark">
      {/* Banner section */}
      <section
        className="w-full relative h-[40vh] min-h-[320px] flex items-center justify-center border-b border-white/10"
      >
        <Image
          src={banner.backgroundImage}
          alt="Team Banner Background"
          fill
          priority
          className="object-cover object-[center_35%] opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-background-dark/50 to-background-dark" />

        <div className="relative z-10 text-center px-4 mt-20 animate-fade-in-up delay-100">
          <h1 className="text-6xl md:text-8xl font-condensed font-bold uppercase text-gradient drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] mb-4">
            {banner.title}
          </h1>
          <p className="font-condensed text-foreground-dim text-lg md:text-xl max-w-md mx-auto leading-relaxed">
            {banner.description}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-16 md:mt-24">
         <TeamTabs departments={departmentsData} boardMembers={boardMembers} />
      </div>
    </main>
  );
}
