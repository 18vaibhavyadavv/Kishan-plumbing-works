export type ServiceCategory = 'All' | 'Residential' | 'Commercial & Multi-Unit' | 'Pipelines & Repairs';

export interface PlumbingService {
  id: string;
  index: string;
  title: string;
  category: Exclude<ServiceCategory, 'All'>;
  summary: string;
  deliverables: string[];
  iconKey:
    | 'home'
    | 'bath'
    | 'kitchen'
    | 'pipeline'
    | 'sanitary'
    | 'apartment'
    | 'commercial'
    | 'construction'
    | 'repair';
}

export const SERVICES: PlumbingService[] = [
  {
    id: 'complete-house-plumbing',
    index: '01',
    title: 'Complete House Plumbing',
    category: 'Residential',
    summary:
      'End-to-end concealed and external water supply, drainage, and overhead tank networking for independent houses and duplexes.',
    deliverables: ['Concealed CPVC/UPVC lines', 'Overhead & underground tank setup', 'Pressure testing'],
    iconKey: 'home',
  },
  {
    id: 'bathroom-fittings',
    index: '02',
    title: 'Bathroom Fittings',
    category: 'Residential',
    summary:
      'Precision installation of diverters, rain showers, concealed cisterns, wall-hung basins, and geyser lines with zero leakage.',
    deliverables: ['Concealed diverters & mixers', 'Wall-hung WC & basins', 'Hot & cold line balancing'],
    iconKey: 'bath',
  },
  {
    id: 'kitchen-fittings',
    index: '03',
    title: 'Kitchen Fittings',
    category: 'Residential',
    summary:
      'Clean sink trap alignment, RO inlet points, dishwasher water outlets, and high-arc mixer installations built for daily durability.',
    deliverables: ['Sink & waste trap setup', 'RO & appliance points', 'Smooth drainage gradient'],
    iconKey: 'kitchen',
  },
  {
    id: 'water-pipeline-installation',
    index: '04',
    title: 'Water Pipeline Installation',
    category: 'Pipelines & Repairs',
    summary:
      'High-grade CPVC, UPVC, GI, and SWR pipeline layouts engineered for steady water pressure and long-term structural safety.',
    deliverables: ['Main riser & distribution lines', 'Booster pump integration', 'Leak-proof jointing'],
    iconKey: 'pipeline',
  },
  {
    id: 'sanitary-fittings',
    index: '05',
    title: 'Sanitary Fittings',
    category: 'Residential',
    summary:
      'Level-calibrated mounting of all modern sanitaryware, flushing systems, floor traps, and odour-seal drainage outlets.',
    deliverables: ['Flush valves & cisterns', 'Floor drain & Nahani traps', 'Silicon-sealed finishing'],
    iconKey: 'sanitary',
  },
  {
    id: 'apartment-plumbing',
    index: '06',
    title: 'Apartment Plumbing',
    category: 'Commercial & Multi-Unit',
    summary:
      'Multi-storey shaft stacks, flat-wise shutoff valves, and society maintenance work executed cleanly across Kanpur Nagar apartments.',
    deliverables: ['Vertical shaft & stack lines', 'Flat-level isolation valves', 'Society upgrade works'],
    iconKey: 'apartment',
  },
  {
    id: 'commercial-plumbing',
    index: '07',
    title: 'Commercial Plumbing',
    category: 'Commercial & Multi-Unit',
    summary:
      'Heavy-duty washroom batteries, pantry lines, and high-capacity drainage systems for offices, clinics, showrooms, and institutions.',
    deliverables: ['High-traffic sanitary banks', 'Main drainage headers', 'Scheduled inspection'],
    iconKey: 'commercial',
  },
  {
    id: 'new-construction-plumbing',
    index: '08',
    title: 'New Construction Plumbing',
    category: 'Commercial & Multi-Unit',
    summary:
      'Stage-by-stage plumbing execution from foundation sleeve laying and wall chasing to final fixture handover on site.',
    deliverables: ['Slab sleeve & shaft marking', 'Concealed pressure checks', 'Final CP & sanitary handover'],
    iconKey: 'construction',
  },
  {
    id: 'repair-maintenance',
    index: '09',
    title: 'Repair & Maintenance',
    category: 'Pipelines & Repairs',
    summary:
      'Rapid diagnosis and clean repair of concealed wall seepage, dripping mixers, choked drain lines, and valve replacements.',
    deliverables: ['Seepage & leak tracing', 'Valve & cartridge replacement', 'Drain line clearing'],
    iconKey: 'repair',
  },
];

export const EXPERIENCE_PILLARS = [
  {
    title: 'Experienced Workmanship',
    description:
      'Four decades of hands-on mastery across cast iron, GI, CPVC, UPVC, and modern concealed diverter systems.',
  },
  {
    title: 'Genuine Pricing',
    description:
      'Honest labour and material guidance with zero inflated estimates or surprise post-work charges.',
  },
  {
    title: 'Clean Installation',
    description:
      'Laser-straight pipe alignments, neat wall chasing, and tidy site handover after every shift.',
  },
  {
    title: 'Agreed Quotation',
    description:
      'Clear scope discussed upfront so every agreed point is completed before final sign-off.',
  },
  {
    title: 'Customer Relationships',
    description:
      'Generations of Kanpur Nagar homeowners and builders who call us back for every new property.',
  },
];

export interface VerifiedLocation {
  name: string;
  areaNote: string;
  scope: string;
}

export const VERIFIED_LOCATIONS: VerifiedLocation[] = [
  {
    name: 'Shivalik Apartments',
    areaNote: 'Kanpur Nagar',
    scope: 'Apartment Plumbing & Sanitary Installations',
  },
  {
    name: 'Signature City',
    areaNote: 'Kanpur Nagar',
    scope: 'Residential Plumbing & Water Pipeline Works',
  },
  {
    name: 'New Highway City',
    areaNote: 'Kanpur Nagar',
    scope: 'New Construction & Bathroom Fittings',
  },
  {
    name: 'Rudra Apartments',
    areaNote: 'Kanpur Nagar',
    scope: 'Multi-Unit Shaft & Sanitary Execution',
  },
  {
    name: 'Ratan Planet',
    areaNote: 'Kanpur Nagar',
    scope: 'Apartment Interior Fittings & Maintenance',
  },
  {
    name: 'Ratan Panorama',
    areaNote: 'Kanpur Nagar',
    scope: 'Complete Flat Plumbing & Fixture Handover',
  },
];

export const WHY_CHOOSE_ITEMS = [
  {
    index: '01',
    title: '48+ Years Experience',
    description:
      'Proven field judgement built since the late 1970s across hundreds of homes and multi-storey buildings in Kanpur Nagar.',
    iconKey: 'award' as const,
  },
  {
    index: '02',
    title: 'Genuine Pricing',
    description:
      'Fair, transparent rates aligned with real site complexity—no arbitrary markups or hidden add-ons.',
    iconKey: 'badge' as const,
  },
  {
    index: '03',
    title: 'Clean Workmanship',
    description:
      'Every pipe joint, concealed valve, and sanitary fixture is level-checked and finished neatly.',
    iconKey: 'sparkles' as const,
  },
  {
    index: '04',
    title: 'Transparent Quotation',
    description:
      'Site inspection followed by a clear written or WhatsApp quotation detailing scope, timeline, and terms.',
    iconKey: 'file' as const,
  },
  {
    index: '05',
    title: 'Quality-Focused Work',
    description:
      'Pressure testing before plastering and careful sealing around fixtures to prevent future dampness.',
    iconKey: 'shield' as const,
  },
  {
    index: '06',
    title: 'Customer Trust',
    description:
      'Built on “विश्वास का दूसरा नाम” — standing behind our work and answering your call even after handover.',
    iconKey: 'handshake' as const,
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'service-area',
    question: 'Do you provide plumbing services outside Kanpur Nagar?',
    answer:
      'No. Kishan Plumbing Works operates exclusively within Kanpur Nagar, Uttar Pradesh. Focusing strictly on Kanpur Nagar ensures punctual site visits, dependable supervision, and prompt after-service support.',
  },
  {
    id: 'quotation-process',
    question: 'How do you prepare a quotation and pricing?',
    answer:
      'After you share your requirement on WhatsApp or call 9935670167, we understand your scope and inspect the site if required. You receive a clear, agreed quotation upfront—covering labour, fitting stages, and timelines—with genuine pricing and no hidden costs.',
  },
  {
    id: 'new-construction',
    question: 'Do you handle complete plumbing for new house construction and apartments?',
    answer:
      'Yes. We execute complete new construction plumbing from layout marking, slab sleeves, and concealed CPVC/UPVC/SWR piping to pressure testing and final bathroom, kitchen, and sanitaryware installation.',
  },
  {
    id: 'materials',
    question: 'Can we choose our own sanitaryware and pipe brands?',
    answer:
      'Yes. You are welcome to purchase fixtures and pipes of your choice, or we can guide you on reliable, genuine pipe grades and fittings suited to Kanpur water conditions and your budget.',
  },
  {
    id: 'repair-maintenance',
    question: 'Do you take repair, leakage, and bathroom renovation work?',
    answer:
      'Yes. Alongside full house and apartment projects, we handle leakage tracing, wall seepage fixes, diverter/mixer replacements, overhead tank connections, and complete bathroom upgrades across Kanpur Nagar.',
  },
  {
    id: 'book-visit',
    question: 'How quickly can I schedule a site visit or get an estimate?',
    answer:
      'Simply submit the quotation form on this page or message us directly on WhatsApp at 9935670167. We respond promptly to coordinate a convenient site inspection time in your Kanpur Nagar locality.',
  },
];

export const KANPUR_LOCALITIES = [
  'Swaroop Nagar',
  'Civil Lines',
  'Kakadeo',
  'Kalyanpur',
  'Kidwai Nagar',
  'Govind Nagar',
  'Barra',
  'Arya Nagar',
  'Tilak Nagar',
  'Gumti No. 5',
  'Shyam Nagar',
  'Lal Bangla',
  'Indira Nagar',
  'Vikas Nagar',
  'Panki',
  'Jajmau',
  'Ratan Lal Nagar',
  'Saket Nagar',
  'Other Kanpur Nagar Locality',
  'Outside Kanpur Nagar',
];
