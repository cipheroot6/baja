export const siteConfig = {
  name: "Team Abhyuday Racing",
  shortName: "Abhyuday Racing",
  title: "Team Abhyuday Racing | aBAJA & eBAJA Student Racing Team",
  tagline: "Build. Race. Compete. Nationally.",
  college: "G.H. Raisoni College of Engineering and Management, Pune",
  description:
    "Team Abhyuday Racing is GHRCEM Pune's student-led aBAJA & eBAJA racing team, designing and building autonomous and electric all-terrain vehicles for BAJA SAEINDIA competitions.",
  url: "https://teamabhyudayracing.vercel.app",
  themeColor: "#ff6b00",
  founded: 2023,

  heroImage: "/img/vehicle.jpg" as string | null,

  model: {
    url: null as string | null,
  },

  join: {
    formUrl: "#apply",
    waiverUrl: "#",
    deadline: "30 September 2026",
  },

  contact: {
    email: "abhyudayghrcem2023@gmail.com",
    phoneRaw: "+919822831625",
    phoneDisplay: "+91 98228 31625",
    whatsapp: "#",
  },

  socials: {
    instagram: "https://www.instagram.com/teamabhyudayracing",
    linkedin: "https://www.linkedin.com/company/teamabhyudayracing",
    facebook: "https://www.facebook.com/teamabhyudayracing",
    youtube: "https://www.youtube.com/@teamabhyudayracing",
  },
} as const;

export type SiteConfig = typeof siteConfig;