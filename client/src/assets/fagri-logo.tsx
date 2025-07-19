import fagriLogoPath from "@assets/Bildschirmfoto 2025-07-19 um 16.37.25_1752935848511.png";

export function FagriLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <img 
      src={fagriLogoPath} 
      alt="FAGRI Digital Logo" 
      className={`${className} object-contain`}
    />
  );
}
