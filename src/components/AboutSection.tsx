import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import image1 from '@/assets/image1.jpeg';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className={`space-y-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                Engineering
                <span className="text-accent block">Excellence</span>
              </h2>
              
              <div className="w-20 h-1 bg-accent mb-8"></div>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Team Abhyuday Racing is a student-led team focused on designing and building electric (eBAJA)
                and autonomous (a-BAJA) all-terrain vehicles. We combine innovation, sustainability, and teamwork
                to create high-performance EVs and AVs. From powertrains to perception systems, every component
                is developed through hands-on engineering, pushing the limits of mobility and preparing us for the
                future of automotive technology.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Through hands-on experience in design, fabrication, and testing, we bridge the gap 
                between theoretical knowledge and real-world application, preparing the next generation 
                of automotive engineers.
              </p>
            </div>

            {/* Mission Points */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Innovation First</h4>
                  <p className="text-muted-foreground">Pioneering new technologies and design approaches</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Performance Driven</h4>
                  <p className="text-muted-foreground">Maximizing speed, agility, and reliability</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Team Excellence</h4>
                  <p className="text-muted-foreground">Collaborative engineering and continuous learning</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button className="racing-button">
                Learn More About Our Process
              </Button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="relative">
              <img
                src={image1}
                alt="Team Abhyuday Racing students working on the a-BAJA autonomous vehicle at GHRCEM Pune garage"
                className="w-full h-[600px] object-cover rounded-lg shadow-card"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;