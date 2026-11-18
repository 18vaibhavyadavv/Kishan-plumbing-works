import { useState } from 'react';
import { Wrench } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'Kishan Plumbing Works',
}: SafeImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#081D2B] via-[#123B55] to-[#081D2B] text-white p-8 ${className}`}
      >
        <div className="w-12 h-12 rounded-xl bg-[#D9B978]/15 border border-[#D9B978]/40 flex items-center justify-center mb-3">
          <Wrench className="w-6 h-6 text-[#D9B978]" aria-hidden="true" />
        </div>
        <p className="font-display font-semibold text-sm text-center text-white/90">{fallbackTitle}</p>
        <p className="text-xs text-[#D9B978] mt-1">Kanpur Nagar</p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#081D2B]/10 ${className}`}>
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#081D2B]/10 via-[#123B55]/15 to-[#081D2B]/10"
        />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
