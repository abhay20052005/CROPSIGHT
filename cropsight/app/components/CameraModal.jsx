'use client';

import { useState, useRef, useEffect } from 'react';
import { Camera, X, RefreshCw, Check, CheckCircle2 } from 'lucide-react';

export default function CameraModal({ isOpen, onClose, onCapture }) {
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsCameraReady(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsCameraReady(true);
      setError(null);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Could not access camera. Please ensure you have given permission.');
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(dataUrl);
      stopCamera();
    }
  };

  const handleConfirm = () => {
    if (capturedImage) {
      // Convert dataUrl back to a File object or Blob if needed
      fetch(capturedImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
          onCapture(file);
          onClose();
        });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black backdrop-blur-3xl animate-in fade-in duration-300 sm:p-10">
      <div className="relative bg-white/10 w-full rounded-none sm:rounded-[4rem] overflow-hidden border-none sm:border sm:border-white/20 shadow-2xl flex flex-col h-full sm:max-h-[90vh] sm:max-w-6xl">
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 bg-gradient-to-b from-black/50 to-transparent">
          <h3 className="text-white font-bold text-xl drop-shadow-md">Scan Crop</h3>
          <button 
            onClick={onClose}
            className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-all backdrop-blur-md"
          >
            <X size={24} />
          </button>
        </div>

        {/* Camera Feed / Preview */}
        <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
          {error ? (
            <div className="text-center p-8">
              <p className="text-red-400 font-medium mb-4">{error}</p>
              <button 
                onClick={startCamera}
                className="px-6 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-all"
              >
                Try Again
              </button>
            </div>
          ) : capturedImage ? (
            <img 
              src={capturedImage} 
              alt="Captured" 
              className="w-full h-full object-contain"
            />
          ) : (
            <>
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover"
              />
              {!isCameraReady && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
                  <RefreshCw className="text-white animate-spin mb-4" size={48} />
                  <p className="text-white font-medium">Starting Camera...</p>
                </div>
              )}
            </>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Footer / Controls */}
        <div className="p-8 bg-black/40 backdrop-blur-2xl border-t border-white/10 flex justify-center items-center gap-8 relative">
          {capturedImage ? (
            <>
              <button 
                onClick={() => {
                  setCapturedImage(null);
                  startCamera();
                }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center text-white group-hover:bg-white/10 transition-all">
                  <RefreshCw size={28} />
                </div>
                <span className="text-white text-xs font-medium opacity-80">Retake</span>
              </button>
              
              <button 
                onClick={handleConfirm}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/40 group-hover:scale-110 transition-all">
                  <Check size={36} />
                </div>
                <span className="text-white text-xs font-bold">Use Photo</span>
              </button>
            </>
          ) : (
            <button 
              onClick={takePhoto}
              disabled={!isCameraReady}
              className="group flex flex-col items-center gap-2 disabled:opacity-50"
            >
              <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-all group-active:scale-95">
                <div className="w-14 h-14 rounded-full bg-white group-hover:bg-primary transition-all"></div>
              </div>
              <span className="text-white text-xs font-bold tracking-widest uppercase">Capture</span>
            </button>
          )}
        </div>

        {/* Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40">
           <div className="w-64 h-64 sm:w-[400px] sm:h-[400px] border-2 border-white/20 rounded-[4rem] relative">
             <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl"></div>
             <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl"></div>
             <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl"></div>
             <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl"></div>
           </div>
        </div>
      </div>
    </div>
  );
}
