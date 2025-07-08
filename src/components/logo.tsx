import React from 'react';

const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    {/* Mannequin Head */}
    <circle cx="12" cy="4" r="2" />
    {/* Mannequin Torso */}
    <path d="M12 7c-2.484 0-4.5 2.016-4.5 4.5V14h9v-2.5C16.5 9.016 14.484 7 12 7z" />
    {/* Stand */}
    <path d="M11 15h2v5h3v2H8v-2h3v-5z" />
  </svg>
);


export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-primary rounded-lg p-2">
        <LogoIcon className="h-6 w-6 text-primary-foreground" />
      </div>
      <h1 className="text-2xl font-bold font-headline">
        Perfect<span className="text-accent">Fit</span>
      </h1>
    </div>
  );
}
