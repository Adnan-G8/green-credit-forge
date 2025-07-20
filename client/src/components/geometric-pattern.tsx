export function GeometricPattern() {
  return (
    <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
      <div className="w-80 h-80 grid grid-cols-4 gap-1">
        {/* Row 1 */}
        <div className="aspect-square bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center border border-white/20">
          <div className="w-8 h-8 bg-black rounded opacity-80"></div>
        </div>
        <div className="aspect-square bg-black border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10"></div>
          <div className="absolute top-0 right-0 w-full h-full border-r-2 border-white/30 transform rotate-45 origin-top-right"></div>
        </div>
        <div className="aspect-square bg-gradient-to-br from-blue-500 to-blue-700 border border-white/20 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-black rounded-full"></div>
          <div className="w-8 h-1 bg-black absolute"></div>
        </div>
        <div className="aspect-square bg-gradient-to-br from-blue-400 to-blue-600 border border-white/20 flex items-center justify-center">
          <div className="w-10 h-10 bg-black"></div>
        </div>

        {/* Row 2 */}
        <div className="aspect-square bg-black border border-white/20"></div>
        <div className="aspect-square bg-gradient-to-br from-blue-500 to-blue-700 border border-white/20"></div>
        <div className="aspect-square bg-black border border-white/20"></div>
        <div className="aspect-square bg-black border border-white/20 relative">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full gap-0.5 p-2">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="w-1 h-1 bg-white rounded-full opacity-60"></div>
            ))}
          </div>
        </div>

        {/* Row 3 */}
        <div className="aspect-square bg-gradient-to-br from-blue-400 to-blue-600 border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-2 border-white transform rotate-45"></div>
            <div className="absolute w-8 h-8 border-2 border-white transform rotate-45"></div>
          </div>
          <div className="absolute top-0 left-0 w-full h-0.5 bg-white"></div>
          <div className="absolute bottom-0 right-0 w-full h-0.5 bg-white"></div>
          <div className="absolute top-0 left-0 w-0.5 h-full bg-white"></div>
          <div className="absolute bottom-0 right-0 w-0.5 h-full bg-white"></div>
        </div>
        <div className="aspect-square bg-black border border-white/20 relative">
          <div className="absolute inset-2 space-y-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-full h-1 bg-white"></div>
            ))}
          </div>
        </div>
        <div className="aspect-square bg-gradient-to-br from-blue-500 to-blue-700 border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full absolute -top-2 -right-2"></div>
          </div>
        </div>
        <div className="aspect-square bg-gradient-to-br from-blue-400 to-blue-600 border border-white/20 relative overflow-hidden flex items-center justify-center">
          <div className="w-12 h-12 relative">
            <div className="absolute inset-0 bg-black rounded-full"></div>
            <div className="absolute inset-1 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white transform rotate-45"></div>
            </div>
          </div>
          <div className="absolute top-2 right-2">
            <div className="w-4 h-4 border border-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}