import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Categories from "@/components/Categories";
import Departments from "@/components/Departments";
import Skills from "@/components/Skills";
import WhyJoin from "@/components/WhyJoin";
import Roadmap from "@/components/Roadmap";
import FAQ from "@/components/FAQ";
import Apply from "@/components/Apply";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Journey />
        <Categories />
        <Departments />
        <Skills />
        <WhyJoin />
        <Roadmap />
        <FAQ />
        <Apply />
        <Contact />
      </main>
      <Footer />
    </>
  );
}