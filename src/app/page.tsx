import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ScrollProgress from "@/components/ScrollProgress";
import TrackChooser from "@/components/TrackChooser";

import About from "@/components/About";
import Journey from "@/components/Journey";
import WhyJoin from "@/components/WhyJoin";
import Roadmap from "@/components/Roadmap";
import FAQ from "@/components/FAQ";
import Apply from "@/components/Apply";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import TrackStageWrapper from "@/components/TrackStageWrapper";
import { TrackProvider } from "@/lib/track";



export default function Home() {
  return (
    <TrackProvider>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <TrackChooser />
        <TrackStageWrapper />
        <Journey />
        <WhyJoin />
        <Roadmap />
        <FAQ />
        <Apply />
        <Contact />
      </main>
      <Footer />
    </TrackProvider>
  );
}
