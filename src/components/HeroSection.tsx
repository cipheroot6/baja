import { Button } from '@/components/ui/button';
import heroimage from '@/assets/heroimage.png';

const HeroSection = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Hero Image */}
      <div
        role="img"
        aria-label="Team Abhyuday Racing a-BAJA vehicle competing at BAJA SAE off-road event"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroimage})` }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            TEAM
            <span className="text-accent block mt-2">ABHYUDAY RACING</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto leading-relaxed animate-fade-in">
            GHRCEM Pune's student-led a-BAJA &amp; eBAJA team — building autonomous and electric all-terrain vehicles for SAE competitions
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button
              className="racing-button"
              onClick={scrollToAbout}
            >
              Discover Our Story
            </Button>

            <Button
              variant="outline"
              className="racing-button-outline border-white hover:bg-white hover:text-primary"
            >
              Watch in Action
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
