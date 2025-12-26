interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <svg 
        className={`${sizeClasses[size]} text-blue-600`} 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle */}
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" fill="none"/>
        
        {/* Code brackets */}
        <path 
          d="M12 14L8 20L12 26" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M28 14L32 20L28 26" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        {/* Center "A" for AzFad */}
        <path 
          d="M16 26L20 14L24 26M17.5 22H22.5" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      
      <div className="flex flex-col">
        <span className="text-xl font-bold text-blue-900">AzFad</span>
        <span className="text-sm text-gray-600 -mt-1">Coding Academy</span>
      </div>
    </div>
  )
}