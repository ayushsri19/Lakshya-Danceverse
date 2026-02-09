
import React, { useRef, useEffect, useState } from 'react';

interface LiveStreamProps {
  sessionTitle: string;
  instructorName: string;
}

const LiveStream: React.FC<LiveStreamProps> = ({ sessionTitle, instructorName }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsLive(true);
      }
    } catch (err) {
      setError("Failed to access camera. Please check permissions.");
      console.error(err);
    }
  };

  const stopStream = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setIsLive(false);
  };

  useEffect(() => {
    return () => stopStream();
  }, []);

  return (
    <div className="w-full bg-slate-900 rounded-2xl overflow-hidden relative shadow-2xl">
      <div className="aspect-video bg-black flex items-center justify-center">
        {error ? (
          <div className="text-red-400 p-8 text-center">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="font-medium">{error}</p>
          </div>
        ) : isLive ? (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            </div>
            <button 
              onClick={startStream}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold transition-all"
            >
              Enter Live Studio
            </button>
          </div>
        )}
      </div>

      <div className="absolute top-4 left-4 flex gap-2">
        {isLive && (
          <div className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest rounded flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
            Live
          </div>
        )}
        <div className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded">
          {instructorName}
        </div>
      </div>

      <div className="p-6 bg-slate-800 text-white border-t border-slate-700">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{sessionTitle}</h2>
            <p className="text-slate-400 text-sm">Real-time interaction and feedback</p>
          </div>
          {isLive && (
            <button 
              onClick={stopStream}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-bold transition-colors"
            >
              End Session
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveStream;
