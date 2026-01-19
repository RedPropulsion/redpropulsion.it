import React from 'react';
import TeamCard from '../../components/TeamCard';
import teamData from '../../content/team_page.json';
import styles from '../../components/TeamCard.module.css';

const placeholder = '/placeholderRED.webp';

type Member = {
  firstName: string;
  lastName?: string;
  role: string;
  linkedin?: string;
  imgAvail?: boolean;
  isHead?: boolean;
};

type Department = {
  title: string;
  head?: string;
  members: Member[];
};

const departments: Department[] = teamData.departments;

function surnameKey(m: Member) {
  return (m.lastName || m.firstName || '').trim().toLowerCase();
}

function orderMembers(members: Member[]) {
  const heads = members
    .filter((m) => m.isHead)
    .sort((a, b) => surnameKey(a).localeCompare(surnameKey(b)));
  const others = members
    .filter((m) => !m.isHead)
    .sort((a, b) => surnameKey(a).localeCompare(surnameKey(b)));
  return [...heads, ...others];
}



function toLinkedIn(name: string) {
  if (!name || name.toLowerCase() === "null") return undefined;
  const slug = name
    .toLowerCase()
    .replace(/[.'’]+/g, '')
    .replace(/\s+/g, '-');
  return `https://linkedin.com/in/${slug}`;
}

function sanitizeFileName(name: string) {
  return name
    //.toLowerCase()
    .replace(/[òèàéùìù]/g, (char) => {
      const replacements: { [key: string]: string } = {'ò': 'o', 'è': 'e', 'à': 'a', 'é': 'e', 'ù': 'u', 'ì': 'i'};
      return replacements[char] || char; // Return the original character if not found
    })
    .replace(/[.''`´]/g, '')
    .replace(/\s+/g, '');
}


export default function TeamPage() {
  const { banner } = teamData;
  
  return (
    <main>
      <section style={{
        backgroundImage: `url(${banner.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: 'white',
        padding: '80px 24px',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 12px' }}>{banner.title}</h1>
          <p style={{ fontSize: '1.1rem', margin: 0, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            {banner.description}
          </p>
        </div>
      </section>
      <div style={{ padding: '24px', maxWidth: '80vw', margin: '0 auto' }}>
        {departments.map((dept) => (
          <section key={dept.title} style={{ margin: '40px 0' }}>
            <h2 className="text-gradient text-4xl font-condensed font-bold mb-6">
              {dept.title} <span style={{ fontSize: '0.8em', color: '#999' }}></span>
            </h2>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 16,
            }}>
              {orderMembers(dept.members).map((m, idx) => (
                <div key={`${m.firstName}-${m.lastName ?? ''}-${idx}`} className={styles.cardWrapper}>
                  <TeamCard
                    firstName={m.firstName}
                    lastName={m.lastName}
                    role={m.role}
                    linkedin={toLinkedIn(m.linkedin ?? `${m.firstName} ${m.lastName || ''}`)}
                    imgSrc={m.imgAvail ? "/profilePictures/25-26/" + sanitizeFileName(m.firstName + m.lastName) + ".webp" : placeholder} //TODO: add option to use specific year folder depending on the period seen on screen
                    isHead={m.isHead}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
