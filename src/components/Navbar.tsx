import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-lg bg-white/30 border-b border-white/20 shadow-lg ' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="font-bold text-xl p-2 m-2">
            <span>
              TEAM
            </span>
            <span className="text-accent ml-1">ABHYUDAY RACING</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className={`font-medium transition-colors hover:text-accent ${
                isScrolled ? 'text-primary' : 'text-white'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className={`font-medium transition-colors hover:text-accent ${
                isScrolled ? 'text-primary' : 'text-white'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className={`font-medium transition-colors hover:text-accent ${
                isScrolled ? 'text-primary' : 'text-white'
              }`}
            >
              Gallery
            </button>
            <button 
              onClick={() => scrollToSection('team')}
              className={`font-medium transition-colors hover:text-accent ${
                isScrolled ? 'text-primary' : 'text-white'
              }`}
            >
              Team
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`font-medium transition-colors hover:text-accent ${
                isScrolled ? 'text-primary' : 'text-white'
              }`}
            >
              Contact
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              variant="outline" 
              className={`racing-button-outline ${
                isScrolled ? 'border-accent text-accent' : 'border-white hover:bg-white hover:text-primary'
              }`}
            >
              Join Team
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden">
            <div className={`w-6 h-6 flex flex-col justify-center space-y-1 ${
              isScrolled ? 'text-primary' : 'text-white'
            }`}>
              <span className="block h-0.5 w-6 bg-current"></span>
              <span className="block h-0.5 w-6 bg-current"></span>
              <span className="block h-0.5 w-6 bg-current"></span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;