

interface FallbackIdeaDiscSvgProps {
  isSplit: boolean;
  activeHotspot: number | null;
  onHotspotClick: (index: number) => void;
}

export function FallbackIdeaDiscSvg({
  isSplit
}: FallbackIdeaDiscSvgProps) {
  return (
    <div className="w-full h-full flex items-center justify-center relative min-h-[300px]">
      <svg width="200" height="200" viewBox="0 0 200 200" className="animate-spin duration-3000 opacity-50">
        <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 20" />
        <circle cx="100" cy="100" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      {isSplit && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-1 h-full bg-current opacity-20 transform -rotate-12" />
        </div>
      )}
    </div>
  );
}
