"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
interface Sponsor {
  name: string
  logo: string
}

const sponsors: Sponsor[] = [
  { name: "Cashvertz", logo: "/cashvertz.png" },
  { name: "KPIT", logo: "/kpit_logo.jpeg" },
  { name: "Belrise", logo: "/Bi.jpg" },
  // { name: "Jet Cargo and movers", logo: "/JetCargo.png" },
  { name: "Microsoft", logo: "/cashvertz.png" },
  { name: "Google", logo: "/kpit_logo.jpeg" },
  { name: "Apple", logo: "/Bi.jpg" },
  // { name: "Microsoft", logo: "/JetCargo.png" },
  { name: "Microsoft", logo: "/cashvertz.png" },
  { name: "Google", logo: "/kpit_logo.jpeg" },
  { name: "Apple", logo: "/Bi.jpg" },
  // { name: "Microsoft", logo: "/JetCargo.png" },
  { name: "Microsoft", logo: "/cashvertz.png" },
  { name: "Google", logo: "/kpit_logo.jpeg" },
  { name: "Apple", logo: "/Bi.jpg" },
  // { name: "Microsoft", logo: "/JetCargo.png" },
]

export default function SponsorsSection() {
  const [isPaused, setIsPaused] = useState(false)

  // Duplicate sponsors array for seamless infinite scroll
  const duplicatedSponsors = [...sponsors, ...sponsors]

  return (
    <section className="w-full py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl font-bold text-center text-foreground mb-4">Trusted by Industry Leaders</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Join thousands of companies that trust our platform to power their success
        </p>
      </div>

      <div className="relative">
        {/* Gradient fade effects on sides */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling container */}
        <div
          className={`flex gap-8 ${isPaused ? "" : "animate-scroll"}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ width: "calc(200% + 2rem)" }}
        >
          {duplicatedSponsors.map((sponsor, index) => (
            <div key={`${sponsor.name}-${index}`} className="flex-shrink-0 group">
              <div className="bg-card rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:scale-105">
                <img
                  src={sponsor.logo || "/placeholder.svg"}
                  alt={`${sponsor.name} logo`}
                  className="h-32 w-auto mx-auto object-contain transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 text-center">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-foreground mb-3">Join Our Partners</h3>
          <p className="text-muted-foreground mb-6">Partner with us and showcase your brand to thousands of users</p>
          <Button size="lg" className="px-8">
            Sponsor Us
          </Button>
        </div>
      </div>
    </section>
  )
}
