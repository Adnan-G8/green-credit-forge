interface FagriLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function FagriLogo({ className = "", size = 'md' }: FagriLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Outer Circle */}
        <circle 
          cx="100" 
          cy="100" 
          r="95" 
          fill="none" 
          stroke="#2d5a27" 
          strokeWidth="8"
        />
        
        {/* Lock Symbol */}
        <g transform="translate(100, 70)">
          {/* Lock Body */}
          <rect 
            x="-15" 
            y="5" 
            width="30" 
            height="25" 
            rx="3" 
            fill="#2d5a27"
          />
          
          {/* Lock Shackle */}
          <path 
            d="M -10 5 Q -10 -5 0 -5 Q 10 -5 10 5" 
            fill="none" 
            stroke="#2d5a27" 
            strokeWidth="4"
            strokeLinecap="round"
          />
          
          {/* Lock Keyhole */}
          <circle cx="0" cy="15" r="3" fill="white" />
          <rect x="-1" y="15" width="2" height="8" fill="white" />
        </g>
        
        {/* Plant/Tree Symbol inside Lock */}
        <g transform="translate(100, 85)">
          {/* Tree trunk */}
          <rect x="-2" y="10" width="4" height="12" fill="#2d5a27" />
          
          {/* Leaves/branches */}
          <path 
            d="M 0 10 Q -8 5 -12 10 Q -8 15 0 10 Q 8 15 12 10 Q 8 5 0 10" 
            fill="#2d5a27"
          />
          
          {/* Small leaves */}
          <circle cx="-8" cy="8" r="2" fill="#2d5a27" />
          <circle cx="8" cy="8" r="2" fill="#2d5a27" />
          <circle cx="0" cy="5" r="2" fill="#2d5a27" />
        </g>
        
        {/* Protective Hands */}
        <g transform="translate(100, 130)">
          {/* Left Hand */}
          <path 
            d="M -25 0 Q -30 -5 -35 0 Q -30 10 -25 15 Q -20 20 -15 15 Q -20 5 -25 0" 
            fill="#2d5a27"
          />
          
          {/* Right Hand */}
          <path 
            d="M 25 0 Q 30 -5 35 0 Q 30 10 25 15 Q 20 20 15 15 Q 20 5 25 0" 
            fill="#2d5a27"
          />
          
          {/* Hand Details */}
          <g stroke="#2d5a27" strokeWidth="1" fill="none">
            <path d="M -30 5 Q -28 8 -26 10" />
            <path d="M -28 2 Q -26 5 -24 7" />
            <path d="M 30 5 Q 28 8 26 10" />
            <path d="M 28 2 Q 26 5 24 7" />
          </g>
        </g>
        
        {/* Root System */}
        <g transform="translate(100, 155)" stroke="#2d5a27" strokeWidth="2" fill="none">
          <path d="M 0 0 Q -10 5 -15 10" />
          <path d="M 0 0 Q 10 5 15 10" />
          <path d="M 0 0 Q -5 8 -8 15" />
          <path d="M 0 0 Q 5 8 8 15" />
        </g>
      </svg>
    </div>
  );
}