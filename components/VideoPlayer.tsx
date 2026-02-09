
import React, { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  onProgress?: (time: number) => void;
  initialTime?: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, onProgress, initialTime = 0 }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // In a real production app, we would use HLS.js here for non-Safari browsers
    // Example: if (Hls.isSupported()) { var hls = new Hls(); hls.loadSource(src); hls.attachMedia(video); }
    
    const handleTimeUpdate = () => {
      if (onProgress) onProgress(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      video.currentTime = initialTime;
      setIsReady(true);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [src, initialTime]);

  const changeSpeed = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  return (
    <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl group">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        className="w-full aspect-video"
        playsInline
      />
      
      {/* Custom Overlays for Production Feel */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {[1, 1.25, 1.5, 2].map(speed => (
          <button
            key={speed}
            onClick={() => changeSpeed(speed)}
            className={`px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md ${
              playbackSpeed === speed ? 'bg-indigo-600 text-white' : 'bg-white/20 text-white hover:bg-white/40'
            }`}
          >
            {speed}x
          </button>
        ))}
      </div>

      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
