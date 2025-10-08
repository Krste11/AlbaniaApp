export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background circle with gradient */}
          <circle cx="20" cy="20" r="18" fill="url(#gradient1)" />
          
          {/* Circuit board pattern */}
          <path d="M12 12 L28 12 M12 16 L28 16 M12 20 L28 20 M12 24 L28 24 M12 28 L28 28" 
                stroke="white" strokeWidth="1.5" opacity="0.3" />
          <path d="M12 12 L12 28 M16 12 L16 28 M20 12 L20 28 M24 12 L24 28 M28 12 L28 28" 
                stroke="white" strokeWidth="1.5" opacity="0.3" />
          
          {/* CPU chip icon */}
          <rect x="14" y="14" width="12" height="12" rx="2" fill="white" />
          <rect x="16" y="16" width="8" height="8" rx="1" fill="url(#gradient2)" />
          
          {/* Circuit pins */}
          <circle cx="12" cy="16" r="1.5" fill="#8b5cf6" />
          <circle cx="12" cy="20" r="1.5" fill="#ec4899" />
          <circle cx="12" cy="24" r="1.5" fill="#6366f1" />
          <circle cx="28" cy="16" r="1.5" fill="#10b981" />
          <circle cx="28" cy="20" r="1.5" fill="#f59e0b" />
          <circle cx="28" cy="24" r="1.5" fill="#06b6d4" />
          
          <defs>
            <linearGradient id="gradient1" x1="0" y1="0" x2="40" y2="40">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="gradient2" x1="16" y1="16" x2="24" y2="24">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          TechMarket
        </span>
        <span className="text-xs text-muted-foreground">.mk</span>
      </div>
    </div>
  );
}
