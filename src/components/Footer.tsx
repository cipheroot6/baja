import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Linkedin } from "lucide-react";

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-bold text-2xl tracking-tight mb-4">
              TEAM
              <span className="text-accent ml-1">ABHYUDAY RACING</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Engineering excellence through student-built off-road race vehicles. 
              Pushing boundaries, breaking limits, and building the future of motorsport.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              <a 
                href="#" 
                className="w-10 h-10 bg-accent/20 hover:bg-accent rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-accent/20 hover:bg-accent rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-accent/20 hover:bg-accent rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-accent/20 hover:bg-accent rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <button 
                onClick={() => scrollToSection('home')}
                className="block text-primary-foreground/80 hover:text-accent transition-colors duration-300"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block text-primary-foreground/80 hover:text-accent transition-colors duration-300"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('gallery')}
                className="block text-primary-foreground/80 hover:text-accent transition-colors duration-300"
              >
                Gallery
              </button>
              <button 
                onClick={() => scrollToSection('team')}
                className="block text-primary-foreground/80 hover:text-accent transition-colors duration-300"
              >
                Team
              </button>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Get in Touch</h4>
            <div className="space-y-4 text-primary-foreground/80">
              <div className="flex items-start space-x-2">
                <Mail className="w-5 h-5 mt-1" />
                <div>
                  <div className="font-medium">Email</div>
                  <a 
                    href="mailto:abhyudayghrcem2023@gmail.com" 
                    className="hover:text-accent transition-colors duration-300"
                  >
                    abhyudayghrcem2023@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Phone className="w-5 h-5 mt-1" />
                <div>
                  <div className="font-medium">Phone</div>
                  <a 
                    href="tel:+919822831625" 
                    className="hover:text-accent transition-colors duration-300"
                  >
                    98228 31625
                  </a>
                  <br />
                  <a 
                    href="tel:+917821828078" 
                    className="hover:text-accent transition-colors duration-300"
                  >
                    78218 28078
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-1" />
                <div>
                  <div className="font-medium">Location</div>
                  <div>
                    G H Raisoni College of Engineering<br />
                    and Management, Pune.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-foreground/60 text-sm">
              © 2025 Team Abhyuday Racing. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a 
                href="#" 
                className="text-primary-foreground/60 hover:text-accent transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-primary-foreground/60 hover:text-accent transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="text-primary-foreground/60 hover:text-accent transition-colors duration-300"
              >
                Code of Conduct
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
