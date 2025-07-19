export function FagriLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`bg-fagri-green rounded-full flex items-center justify-center shadow-lg ${className}`}>
      <div className="w-2/3 h-2/3 border-2 border-white rounded-lg flex items-center justify-center">
        <div className="w-1/2 h-1/2 bg-white rounded-sm flex items-center justify-center">
          <svg className="w-3 h-3 text-fagri-green" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4zm2 2V5h1v1h-1z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
}
