// LogoIcon.jsx
const LogoIcon = ({ className = "h-8 w-8" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    className={className}
  >
    <defs>
      <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4FC3F7"/>
        <stop offset="100%" stopColor="#0288D1"/>
      </linearGradient>
      <linearGradient id="folderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF"/>
        <stop offset="100%" stopColor="#E3F2FD"/>
      </linearGradient>
    </defs>
    
    <path d="M20 60 C10 60, 5 50, 15 45 C15 35, 30 30, 40 35 C45 25, 65 25, 70 35 C80 35, 80 50, 70 50 L25 50 C20 50, 15 55, 20 60 Z" fill="url(#cloudGradient)"/>
    
    <rect x="37" y="40" width="16" height="12" rx="1.5" fill="url(#folderGradient)" opacity="0.95"/>
    <rect x="39" y="38" width="12" height="2.5" rx="1.2" fill="#E1F5FE"/>
    
    <circle cx="30" cy="65" r="2" fill="#4FC3F7" opacity="0.8"/>
    <circle cx="45" cy="68" r="1.5" fill="#29B6F6" opacity="0.9"/>
    <circle cx="60" cy="65" r="2" fill="#0288D1" opacity="0.7"/>
    
    <circle cx="25" cy="40" r="1" fill="#81D4FA" opacity="0.6"/>
    <circle cx="70" cy="42" r="1.2" fill="#4FC3F7" opacity="0.5"/>
  </svg>
);

export default LogoIcon;