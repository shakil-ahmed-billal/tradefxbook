'use client';

import React, { useState, useEffect } from 'react';

interface TopbarProps {
  title: string;
  date?: string;
}

export default function Topbar({ title }: TopbarProps) {
  const [time, setTime] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDateStr(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header style={{
      height: 72,
      borderBottom: '1px solid #232a3a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      position: 'sticky',
      top: 0,
      background: 'rgba(10,13,20,.78)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      zIndex: 10,
      flexShrink: 0,
    }}>
      {/* Left: Title + Date */}
      <div>
        <h1 style={{
          fontFamily: 'var(--font-sora)',
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: '-0.01em',
          margin: 0,
          color: '#eef1f8',
        }}>{title}</h1>
        <span style={{
          fontSize: 12,
          color: '#565e73',
          fontFamily: 'var(--font-jetbrains-mono)',
          marginTop: 2,
          display: 'block',
        }}>{dateStr}</span>
      </div>

      {/* Center: Search */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: '#161b27',
        border: '1px solid #232a3a',
        padding: '8px 12px',
        borderRadius: 9,
        width: 280,
        color: '#565e73',
        fontSize: 13,
      }}>
        <svg style={{ width: 15, height: 15, flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>
        </svg>
        <span>Search trades, symbols…</span>
        <span style={{
          marginLeft: 'auto',
          fontFamily: 'var(--font-jetbrains-mono)',
          fontSize: 10,
          background: '#1c2230',
          padding: '2px 6px',
          borderRadius: 4,
          color: '#565e73',
        }}>Ctrl K</span>
      </div>

      {/* Right: Clock + Notifications + Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Clock */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          fontFamily: 'var(--font-jetbrains-mono)',
          fontSize: 12.5,
          color: '#8d94a8',
          padding: '8px 12px',
          border: '1px solid #232a3a',
          borderRadius: 10,
          background: '#161b27',
        }}>
          <svg style={{ width: 14, height: 14 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/>
          </svg>
          {time || '12:00:00 AM'}
        </div>

        {/* Notifications */}
        <button style={{
          width: 38, height: 38,
          border: '1px solid #232a3a',
          background: '#161b27',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#8d94a8',
          position: 'relative',
          cursor: 'pointer',
          flexShrink: 0,
        }} aria-label="Notifications">
          <svg style={{ width: 17, height: 17 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.27 21a2 2 0 0 0 3.46 0"/>
            <path d="M3.26 15.33A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.67C19.41 13.96 18 12.5 18 8a6 6 0 0 0-12 0c0 4.5-1.41 5.96-2.74 7.33"/>
          </svg>
          <span style={{
            position: 'absolute', top: 8, right: 9,
            width: 6, height: 6, borderRadius: '50%',
            background: '#ff5c7a',
            boxShadow: '0 0 0 2px #161b27',
          }} />
        </button>

        {/* Avatar */}
        <div style={{
          width: 38, height: 38,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3a4356, #242a38)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-sora)',
          fontWeight: 700,
          fontSize: 13,
          color: '#eef1f8',
          flexShrink: 0,
        }}>
          SH
        </div>
      </div>
    </header>
  );
}
