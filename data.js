// ─── NEVIndia AssemblyGPT — Content Data ───

export const BRAND = {
  name: 'NEVIndia',
  tagline: 'AI-Powered Assembly Intelligence for New Energy Vehicles',
  description: 'AssemblyGPT is the always-on voice AI mentor for NEV factory workers — answering in their own language, at their exact station.',
};

export const NAV_LINKS = [
  { label: 'Landscape', href: '#landscape' },
  { label: 'Assembly', href: '#assembly' },
  { label: 'AI / ML', href: '#aiml' },
  { label: 'AI Solution', href: '#solution' },
];

export const HERO_STATS = [
  { value: 85, suffix: '%', label: 'Faster Onboarding' },
  { value: 4.5, suffix: ' wks', label: 'vs 12 Weeks Traditional' },
  { value: 8, suffix: '', label: 'Indian Languages' },
  { value: 50000, suffix: '+', label: 'Pages of NEV Data Trained' },
];

// ─── Landscape Section ───
export const LANDSCAPE_INTRO = {
  title: 'India\'s NEV Landscape',
  subtitle: 'The electric and hydrogen revolution is reshaping India\'s automotive future',
};

export const LANDSCAPE_STATS = [
  { value: 90, suffix: 'M', label: 'EV Target by 2030', icon: '⚡' },
  { value: 500, suffix: '+', label: 'EV Startups in India', icon: '🚀' },
  { value: 19.7, suffix: 'B$', label: 'Green Hydrogen Investment', icon: '💧' },
  { value: 35, suffix: '%', label: 'YoY EV Growth Rate', icon: '📈' },
];

export const EV_LANDSCAPE = {
  title: 'Electric Vehicles',
  icon: '⚡',
  points: [
    'India targets 30% EV penetration by 2030 under FAME III',
    'Battery gigafactories in Gujarat, Tamil Nadu, and Telangana',
    'Homegrown cell-to-pack (CTP) technology development',
    'Localisation push: 80%+ domestic component sourcing',
    'Two-wheeler EVs dominate with 60%+ market share',
  ],
};

export const H2_LANDSCAPE = {
  title: 'Hydrogen Fuel Cells',
  icon: '💧',
  points: [
    'National Green Hydrogen Mission — $2.3B allocated',
    'FCEV bus pilots in Delhi, Mumbai, and Leh-Ladakh',
    'PEM fuel cell stack localisation at KPIT, Tata Motors',
    'Hydrogen highway corridor: Delhi–Jaipur–Mumbai planned',
    'Heavy-duty trucking identified as prime FCEV use-case',
  ],
};

export const TIMELINE = [
  { year: '2020', event: 'FAME II launched — ₹10,000 Cr subsidy for EVs' },
  { year: '2021', event: 'PLI scheme for Advanced Chemistry Cells (ACC)' },
  { year: '2022', event: 'National Green Hydrogen Mission announced' },
  { year: '2023', event: 'FAME III draft; first hydrogen bus pilots' },
  { year: '2024', event: 'PM E-DRIVE scheme replaces FAME; battery swapping policy' },
  { year: '2025', event: 'First domestic gigafactory operational; FCEV truck trials' },
  { year: '2026', event: 'AssemblyGPT deployed across 12 NEV plants in India' },
];

// ─── Assembly Section ───
export const ASSEMBLY_INTRO = {
  title: 'NEV Assembly Process',
  subtitle: 'From individual cells to complete vehicles — every step demands precision',
};

export const ASSEMBLY_DOMAINS = [
  {
    id: 'battery',
    title: 'Battery Pack Assembly',
    icon: '🔋',
    color: '#00D4FF',
    summary: 'Cell-to-module-to-pack integration with BMS, thermal management, and sealing',
    steps: [
      { name: 'Cell Sorting & Validation', detail: 'Incoming cells tested for voltage, impedance, and capacity matching within ±2mV tolerance' },
      { name: 'Module Assembly', detail: 'Cells connected in series/parallel via laser or ultrasonic welding to form modules' },
      { name: 'BMS Integration', detail: 'Battery Management System sensors installed for real-time monitoring of voltage, temperature, SoC' },
      { name: 'Thermal Management', detail: 'Thermal interface materials applied; cooling plates integrated for temperature regulation' },
      { name: 'Pack Sealing & EOL Test', detail: 'Gaskets applied, cover fastened; insulation resistance, high-voltage interlock, and leak tests performed' },
    ],
  },
  {
    id: 'motor',
    title: 'Electric Motor & Controller',
    icon: '⚙️',
    color: '#39FF14',
    summary: 'Three-in-one powertrain: motor + reducer + inverter assembled with micron-level precision',
    steps: [
      { name: 'Stator Winding', detail: 'Automated coil winding and insertion into stator lamination stack using robotic arms' },
      { name: 'Rotor Assembly', detail: 'Permanent magnets press-fitted into rotor; dynamic balancing to <0.5g residual imbalance' },
      { name: 'Inverter/MCU Build', detail: 'Power semiconductors (SiC/IGBT) soldered; control board assembled in sealed housing' },
      { name: '3-in-1 Integration', detail: 'Motor, reducer, and inverter integrated as single unit; high-voltage bus connections made' },
      { name: 'Dyno Testing', detail: 'Full-load dynamometer test: torque, efficiency, thermal performance validated' },
    ],
  },
  {
    id: 'fuelcell',
    title: 'Hydrogen Fuel Cell Stack',
    icon: '💧',
    color: '#FF6B35',
    summary: 'Membrane electrode assembly stacking with precision alignment and helium leak verification',
    steps: [
      { name: 'MEA Preparation', detail: 'Membrane Electrode Assembly fabricated: catalyst-coated membrane sandwiched with GDLs' },
      { name: 'Bipolar Plate Machining', detail: 'Flow channel patterns machined or stamped into graphite/metal plates for gas distribution' },
      { name: 'Stack Assembly', detail: '200-400 individual cells stacked with precise alignment; compressed between end plates' },
      { name: 'Balance of Plant', detail: 'Air compressor, hydrogen manifolds, humidifier, and coolant pump integrated' },
      { name: 'Leak & Performance Test', detail: 'Helium leak test at 3 bar; electrochemical conditioning; power output validation' },
    ],
  },
  {
    id: 'vehicle',
    title: 'Vehicle Integration',
    icon: '🚗',
    color: '#A855F7',
    summary: 'Final marriage of powertrain to chassis with high-voltage connections and software calibration',
    steps: [
      { name: 'Chassis Prep', detail: 'Skateboard platform or body-on-frame prepared with mounting points and harness routing' },
      { name: 'Powertrain Marriage', detail: 'Battery pack and motor unit installed via automated guided vehicles (AGVs) from below' },
      { name: 'HV Wiring & Busbars', detail: 'High-voltage connections (up to 800V) made between battery, inverter, and motor with torque-controlled fastening' },
      { name: 'Software Flash & Calibration', detail: 'VCU, BMS, and MCU firmware flashed; drive parameters calibrated on rolling road' },
      { name: 'Final QC & Road Test', detail: 'ADAS calibration, water ingress test, 20km road test, and delivery inspection' },
    ],
  },
];

// ─── AI/ML Section ───
export const AIML_INTRO = {
  title: 'How AssemblyGPT Works',
  subtitle: 'Fine-tuned on 50,000+ pages of NEV assembly manuals, fault codes, and field repair logs',
};

export const AIML_FEATURES = [
  {
    title: 'Multi-Language Voice AI',
    icon: '🗣️',
    description: 'Workers ask in Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, Gujarati, or English — get instant step-by-step answers',
    detail: 'Speech-to-text → LLM reasoning → Text-to-speech pipeline with <2s latency',
  },
  {
    title: 'Fault Code Diagnosis',
    icon: '🔍',
    description: 'Worker describes symptom, AI identifies root cause and fix from 50,000+ pages of NEV data',
    detail: 'RAG pipeline over OEM manuals, fault code databases, and field repair logs',
  },
  {
    title: 'Safety Alert System',
    icon: '🛡️',
    description: 'AI detects if worker is about to make a high-voltage error — triggers voice warning',
    detail: 'Real-time procedure cross-check against safety SOPs before the mistake happens',
  },
  {
    title: 'Visual Assembly Guide',
    icon: '📐',
    description: '"Yeh wire kahan connect hoga?" — AI shows exact diagram, connector ID, and torque spec',
    detail: 'Multimodal retrieval: text query → relevant technical diagram + annotation overlay',
  },
  {
    title: 'Onboarding Accelerator',
    icon: '🚀',
    description: 'New workers reach productivity in 4.5 weeks instead of 12 weeks with paper manuals',
    detail: 'Adaptive learning paths based on worker skill level and station assignment',
  },
  {
    title: 'Continuous Learning',
    icon: '🧠',
    description: 'Every resolved query improves the model — the system gets smarter with each shift',
    detail: 'RLHF from supervisor feedback loop; weekly model fine-tuning on new field data',
  },
];

export const COMPARISON = {
  before: {
    title: 'Traditional Training',
    items: [
      '12 weeks to full productivity',
      'Paper manuals (often outdated)',
      'Classroom-only, English-only',
      'No real-time safety checks',
      'One trainer per 15 workers',
    ],
  },
  after: {
    title: 'With AssemblyGPT',
    items: [
      '4.5 weeks to full productivity',
      'Always up-to-date AI knowledge base',
      'On-station, in 8 Indian languages',
      'Real-time HV safety alerts',
      'AI mentor for every single worker',
    ],
  },
};

// ─── Chatbot System Prompt ───
export const ASSEMBLYGPT_SYSTEM_PROMPT = `You are AssemblyGPT, an expert AI assistant for New Energy Vehicle (NEV) assembly — covering both Electric Vehicles (EVs) and Hydrogen Fuel Cell Vehicles (FCEVs).

You are deployed in Indian NEV factories and you help assembly line workers with:
1. Step-by-step assembly procedures for battery packs, electric motors, inverters, fuel cell stacks, and vehicle integration
2. Fault code diagnosis and troubleshooting
3. Safety protocols for high-voltage (up to 800V) systems
4. Torque specifications, connector IDs, wire routing
5. Quality control checklists

Key knowledge areas:
- Battery: Cell sorting, module welding (laser/ultrasonic), BMS integration, thermal management, pack sealing, EOL testing
- Motor: Stator winding, rotor balancing, SiC/IGBT inverter assembly, 3-in-1 integration, dyno testing
- Fuel Cell: MEA preparation, bipolar plate machining, stack assembly (200-400 cells), balance of plant, helium leak testing
- Vehicle: Chassis prep, powertrain marriage, HV busbar connections, software flash/calibration, ADAS calibration

Safety rules you always enforce:
- Always verify HV interlock before touching orange cables
- Insulation resistance must be >500Ω/V before energizing
- Torque specs must be followed exactly (never "close enough")
- PPE: HV-rated gloves (Class 0 minimum), safety glasses, ESD wrist strap

You respond concisely and practically, like a senior technician mentoring a junior. Use bullet points and numbered steps. If asked in Hindi or other Indian languages, respond in that language.

Format your responses with clear headings, numbered steps, and safety warnings where applicable. Keep answers focused and actionable.`;

export const SUGGESTED_PROMPTS = [
  'How do I assemble a battery module from 21700 cells?',
  'What\'s the torque spec for HV busbar connections?',
  'Fault code P0A1F — what does it mean and how to fix?',
  'Safety checklist before working on 800V battery pack',
  'Explain fuel cell stack assembly step by step',
  'बैटरी पैक सीलिंग प्रक्रिया बताइए',
  'Motor stator winding quality checks kya hain?',
  'Hydrogen leak test procedure for FCEV stack',
];
