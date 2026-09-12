import { useEffect, useRef, useState } from 'react';
import videoFile from "@/assets/video.mp4";

const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (videoRef.current) {
            videoRef.current.play();
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        muted
        loop
        playsInline
      >
        {/* Placeholder for actual video - using a solid color for now */}
        <source src={videoFile} type="video/mp4" />
      </video>
      
      {/* Fallback background for when video isn't available */}
      <div className="absolute inset-0 bg-gradient-to-br from-racing-black via-accent/20 to-racing-black" />
      
      {/* Video Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-3xl mx-auto px-6">
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            BUILT FOR
            <span className="text-accent block">EXTREME TERRAIN</span>
          </h2>
          
          <p className={`text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Engineering excellence meets raw performance in every race
          </p>
        </div>
      </div>
      
      {/* Performance Stats Overlay */}
      <div className={`absolute bottom-20 left-0 right-0 transition-all duration-1000 delay-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent">300+</div>
              <div className="text-sm md:text-base font-medium uppercase tracking-wide">Horsepower</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent">0-60</div>
              <div className="text-sm md:text-base font-medium uppercase tracking-wide">in 3.2s</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent">1200kg</div>
              <div className="text-sm md:text-base font-medium uppercase tracking-wide">Race Weight</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;