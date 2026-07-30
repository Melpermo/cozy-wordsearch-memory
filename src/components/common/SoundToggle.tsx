import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../../hooks/useAudio';

interface SoundToggleProps {
  className?: string;
  size?: number;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ className = '', size = 18 }) => {
  const { isMuted, toggleMute, playClick } = useAudio();

  const handleToggle = () => {
    playClick();
    toggleMute();
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center justify-center p-2 rounded-full bg-cozy-tile/65 text-cozy-text border border-cozy-tile-shadow/20 shadow-sm hover:bg-cozy-tile/90 active:translate-y-0.5 active:shadow-none transition-all duration-150 cursor-pointer ${className}`}
      title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
      aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
    >
      {isMuted ? (
        <VolumeX size={size} className="text-cozy-muted" />
      ) : (
        <Volume2 size={size} className="text-cozy-mint-dark" />
      )}
    </button>
  );
};
