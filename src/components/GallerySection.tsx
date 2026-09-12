import { useEffect, useRef, useState } from 'react';
import vehicleDetail from '@/assets/vehicle-detail.jpg';
import teamImage from '@/assets/team-garage.jpg';
import heroImage from '@/assets/hero-vehicle.jpg';
import image1 from '@/assets/image1.jpeg';
import image2 from '@/assets/image2.jpeg';
import image3 from '@/assets/image3.jpeg';


const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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

  const galleryItems = [
    {
      image: image1,
      title: "Desert Thunder",
      category: "Action",
      description: "Team Abhyuday Racing a-BAJA vehicle racing through challenging off-road terrain"
    },
    {
      image: image2,
      title: "Precision Engineering",
      category: "Technical",
      description: "Team Abhyuday Racing eBAJA vehicle's advanced suspension and chassis design"
    },
    {
      image: image3,
      title: "Team Collaboration",
      category: "Behind the Scenes",
      description: "Team Abhyuday Racing students collaborating on vehicle build at GHRCEM Pune"
    },
    {
      image: heroImage,
      title: "Victory Moment",
      category: "Achievement",
      description: "Team Abhyuday Racing celebrating a successful BAJA SAE competition result"
    },
    {
      image: vehicleDetail,
      title: "Innovation Lab",
      category: "Technical",
      description: "Team Abhyuday Racing testing new performance modifications on their ATV"
    },
    {
      image: teamImage,
      title: "Race Prep",
      category: "Behind the Scenes",
      description: "Team Abhyuday Racing final pre-competition preparations and vehicle inspection"
    }
  ];

  return (
    <section id="gallery" ref={sectionRef} className="py-20 md:py-32 bg-secondary/50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Racing
            <span className="text-accent ml-2">Gallery</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Capturing moments of innovation, teamwork, and high-performance racing
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-lg bg-card shadow-card hover:shadow-racing transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.description}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-sm font-medium text-accent uppercase tracking-wide mb-2">
                    {item.category}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;