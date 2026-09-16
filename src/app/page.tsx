import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ThemeCustomizer from "@/components/ThemeCustomizer";
import TrackChooser from "@/components/TrackChooser";
import TrackStage from "@/components/TrackStage";
import About from "@/components/About";
import Journey from "@/components/Journey";
import WhyJoin from "@/components/WhyJoin";
import Roadmap from "@/components/Roadmap";
import FAQ from "@/components/FAQ";
import Apply from "@/components/Apply";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { TrackProvider } from "@/lib/track";

export default function Home() {
  return (
    <TrackProvider>
      <Navbar />
      <main>
        <Hero />
        <TrackChooser />
        <About />
        <TrackStage />
        <Journey />
        <WhyJoin />
        <Roadmap />
        <FAQ />
        <Apply />
        <Contact />
      </main>
      <Footer />
      <ThemeCustomizer />
    </TrackProvider>
  );
}