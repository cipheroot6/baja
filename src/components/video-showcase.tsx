"use client";

import { useRef } from "react";
import { Card } from "@/components/ui/card";

interface VideoItem {
  id: string;
  title: string;
  videoUrl: string;
}

const videoData: VideoItem[] = [
  {
    id: "1",
    title: "Highway Autonomous Navigation",
    videoUrl: "/videos/web_lat.mp4", // Using actual video URLs
  },
  {
    id: "2",
    title: "Urban Traffic Management",
    videoUrl: "/videos/web-lat1.mp4",
  },
  {
    id: "3",
    title: "Weather Condition Testing",
    videoUrl: "/videos/web-long1.mp4",
  },
  {
    id: "4",
    title: "Parking Automation",
    videoUrl: "/videos/web-long.mp4",
  },
];

export default function VideoShowcase() {
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handleVideoHover = (videoId: string) => {
    const video = videoRefs.current[videoId];
    if (video) {
      video.play();
    }
  };

  const handleVideoLeave = (videoId: string) => {
    const video = videoRefs.current[videoId];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">
            Autonomous Vehicle Testing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore our comprehensive testing scenarios showcasing the
            capabilities and safety features of our autonomous vehicle
            technology.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {videoData.map((video, index) => (
            <Card
              key={video.id}
              className={`
                group relative overflow-hidden bg-card border-border transition-all duration-300 ease-out
                hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1
                ${index === 0 ? "md:col-span-2 lg:col-span-2" : ""}
                ${index === 3 ? "lg:col-span-2" : ""}
              `}
              onMouseEnter={() => handleVideoHover(video.id)}
              onMouseLeave={() => handleVideoLeave(video.id)}
            >
              <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg">
                <video
                  ref={(el) => (videoRefs.current[video.id] = el)}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  muted
                  loop
                  playsInline
                >
                  <source src={video.videoUrl} type="video/mp4" />
                </video>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-medium transition-colors duration-300 hover:shadow-lg hover:shadow-accent/25">
            View All Test Results
          </button>
        </div>
      </div>
    </section>
  );
}
