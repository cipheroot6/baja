export const sections = [
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "categories", label: "Categories" },
  { id: "departments", label: "Departments" },
  { id: "skills", label: "Skills" },
  { id: "roadmap", label: "Roadmap" },
  { id: "faq", label: "FAQ" },
  { id: "apply", label: "Apply" },
  { id: "contact", label: "Contact" },
];

export const stats = [
  { value: "400+", label: "Teams compete in BAJA SAEINDIA" },
  { value: "2", label: "Vehicles we build — aBAJA & eBAJA" },
  { value: "6", label: "Departments, one team" },
  { value: "20+", label: "Skills you'll learn from scratch" },
];

export const aboutPoints = [
  {
    title: "Innovation First",
    body: "Pioneering new technologies and design approaches.",
  },
  {
    title: "Performance Driven",
    body: "Maximizing speed, agility, and reliability.",
  },
  {
    title: "Team Excellence",
    body: "Collaborative engineering and continuous learning.",
  },
];

export interface JourneyMetric {
  label: string;
  score: string;
  note: string;
}

export const journey2026 = {
  headline: "eBAJA 2026",
  summary:
    "Our debut national competition taught us more than any classroom could. We walked away with a perfect safety score, endurance miles under our belt, and a clear map for 2027.",
  metrics: [
    {
      label: "Final Overall",
      score: "319.82",
      note: "Our starting point as a new team",
    },
    {
      label: "HV Safety",
      score: "20/20",
      note: "Perfect score — the vehicle passed fully",
    },
    {
      label: "Endurance",
      score: "165.64",
      note: "Completed a real endurance run",
    },
    {
      label: "Virtual Round",
      score: "31.14",
      note: "Solid theoretical preparation",
    },
  ] as JourneyMetric[],
};

export const journey2027 = {
  headline: "The 2027 Goal",
  score: "700+",
  note: "More than double our 2026 score. DBW reliability, design documentation, and a vehicle that actually completes dynamic events.",
};

export const categories = [
  {
    id: "abaja",
    name: "aBAJA",
    fullName: "Autonomous",
    blurb: "A self-driving electric buggy that navigates the course on its own.",
    points: [
      { label: "Perception", body: "Object & lane detection with OpenCV + YOLO" },
      { label: "Drive-By-Wire", body: "Steer, throttle & brake actuation on CANBus" },
      { label: "Simulation", body: "IPG CarMaker, AEB / LKA / endurance testing" },
      { label: "Stack", body: "Python · ROS2 · Linux · Arduino / STM32" },
    ],
  },
  {
    id: "ebaja",
    name: "eBAJA",
    fullName: "Electric",
    blurb: "A race-ready electric off-road vehicle engineered to survive the toughest terrain.",
    points: [
      { label: "Powertrain", body: "Motor, controller, battery pack & BMS" },
      { label: "High-Voltage Safety", body: "TSAL, isolation monitoring, safe packaging" },
      { label: "Dynamics", body: "Suspension, tires & gear ratios tuned to race" },
      { label: "Stack", body: "48V/72V pack · 2WD / 4WD platforms" },
    ],
  },
];

export const departments = [
  {
    name: "Perception & Software",
    role: "The Brain",
    body: "Object detection, lane detection, and the vision stack with Python, OpenCV, YOLO and ROS2.",
  },
  {
    name: "Drive-By-Wire",
    role: "The Body",
    body: "Actuators for steering, throttle and brake over CANBus with Arduino and STM32.",
  },
  {
    name: "Mechanical Design",
    role: "The Frame",
    body: "Chassis, suspension and fabrication — the bones of the machine, drawn in CAD.",
  },
  {
    name: "Electrical Systems",
    role: "The Nerves",
    body: "Wiring harnesses, sensors and power distribution that keep every system alive.",
  },
  {
    name: "Documentation",
    role: "The Memory",
    body: "Design reports, presentations and records that earn real competition points.",
  },
  {
    name: "Sales & Sponsorship",
    role: "The Funding",
    body: "Sponsor outreach, proposals and social media that keep the team moving.",
  },
];

export const skillGroups = [
  {
    group: "Software & AI",
    skills: ["Python", "ROS2", "OpenCV", "YOLO", "Linux", "Git & GitHub"],
  },
  {
    group: "Embedded & Electronics",
    skills: ["Arduino", "STM32", "CANBus", "Sensors", "Wiring & Soldering"],
  },
  {
    group: "Design & Simulation",
    skills: ["SolidWorks", "Fusion 360", "IPG CarMaker", "Vehicle Dynamics"],
  },
  {
    group: "Soft Skills",
    skills: ["Teamwork", "Presentation", "Project Management", "Problem Solving"],
  },
];

export const whyJoin = [
  "Build a real race car — not a simulation",
  "Compete nationally against 400+ teams",
  "Learn industry-relevant skills employers look for",
  "No experience needed — we train you from zero",
  "Add a standout project to your resume",
  "Network with teams and professionals across India",
  "Get noticed by companies like Bosch and NVIDIA",
  "Make lifelong friends across every branch",
  "Represent your college on a national stage",
  "Have the time of your life doing it",
];

export const roadmap = [
  {
    period: "Sep — Oct 2026",
    title: "Recruitment & Team Formation",
    body: "Applications open, interviews, and onboarding of the new batch.",
  },
  {
    period: "Nov — Dec 2026",
    title: "Training & Skills",
    body: "Foundational workshops in Python, CAD, Arduino and more.",
  },
  {
    period: "Jan — Feb 2027",
    title: "Design Phase",
    body: "Vehicle design freeze and Phase 1 deliverables.",
  },
  {
    period: "Mar — Apr 2027",
    title: "Build Phase",
    body: "Fabrication, assembly and Phase 2 milestones.",
  },
  {
    period: "May — Jun 2027",
    title: "Testing",
    body: "Reliability, tuning and Phase 3 sign-offs.",
  },
  {
    period: "Jul 2027",
    title: "Competition Day",
    body: "BAJA SAEINDIA 2027. Nail it.",
  },
];

export const faqs = [
  {
    q: "Do I need any experience to join?",
    a: "No. We train you from scratch. Passion and commitment matter far more than your current skills.",
  },
  {
    q: "How many hours per week?",
    a: "About 8–10 hours, flexible around exams. Club work never overrides your academics.",
  },
  {
    q: "I'm from a different branch — can I still join?",
    a: "Yes. We take members from every branch — CS, IT, E&TC, Mechanical, Electrical, Civil and more.",
  },
  {
    q: "Is there a fee?",
    a: "No club fees. There is an SAE membership (~₹1000–2000) for competition registration.",
  },
  {
    q: "Will this hurt my academics?",
    a: "No — we plan around exam schedules and prioritize your studies. Academics always come first.",
  },
];

export const applySteps = [
  {
    step: "01",
    title: "Fill the form",
    body: "Two minutes. Tell us who you are and what interests you.",
  },
  {
    step: "02",
    title: "Short interview",
    body: "Three minutes with the leads. Nobody's grilling you.",
  },
  {
    step: "03",
    title: "Get selected",
    body: "We allocate you to a department based on your interest.",
  },
  {
    step: "04",
    title: "Start building",
    body: "Welcome session, onboarding and your first training week.",
  },
];

export type Track = "abaja" | "ebaja";

export interface TrackContent {
  stats: { value: string; label: string }[];
  category: (typeof categories)[number];
  departments: { name: string; role: string; body: string }[];
  skills: { group: string; skills: string[] }[];
}

export const trackContent: Record<Track, TrackContent> = {
  abaja: {
    stats: [
      { value: "ROS2", label: "Autonomous stack you'll learn" },
      { value: "DBW", label: "Full drive-by-wire system" },
      { value: "3", label: "Runtime perception systems" },
      { value: "0", label: "Drivers in the loop" },
    ],
    category: categories[0],
    departments: [
      {
        name: "Perception & Software",
        role: "The Brain",
        body: "Object and lane detection with Python, OpenCV, YOLO and ROS2.",
      },
      {
        name: "Drive-By-Wire",
        role: "The Body",
        body: "Steer, throttle and brake actuation over CANBus with Arduino and STM32.",
      },
      {
        name: "Autonomy Simulation",
        role: "The Trainer",
        body: "AEB, LKA and endurance testing in IPG CarMaker before the real run.",
      },
      {
        name: "Embedded Systems",
        role: "The Nerves",
        body: "Sensor fusion, boards, and wiring that keep the stack alive.",
      },
      {
        name: "Documentation",
        role: "The Memory",
        body: "Design reports and presentations that earn real competition points.",
      },
      {
        name: "Sales & Sponsorship",
        role: "The Funding",
        body: "Sponsor outreach, proposals and social media that keep the team moving.",
      },
    ],
    skills: [
      {
        group: "Software & AI",
        skills: ["Python", "ROS2", "OpenCV", "YOLO", "Linux", "Git & GitHub"],
      },
      {
        group: "Control & Simulation",
        skills: ["IPG CarMaker", "MATLAB", "State Machines", "Control Systems"],
      },
      {
        group: "Embedded & Electronics",
        skills: ["Arduino", "STM32", "CANBus", "Sensors", "Wiring"],
      },
      {
        group: "Soft Skills",
        skills: ["Teamwork", "Presentation", "Project Management", "Problem Solving"],
      },
    ],
  },
  ebaja: {
    stats: [
      { value: "48V", label: "Battery pack architecture" },
      { value: "20/20", label: "HV safety target from 2026" },
      { value: "2WD", label: "Drivetrain platform" },
      { value: "400+", label: "Teams we race against" },
    ],
    category: categories[1],
    departments: [
      {
        name: "Powertrain",
        role: "The Heart",
        body: "Motor, controller, battery pack and BMS tuned for the course.",
      },
      {
        name: "High-Voltage Safety",
        role: "The Shield",
        body: "TSAL, isolation monitoring and safe packaging of the 48V/72V pack.",
      },
      {
        name: "Chassis & Suspension",
        role: "The Muscles",
        body: "Frames, suspension and fabrication drawn in CAD and built to survive.",
      },
      {
        name: "Electrical Systems",
        role: "The Nerves",
        body: "Wiring harnesses, sensors and power distribution across the vehicle.",
      },
      {
        name: "Documentation",
        role: "The Memory",
        body: "Design reports and presentations that earn real competition points.",
      },
      {
        name: "Sales & Sponsorship",
        role: "The Funding",
        body: "Sponsor outreach, proposals and social media that keep the team moving.",
      },
    ],
    skills: [
      {
        group: "Powertrain & Battery",
        skills: ["Motor & Controller", "BMS", "Battery Pack", "72V Systems"],
      },
      {
        group: "HV Safety",
        skills: ["TSAL", "Isolation Monitoring", "Safe Packaging", "Interlocks"],
      },
      {
        group: "Dynamics & Fabrication",
        skills: ["Suspension", "Tires & Gears", "SolidWorks", "Welding"],
      },
      {
        group: "Soft Skills",
        skills: ["Teamwork", "Presentation", "Project Management", "Problem Solving"],
      },
    ],
  },
};