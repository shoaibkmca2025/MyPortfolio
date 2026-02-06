
import React, { useState, useEffect } from 'react';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isPulling, setIsPulling] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setIsPulling(true);
    setTimeout(() => {
      setTheme(prev => prev === 'dark' ? 'light' : 'dark');
      setIsPulling(false);
    }, 300);
  };

  return (
    <div className="fixed top-0 right-10 z-[100] h-64 flex flex-col items-center select-none">
      {/* The Thick Rope */}
      <div 
        className="w-2.5 h-40 relative rope-container shadow-sm border-x border-black/10"
        style={{
          background: `repeating-linear-gradient(
            45deg,
            #d1d5db,
            #d1d5db 4px,
            #9ca3af 4px,
            #9ca3af 8px
          )`,
          borderRadius: '0 0 4px 4px'
        }}
      >
        {/* Top ceiling attachment */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-3 bg-black/20 blur-[2px] rounded-full"></div>
        
        {/* The Pull Handle (Large Knot) */}
        <div 
          onClick={toggleTheme}
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 cursor-pointer transition-transform duration-300 ease-out group ${isPulling ? 'pull-active' : ''}`}
        >
          {/* Main Knot Body */}
          <div className="relative mt-[-10px]">
            {/* The Knot handle */}
            <div className="w-12 h-12 rounded-full bg-white shadow-2xl border-4 border-gray-200 flex items-center justify-center relative z-20 overflow-hidden group-hover:scale-110 transition-transform active:scale-90">
              {/* Knot Texture Pattern */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `repeating-conic-gradient(#000 0% 25%, transparent 0% 50%)`,
                backgroundSize: '4px 4px'
              }}></div>
              
              {/* Dynamic Icon */}
              <i className={`fa-solid ${theme === 'dark' ? 'fa-sun text-orange-500' : 'fa-moon text-blue-600'} text-xl relative z-10 transition-all duration-500 ${isPulling ? 'scale-150' : 'scale-100'}`}></i>
            </div>

            {/* Frayed rope ends below knot */}
            <div className="flex justify-center gap-0.5 mt-[-4px] relative z-10">
              {[1, 2, 3, 4].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1.5 h-6 bg-gray-300 rounded-full"
                  style={{ 
                    transform: `rotate(${i * 8 - 12}deg)`,
                    opacity: 0.8 - (i * 0.1)
                  }}
                ></div>
              ))}
            </div>

            {/* Hanging Label (Note) */}
            <div className="absolute top-1/2 left-14 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
               <div className="bg-white text-black px-3 py-1.5 text-[10px] font-mono font-black uppercase tracking-widest shadow-lg border-l-4 border-accent">
                 Switch to {theme === 'dark' ? 'Light' : 'Dark'}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
