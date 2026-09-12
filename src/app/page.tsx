"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import SponsorsSection from "@/components/SponsorsSection";
import Footer from "@/components/Footer";
import Achievement from "@/components/Achievement";
import VideoShowcase from "@/components/video-showcase";
import Loader from "@/components/Loader";

const Index = () => {
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake delay for demo; replace with real load logic
    const timer = setTimeout(() => setLoading(false), 2650);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <Loader onFinish={undefined} />
      ) : (
        <div className="min-h-screen">
          <Navbar />
          <main id="main-content">
            <HeroSection />
            <VideoSection />
            <AboutSection />
            <VideoShowcase />
            <GallerySection />
            <Achievement />
            <SponsorsSection />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
