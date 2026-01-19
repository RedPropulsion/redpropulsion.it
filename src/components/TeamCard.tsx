import React from 'react';
import styles from './TeamCard.module.css';

interface TeamCardProps {
  firstName: string;
  lastName?: string;
  role: string;
  linkedin?: string;
  imgSrc?: string;
  isHead?: boolean | string;
}

export default function TeamCard({ firstName, lastName, role, linkedin, imgSrc, isHead }: TeamCardProps) {
  const src = imgSrc;
  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

  return (
    <div className={`${styles.card} ${isHead ? styles.cardHead : ''}`}>
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <img src={src} alt={`${fullName} photo`} className={styles.avatar} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))',
          color: 'white',
          padding: '10px',
          textAlign: 'center',
        }}>
          <div className={styles.name}>{fullName}</div>
          <div className={styles.role}>{role}</div>
        </div>
        {isHead && <div className={styles.badge}>{typeof isHead === 'string' ? isHead : 'Department Head'}</div>}
      </div>
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.linkedin} ${styles.hidden}`}
        >
          LinkedIn
        </a>
      )}
    </div>
  );
}
