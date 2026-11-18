import type { Language } from '../utils/plumbing';

export const LOCALITY_LABELS_HI: Record<string, string> = {
  'Swaroop Nagar': 'स्वरूप नगर (Swaroop Nagar)',
  'Civil Lines': 'सिविल लाइंस (Civil Lines)',
  Kakadeo: 'काकादेव (Kakadeo)',
  Kalyanpur: 'कल्याणपुर (Kalyanpur)',
  'Kidwai Nagar': 'किदवई नगर (Kidwai Nagar)',
  'Govind Nagar': 'गोविंद नगर (Govind Nagar)',
  Barra: 'बर्रा (Barra)',
  'Arya Nagar': 'आर्य नगर (Arya Nagar)',
  'Tilak Nagar': 'तिलक नगर (Tilak Nagar)',
  'Gumti No. 5': 'गुमटी नं. 5 (Gumti No. 5)',
  'Shyam Nagar': 'श्याम नगर (Shyam Nagar)',
  'Lal Bangla': 'लाल बंगला (Lal Bangla)',
  'Indira Nagar': 'इंदिरा नगर (Indira Nagar)',
  'Vikas Nagar': 'विकास नगर (Vikas Nagar)',
  Panki: 'पनकी (Panki)',
  Jajmau: 'जाजमऊ (Jajmau)',
  'Ratan Lal Nagar': 'रतन लाल नगर (Ratan Lal Nagar)',
  'Saket Nagar': 'साकेत नगर (Saket Nagar)',
  'Other Kanpur Nagar Locality': 'कानपुर नगर का अन्य क्षेत्र',
  'Outside Kanpur Nagar': 'कानपुर नगर से बाहर',
};

export function getLocalityDisplayLabel(canonical: string, lang: Language): string {
  if (lang === 'hi') {
    return LOCALITY_LABELS_HI[canonical] ?? canonical;
  }
  return canonical;
}

export const SERVICE_CATEGORY_LABELS: Record<
  Language,
  Record<'All' | 'Residential' | 'Commercial & Multi-Unit' | 'Pipelines & Repairs', string>
> = {
  en: {
    All: 'All',
    Residential: 'Residential',
    'Commercial & Multi-Unit': 'Commercial & Multi-Unit',
    'Pipelines & Repairs': 'Pipelines & Repairs',
  },
  hi: {
    All: 'सभी सेवाएँ',
    Residential: 'आवासीय',
    'Commercial & Multi-Unit': 'कमर्शियल और अपार्टमेंट',
    'Pipelines & Repairs': 'पाइपलाइन और रिपेयर',
  },
};

export interface LocalizedServiceContent {
  title: string;
  summary: string;
  deliverables: string[];
}

export const SERVICES_HI: Record<string, LocalizedServiceContent> = {
  'complete-house-plumbing': {
    title: 'संपूर्ण हाउस प्लंबिंग',
    summary:
      'स्वतंत्र घरों और डुप्लेक्स के लिए कन्सील्ड व बाहरी पानी सप्लाई, ड्रेनेज और ओवरहेड टैंक नेटवर्क का संपूर्ण कार्य।',
    deliverables: [
      'कन्सील्ड CPVC/UPVC पाइपलाइन',
      'ओवरहेड व अंडरग्राउंड टैंक सेटअप',
      'फुल प्रेशर टेस्टिंग',
    ],
  },
  'bathroom-fittings': {
    title: 'बाथरूम फिटिंग्स',
    summary:
      'जीरो लीकेज के साथ डायवर्टर, रेन शावर, कन्सील्ड सिस्टर्न, वॉल-हंग बेसिन और गीजर लाइन की सटीक फिटिंग।',
    deliverables: [
      'कन्सील्ड डायवर्टर व मिक्सर',
      'वॉल-हंग WC और वॉश बेसिन',
      'हॉट व कोल्ड लाइन बैलेंसिंग',
    ],
  },
  'kitchen-fittings': {
    title: 'किचन फिटिंग्स',
    summary:
      'सिंक ट्रैप का सही अलाइनमेंट, RO इनलेट पॉइंट, डिशवॉशर आउटलेट और टिकाऊ हाई-आर्क मिक्सर की सटीक फिटिंग।',
    deliverables: [
      'सिंक और वेस्ट ट्रैप सेटअप',
      'RO व किचन उपकरण पॉइंट',
      'बेहतर ड्रेनेज ढलान',
    ],
  },
  'water-pipeline-installation': {
    title: 'वॉटर पाइपलाइन इंस्टॉलेशन',
    summary:
      'समान वॉटर प्रेशर और इमारत की दीर्घकालीन सुरक्षा के लिए उच्च गुणवत्ता वाले CPVC, UPVC, GI और SWR पाइपलाइन लेआउट।',
    deliverables: [
      'मेन राइज़र व सप्लाई लाइन',
      'बूस्टर पंप कनेक्शन',
      'लीक-प्रूफ जॉइंटिंग',
    ],
  },
  'sanitary-fittings': {
    title: 'सैनिटरी फिटिंग्स',
    summary:
      'सभी आधुनिक सैनिटरीवेयर, फ्लशिंग सिस्टम, फ्लोर ट्रैप और दुर्गंध-रोधी ड्रेनेज आउटलेट्स की लेवल-जांच के साथ फिटिंग।',
    deliverables: [
      'फ्लश वाल्व व सिस्टर्न सेटअप',
      'फ्लोर ड्रेन व नहानी ट्रैप',
      'सिलिकॉन-सील्ड फिनिशिंग',
    ],
  },
  'apartment-plumbing': {
    title: 'अपार्टमेंट प्लंबिंग',
    summary:
      'कानपुर नगर के अपार्टमेंट्स में बहुमंजिला शाफ्ट स्टैक, फ्लैट-वाइज़ शटऑफ वाल्व और सोसाइटी मेंटेनेंस का साफ-सुथरा काम।',
    deliverables: [
      'वर्टिकल शाफ्ट व स्टैक लाइन',
      'फ्लैट-स्तरीय आइसोलेशन वाल्व',
      'सोसाइटी अपग्रेड कार्य',
    ],
  },
  'commercial-plumbing': {
    title: 'कमर्शियल प्लंबिंग',
    summary:
      'दफ्तरों, क्लीनिक, शोरूम और संस्थानों के लिए हैवी-ड्यूटी वॉशरूम, पैंट्री लाइन और उच्च क्षमता वाला ड्रेनेज सिस्टम।',
    deliverables: [
      'हाई-ट्रैफिक सैनिटरी सेटअप',
      'मेन ड्रेनेज हेडर लाइन',
      'नियमित साइट निरीक्षण',
    ],
  },
  'new-construction-plumbing': {
    title: 'नए निर्माण की प्लंबिंग',
    summary:
      'नींव की स्लीव मार्किंग और वॉल चेज़िंग से लेकर फाइनल फिक्सचर हैंडओवर तक हर चरण में सटीक प्लंबिंग कार्य।',
    deliverables: [
      'स्लैब स्लीव व शाफ्ट मार्किंग',
      'कन्सील्ड प्रेशर जांच',
      'फाइनल CP व सैनिटरी हैंडओवर',
    ],
  },
  'repair-maintenance': {
    title: 'रिपेयर और मेंटेनेंस',
    summary:
      'दीवारों में सीपेज, टपकते नल/मिक्सर, जाम ड्रेन लाइन और खराब वाल्व की त्वरित जांच और साफ-सुथरा समाधान।',
    deliverables: [
      'सीपेज व लीकेज की पहचान',
      'वाल्व व कार्ट्रिज रिप्लेसमेंट',
      'ड्रेन लाइन की सफाई',
    ],
  },
};

export const EXPERIENCE_PILLARS_HI = [
  {
    title: 'अनुभवी कारीगरी',
    description:
      'कास्ट आयरन, GI, CPVC, UPVC और आधुनिक कन्सील्ड डायवर्टर सिस्टम में चार दशकों से अधिक का व्यावहारिक कौशल।',
  },
  {
    title: 'सही एवं उचित दाम',
    description:
      'काम के बाद किसी भी अतिरिक्त खर्च या बढ़े हुए बिल के बिना, ईमानदार लेबर और मटेरियल मार्गदर्शन।',
  },
  {
    title: 'साफ-सुथरा काम',
    description:
      'लेज़र-सटीक पाइप अलाइनमेंट, साफ वॉल कटिंग और हर कार्य के बाद व्यवस्थित साइट हैंडओवर।',
  },
  {
    title: 'तय कोटेशन के अनुसार कार्य',
    description:
      'काम शुरू होने से पहले स्पष्ट दायरा तय किया जाता है ताकि अंतिम हैंडओवर से पहले हर बिंदु पूरा हो।',
  },
  {
    title: 'ग्राहकों से पीढ़ियों का भरोसा',
    description:
      'कानपुर नगर के परिवार और बिल्डर्स जो अपने हर नए निर्माण और प्रॉपर्टी के लिए हमें ही याद करते हैं।',
  },
];

export const VERIFIED_LOCATIONS_HI: Record<string, { name: string; areaNote: string; scope: string }> = {
  'Shivalik Apartments': {
    name: 'शिवालिक अपार्टमेंट्स (Shivalik Apartments)',
    areaNote: 'कानपुर नगर',
    scope: 'अपार्टमेंट प्लंबिंग एवं सैनिटरी इंस्टॉलेशन',
  },
  'Signature City': {
    name: 'सिग्नेचर सिटी (Signature City)',
    areaNote: 'कानपुर नगर',
    scope: 'आवासीय प्लंबिंग व वॉटर पाइपलाइन कार्य',
  },
  'New Highway City': {
    name: 'न्यू हाईवे सिटी (New Highway City)',
    areaNote: 'कानपुर नगर',
    scope: 'नया निर्माण एवं बाथरूम फिटिंग्स',
  },
  'Rudra Apartments': {
    name: 'रुद्रा अपार्टमेंट्स (Rudra Apartments)',
    areaNote: 'कानपुर नगर',
    scope: 'मल्टी-यूनिट शाफ्ट व सैनिटरी कार्य',
  },
  'Ratan Planet': {
    name: 'रतन प्लैनेट (Ratan Planet)',
    areaNote: 'कानपुर नगर',
    scope: 'अपार्टमेंट इंटीरियर फिटिंग व मेंटेनेंस',
  },
  'Ratan Panorama': {
    name: 'रतन पैनोरमा (Ratan Panorama)',
    areaNote: 'कानपुर नगर',
    scope: 'संपूर्ण फ्लैट प्लंबिंग एवं फिक्सचर हैंडओवर',
  },
};

export const WHY_CHOOSE_HI = [
  {
    index: '01',
    title: '48+ वर्षों का अनुभव',
    description:
      '1970 के दशक के अंत से कानपुर नगर के सैकड़ों घरों और बहुमंजिला इमारतों में सिद्ध कार्य अनुभव।',
  },
  {
    index: '02',
    title: 'उचित और ईमानदार मूल्य',
    description:
      'काम की वास्तविक स्थिति के अनुसार पारदर्शी दरें — कोई अनावश्यक खर्च या छिपा शुल्क नहीं।',
  },
  {
    index: '03',
    title: 'उत्कृष्ट एवं साफ कारीगरी',
    description:
      'हर पाइप जॉइंट, कन्सील्ड वाल्व और सैनिटरी फिक्सचर को लेवल-चेक के साथ सटीकता से लगाया जाता है।',
  },
  {
    index: '04',
    title: 'स्पष्ट व पारदर्शी कोटेशन',
    description:
      'साइट निरीक्षण के बाद लिखित या व्हाट्सऐप कोटेशन, जिसमें कार्य का पूरा विवरण व समयसीमा स्पष्ट हो।',
  },
  {
    index: '05',
    title: 'गुणवत्ता-केंद्रित कार्य',
    description:
      'प्लास्टर से पहले प्रेशर टेस्टिंग और भविष्य में सीलन रोकने के लिए फिक्सचर की मजबूत सीलिंग।',
  },
  {
    index: '06',
    title: 'ग्राहक का अटूट विश्वास',
    description:
      '“विश्वास का दूसरा नाम” के संकल्प के साथ, काम पूरा होने के बाद भी हर कॉल पर त्वरित सहयोग।',
  },
];

export const FAQ_ITEMS_HI = [
  {
    id: 'service-area',
    question: 'क्या आप कानपुर नगर से बाहर भी प्लंबिंग सेवाएँ देते हैं?',
    answer:
      'नहीं। किशन प्लंबिंग वर्क्स केवल कानपुर नगर (उत्तर प्रदेश) के भीतर ही सेवाएँ प्रदान करता है। केवल कानपुर नगर पर केंद्रित रहने से हम समय पर साइट विज़िट, सख्त गुणवत्ता निगरानी और तुरंत सहायता सुनिश्चित कर पाते हैं।',
  },
  {
    id: 'quotation-process',
    question: 'आप कोटेशन और रेट कैसे तय करते हैं?',
    answer:
      'व्हाट्सऐप या 9935670167 पर आपकी आवश्यकता समझने के बाद आवश्यकतानुसार साइट निरीक्षण किया जाता है। इसके बाद लेबर, कार्य के चरण और समयसीमा सहित एक स्पष्ट व तय कोटेशन दिया जाता है — बिना किसी छिपे शुल्क के।',
  },
  {
    id: 'new-construction',
    question: 'क्या आप नए घर और अपार्टमेंट की पूरी प्लंबिंग का काम करते हैं?',
    answer:
      'जी हाँ। लेआउट मार्किंग, स्लैब स्लीव और कन्सील्ड CPVC/UPVC/SWR पाइपिंग से लेकर प्रेशर टेस्टिंग और बाथरूम, किचन व सैनिटरीवेयर की अंतिम फिटिंग तक सारा काम हम करते हैं।',
  },
  {
    id: 'materials',
    question: 'क्या हम अपनी पसंद के सैनिटरीवेयर और पाइप ब्रांड चुन सकते हैं?',
    answer:
      'जी बिल्कुल। आप अपनी पसंद के फिक्सचर और पाइप खरीद सकते हैं, या कानपुर के पानी और आपके बजट के अनुसार टिकाऊ व असली मटेरियल चुनने में हम सही सलाह दे सकते हैं।',
  },
  {
    id: 'repair-maintenance',
    question: 'क्या आप लीकेज, सीलन रिपेयर और बाथरूम रिनोवेशन का काम भी करते हैं?',
    answer:
      'जी हाँ। पूरे मकान और अपार्टमेंट के अलावा हम कानपुर नगर में लीकेज जांच, दीवार की सीपेज रिपेयर, डायवर्टर/मिक्सर बदलने, टैंक कनेक्शन और बाथरूम अपग्रेड का कार्य भी करते हैं।',
  },
  {
    id: 'book-visit',
    question: 'साइट विज़िट या एस्टिमेट कितनी जल्दी मिल सकता है?',
    answer:
      'इस पेज पर कोटेशन फॉर्म भरें या सीधे 9935670167 पर व्हाट्सऐप करें। हम कानपुर नगर में आपके क्षेत्र के अनुसार सुविधाजनक साइट निरीक्षण समय तय करने के लिए तुरंत संपर्क करते हैं।',
  },
];

export const UI_COPY = {
  en: {
    docTitle: 'Kishan Plumbing Works — 48+ Years of Plumbing & Sanitary Excellence in Kanpur Nagar',
    brandName: 'Kishan Plumbing Works',
    taglineHindi: 'विश्वास का दूसरा नाम।',
    servingOnly: 'Serving Kanpur Nagar Only',
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      experience: 'Experience',
      faq: 'FAQ',
      contact: 'Contact',
      whatsappUs: 'WhatsApp Us',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
    },
    hero: {
      kickerBrand: 'Kishan Plumbing Works',
      kickerTrust: 'The Benchmark of Trust',
      kickerArea: 'Serving Kanpur Nagar Only',
      headlineLine1: '48+ Years of Experience.',
      headlineLine2: 'Trust in Every Installation.',
      subtitle:
        'Complete Plumbing & Sanitary Solutions for Homes, Apartments, and Commercial Buildings in Kanpur Nagar.',
      legacyLine: '48+ Years of Legacy · Genuine Pricing · Zero Compromise on Quality',
      ctaQuote: 'Get a Free Quotation',
      ctaWhatsApp: 'WhatsApp Us',
      imageAlt:
        'Luxury bathroom sanitary and concealed brass faucet installation by Kishan Plumbing Works',
      imageFallback: 'Complete Plumbing & Sanitary Works',
      imageBadge: 'Kanpur Nagar Exclusive',
      imageCaption: 'Concealed Pipelines, Luxury Sanitaryware & Complete Site Execution',
      stat1Title: 'Years of Experience',
      stat1Sub: 'Trusted across generations',
      stat2Value: 'Kanpur Nagar',
      stat2Title: 'Dedicated Service Area',
      stat2Sub: 'Fast local site visits',
      stat3Title: 'Agreed Quotation Scope',
      stat3Sub: 'Genuine pricing upfront',
      stat4Title: 'Direct Call & WhatsApp',
      stat4Sub: 'Book a site estimate today',
    },
    about: {
      eyebrow: 'Our Story',
      heading: '48+ Years of Craftsmanship, Fair Pricing & Unbroken Commitments.',
      p1Start:
        'For over four decades in Kanpur Nagar, Kishan Plumbing Works has stood for one simple promise:',
      p1Quote: '“विश्वास का दूसरा नाम।”',
      p1End:
        'Whether we are laying concealed water pipelines for a brand-new duplex or fitting modern sanitaryware across multi-storey apartment blocks, we treat every wall and every pipe joint with long-term accountability.',
      p2: 'Homeowners and builders trust us because our quotations are transparent, our pricing is genuine, and we never leave an agreed detail incomplete. When the plaster goes on and fixtures are handed over, our work stays leak-free for years.',
      legacyLabel: 'Kanpur Nagar Legacy',
      legacyYears: '48+ Years',
      legacyDesc:
        'Serving homeowners, residential apartments, and commercial sites across Kanpur Nagar with honest workmanship since day one.',
      highlights: [
        {
          title: 'Clean Alignment & Pressure-Tested Lines',
          desc: 'Measured slopes, level-checked fittings, and pressure verification before wall finishing.',
        },
        {
          title: 'Every Agreed Point Completed',
          desc: 'We honour the exact quotation and timeline committed during your Kanpur Nagar site inspection.',
        },
        {
          title: 'Genuine Pricing, Zero Surprises',
          desc: 'Honest guidance on pipe grades and fittings so you pay only for what your building truly needs.',
        },
      ],
    },
    services: {
      eyebrow: 'Our Services',
      heading: 'Complete Plumbing & Sanitary Solutions in Kanpur Nagar',
      subtitle:
        'Choose a service below to enquire directly on WhatsApp or pre-fill your quotation request.',
      whatsappBtn: 'WhatsApp Enquiry',
      quoteBtn: 'Quote',
      selectedBtn: 'Selected',
      selectedToastTitle: (name: string) => `${name} Selected`,
      selectedToastDesc:
        'Service pre-filled in the quotation form below. Complete your Kanpur Nagar locality to send.',
    },
    experience: {
      eyebrow: 'Proven Track Record',
      yearsUnit: 'Years',
      heading: '48+ Years of Trust & Experience',
      subtitle:
        'From independent family residences to multi-storey housing societies across Kanpur Nagar, our reputation is built on clean execution and standing by our agreed word.',
      locationsEyebrow: 'Verified Work Locations',
      locationsHeading: 'Apartments & Residential Societies in Kanpur Nagar',
      locationsSub: 'Previous work locations served across Kanpur Nagar',
    },
    whyChoose: {
      eyebrow: 'Why Choose Us',
      heading: 'Standards That Homeowners & Builders Rely On',
      subtitle:
        'Every pipe, valve, and sanitary fixture is installed with long-term durability and complete transparency in Kanpur Nagar.',
    },
    ctaBanner: {
      eyebrow: 'Serving Kanpur Nagar Only',
      heading: 'Planning Home Plumbing, Bathroom Fittings, or New Construction?',
      subtitle:
        'Discuss your site requirements directly with 48+ years of plumbing expertise and receive an honest, agreed quotation.',
      quoteBtn: 'Get a Free Quotation',
      whatsappBtn: 'WhatsApp Us',
    },
    faq: {
      eyebrow: 'Frequently Asked Questions',
      heading: 'Clear Answers Before We Begin Your Work',
      subtitle:
        'Everything you need to know about quotations, pricing, apartment plumbing, and our Kanpur Nagar service coverage.',
    },
    contact: {
      heading: 'Get Your Transparent Quotation on WhatsApp',
      subtitle:
        'Share your plumbing requirement and Kanpur Nagar locality. We review your scope and respond directly via WhatsApp or phone call.',
      panelEyebrow: 'Official Contact & WhatsApp',
      cityTitle: 'Kanpur Nagar, Uttar Pradesh',
      cityDesc:
        'Exclusively serving homes, apartments & commercial buildings within Kanpur Nagar.',
      directWhatsApp: 'Direct WhatsApp',
      callNow: 'Call Now',
      whyOnlyTitle: 'Why Kanpur Nagar Only?',
      whyOnlyDesc:
        'Operating exclusively within Kanpur Nagar allows Kishan Plumbing Works to inspect sites on time, supervise installation quality closely, and honour commitments without delays.',
      formTitle: 'Request a Free Quotation',
      formSubtitle: 'All fields are pre-formatted for instant WhatsApp submission.',
      formBadge: 'Kanpur Nagar Only',
      nameLabel: 'Full Name',
      namePlaceholder: 'e.g. Rajesh Gupta',
      phoneLabel: 'Mobile Number',
      phonePlaceholder: 'e.g. 98390 12345',
      serviceLabel: 'Service Required',
      localityLabel: 'Locality (Kanpur Nagar)',
      useLiveLocation: 'Use Live Location',
      fetchingGps: 'Fetching GPS...',
      localityPlaceholder: 'Type or select Kanpur Nagar locality...',
      useTypedLocality: 'Use typed locality:',
      customTag: 'Custom',
      showOptions: 'Show locality options',
      closeOptions: 'Close locality options',
      customLocalityLabel: 'Enter Your Area / Society Name in Kanpur Nagar',
      customLocalityPlaceholder: 'e.g. Shivalik Apartments, Azad Nagar, Shastri Nagar',
      outsideTitle: 'Serving Kanpur Nagar Only',
      outsideDesc:
        'Thank you for reaching out. Kishan Plumbing Works currently serves properties exclusively within Kanpur Nagar, Uttar Pradesh. Please enter a Kanpur Nagar locality if your site is located in the city.',
      detailsLabel: 'Work Details',
      detailsPlaceholder:
        'Describe your requirement (e.g. new 2-floor house plumbing, 3 bathroom diverter fittings, kitchen sink line, or leakage repair)...',
      submitBtn: 'Send Enquiry on WhatsApp',
      submittingBtn: 'Preparing WhatsApp...',
      directTo: 'Direct to',
      confirmedTitle: 'Enquiry Prepared for WhatsApp',
      confirmedDesc:
        'If WhatsApp did not open automatically, click the button below to send your pre-filled quotation request to 9935670167.',
      openWhatsAppNow: 'Open WhatsApp Now',
      gpsDetectedNear: 'Live GPS detected near',
      gpsDetectedExact: 'Live GPS detected',
      gpsUnsupported: 'Live GPS is not supported on this browser. Please type or pick your locality below.',
      gpsDenied:
        'Browser location access is blocked. Tap the lock/site icon in your address bar to allow Location, or pick your Kanpur Nagar area below.',
      gpsDeniedPolicy:
        'Live GPS was blocked inside this embedded preview window. Allow Location access, open the site in a new tab for GPS, or select your Kanpur Nagar area below.',
      gpsFailed: 'Unable to fetch GPS signal right now. Please type or pick your Kanpur Nagar locality below.',
      gpsRetryBtn: 'Retry GPS',
      gpsOpenNewTab: 'Open in New Tab for GPS',
      gpsQuickPickTitle: 'Quick select Kanpur Nagar area:',
      gpsSuccessTitle: 'Live Location Added',
      gpsSuccessDesc: (area: string) => `Detected ${area}, Kanpur Nagar in your quotation form.`,
      gpsOutsideDesc:
        'Your live GPS location appears outside Kanpur Nagar. We serve Kanpur Nagar exclusively.',
      gpsUnavailableTitle: 'Live Location Needs Permission',
      formOutsideDesc:
        'We operate exclusively in Kanpur Nagar, Uttar Pradesh and cannot accept outside-city enquiries.',
      formCheckTitle: 'Please Check Your Details',
      formCheckDesc: 'Fill in your name, 10-digit mobile number, locality, and brief work details.',
      formReadyTitle: 'Quotation Enquiry Ready',
      formReadyDesc:
        'Your details are validated. Click Open WhatsApp Now to send your enquiry to Kishan Plumbing Works.',
    },
    footer: {
      summary:
        '“48+ Years of Experience. Genuine Pricing. Complete Trust.” Complete residential, apartment, and commercial plumbing & sanitary solutions.',
      areaNote: 'Serving Kanpur Nagar Only, Uttar Pradesh',
      navHeading: 'Navigation',
      servicesHeading: 'Key Services',
      directHeading: 'Direct Enquiry',
      directDesc: 'Call or WhatsApp for site inspections and agreed quotations in Kanpur Nagar.',
      copyright: (year: number) =>
        `© ${year} Kishan Plumbing Works. Serving Kanpur Nagar Only.`,
      excellence: '48+ Years of Plumbing & Sanitary Excellence',
    },
    floating: {
      whatsappLabel: 'WhatsApp Us',
      whatsappAria: 'Chat with Kishan Plumbing Works on WhatsApp',
      callNow: 'Call Now',
      whatsappMobile: 'WhatsApp',
    },
  },
  hi: {
    docTitle: 'किशन प्लंबिंग वर्क्स — कानपुर नगर में 48+ वर्षों का प्लंबिंग और सैनिटरी विश्वास',
    brandName: 'किशन प्लंबिंग वर्क्स',
    taglineHindi: 'विश्वास का दूसरा नाम।',
    servingOnly: 'केवल कानपुर नगर में सेवाएँ',
    nav: {
      home: 'होम',
      about: 'परिचय',
      services: 'सेवाएँ',
      experience: 'अनुभव',
      faq: 'सवाल-जवाब',
      contact: 'संपर्क',
      whatsappUs: 'व्हाट्सऐप करें',
      openMenu: 'नेविगेशन मेन्यू खोलें',
      closeMenu: 'नेविगेशन मेन्यू बंद करें',
    },
    hero: {
      kickerBrand: 'किशन प्लंबिंग वर्क्स',
      kickerTrust: 'विश्वास का दूसरा नाम।',
      kickerArea: 'केवल कानपुर नगर के लिए सेवा',
      headlineLine1: '48+ वर्षों का अनुभव।',
      headlineLine2: 'हर काम में भरोसा।',
      subtitle:
        'कानपुर नगर में घरों, अपार्टमेंट्स और कमर्शियल बिल्डिंग्स के लिए संपूर्ण प्लंबिंग एवं सैनिटरी समाधान।',
      legacyLine: '48+ वर्षों की विरासत · उचित एवं पारदर्शी दाम · गुणवत्ता से कोई समझौता नहीं',
      ctaQuote: 'मुफ्त कोटेशन प्राप्त करें',
      ctaWhatsApp: 'व्हाट्सऐप पर बात करें',
      imageAlt: 'किशन प्लंबिंग वर्क्स द्वारा लक्ज़री बाथरूम सैनिटरी और कन्सील्ड ब्रास फिटिंग कार्य',
      imageFallback: 'संपूर्ण प्लंबिंग एवं सैनिटरी कार्य',
      imageBadge: 'केवल कानपुर नगर',
      imageCaption: 'कन्सील्ड पाइपलाइन, प्रीमियम सैनिटरी फिटिंग और संपूर्ण साइट कार्य',
      stat1Title: 'वर्षों का अनुभव',
      stat1Sub: 'पीढ़ियों का अटूट विश्वास',
      stat2Value: 'कानपुर नगर',
      stat2Title: 'समर्पित सेवा क्षेत्र',
      stat2Sub: 'त्वरित स्थानीय साइट विज़िट',
      stat3Title: 'तय कोटेशन के अनुसार काम',
      stat3Sub: 'पहले से स्पष्ट और सही दाम',
      stat4Title: 'सीधा कॉल एवं व्हाट्सऐप',
      stat4Sub: 'आज ही साइट एस्टिमेट बुक करें',
    },
    about: {
      eyebrow: 'हमारी कहानी',
      heading: '48+ वर्षों की कारीगरी, उचित दाम और निभाए गए वादों की पहचान।',
      p1Start: 'कानपुर नगर में चार दशकों से अधिक समय से किशन प्लंबिंग वर्क्स एक ही वादे पर कायम है:',
      p1Quote: '“विश्वास का दूसरा नाम।”',
      p1End:
        'चाहे नए डुप्लेक्स में कन्सील्ड वॉटर पाइपलाइन बिछानी हो या बहुमंजिला अपार्टमेंट्स में आधुनिक सैनिटरीवेयर की फिटिंग करनी हो, हम हर दीवार और हर पाइप जॉइंट पर पूरी जिम्मेदारी से काम करते हैं।',
      p2: 'घर के मालिक और बिल्डर्स हम पर भरोसा करते हैं क्योंकि हमारे कोटेशन साफ होते हैं, दाम सही होते हैं और हम तय किया गया कोई भी काम अधूरा नहीं छोड़ते। प्लास्टर और फिटिंग पूरी होने के बाद भी हमारा काम सालों तक लीक-मुक्त रहता है।',
      legacyLabel: 'कानपुर नगर की विरासत',
      legacyYears: '48+ वर्ष',
      legacyDesc:
        'पहले दिन से ईमानदार कारीगरी के साथ कानपुर नगर के घरों, अपार्टमेंट्स और कमर्शियल साइट्स की सेवा में।',
      highlights: [
        {
          title: 'सटीक अलाइनमेंट और प्रेशर-टेस्टेड पाइपलाइन',
          desc: 'दीवार फिनिशिंग से पहले सटीक ढलान, लेवल जांच और पूर्ण प्रेशर परीक्षण।',
        },
        {
          title: 'तय किए गए हर बिंदु की 100% पूर्ति',
          desc: 'कानपुर नगर साइट निरीक्षण के दौरान तय किए गए कोटेशन और समयसीमा का पूरा सम्मान।',
        },
        {
          title: 'सही दाम, कोई अनचाहा खर्च नहीं',
          desc: 'पाइप ग्रेड और फिटिंग्स पर ईमानदार सलाह ताकि आप केवल ज़रूरी और टिकाऊ मटेरियल पर खर्च करें।',
        },
      ],
    },
    services: {
      eyebrow: 'हमारी सेवाएँ',
      heading: 'कानपुर नगर में संपूर्ण प्लंबिंग और सैनिटरी सेवाएँ',
      subtitle:
        'सीधे व्हाट्सऐप पर पूछताछ करने या कोटेशन फॉर्म में सेवा भरने के लिए नीचे से अपनी आवश्यकता चुनें।',
      whatsappBtn: 'व्हाट्सऐप पूछताछ',
      quoteBtn: 'कोटेशन',
      selectedBtn: 'चयनित',
      selectedToastTitle: (name: string) => `${name} चयनित`,
      selectedToastDesc:
        'नीचे कोटेशन फॉर्म में सेवा भर दी गई है। भेजने के लिए अपना कानपुर नगर क्षेत्र चुनें।',
    },
    experience: {
      eyebrow: 'प्रमाणित कार्य अनुभव',
      yearsUnit: 'वर्ष',
      heading: '48+ वर्षों का अनुभव और अटूट भरोसा',
      subtitle:
        'स्वतंत्र परिवारिक आवासों से लेकर कानपुर नगर की बहुमंजिला आवासीय सोसाइटियों तक, हमारी पहचान साफ-सुथरे काम और जुबान निभाने से है।',
      locationsEyebrow: 'प्रमाणित कार्य स्थल',
      locationsHeading: 'कानपुर नगर के प्रमुख अपार्टमेंट्स एवं आवासीय सोसाइटियाँ',
      locationsSub: 'कानपुर नगर में पूर्व में संपन्न किए गए प्रमुख कार्य स्थल',
    },
    whyChoose: {
      eyebrow: 'हमें क्यों चुनें',
      heading: 'वे मानक जिन पर घर के मालिक और बिल्डर्स भरोसा करते हैं',
      subtitle:
        'कानपुर नगर में हर पाइप, वाल्व और सैनिटरी फिक्सचर को दीर्घकालीन टिकाऊपन और पूर्ण पारदर्शिता के साथ लगाया जाता है।',
    },
    ctaBanner: {
      eyebrow: 'केवल कानपुर नगर में सेवाएँ',
      heading: 'क्या आप घर की प्लंबिंग, बाथरूम फिटिंग या नए निर्माण की योजना बना रहे हैं?',
      subtitle:
        '48+ वर्षों के प्लंबिंग अनुभव के साथ अपनी साइट की ज़रूरतों पर सीधी चर्चा करें और ईमानदार, तय कोटेशन प्राप्त करें।',
      quoteBtn: 'मुफ्त कोटेशन प्राप्त करें',
      whatsappBtn: 'व्हाट्सऐप पर बात करें',
    },
    faq: {
      eyebrow: 'अक्सर पूछे जाने वाले प्रश्न',
      heading: 'काम शुरू करने से पहले स्पष्ट जानकारी',
      subtitle:
        'कोटेशन, उचित दाम, अपार्टमेंट प्लंबिंग और हमारी कानपुर नगर सेवा सीमा से जुड़े सभी प्रमुख सवालों के जवाब।',
    },
    contact: {
      heading: 'व्हाट्सऐप पर अपना पारदर्शी कोटेशन प्राप्त करें',
      subtitle:
        'अपनी प्लंबिंग आवश्यकता और कानपुर नगर का क्षेत्र साझा करें। हम आपके कार्य का विवरण देखकर सीधे व्हाट्सऐप या फोन कॉल पर संपर्क करेंगे।',
      panelEyebrow: 'आधिकारिक संपर्क एवं व्हाट्सऐप',
      cityTitle: 'कानपुर नगर, उत्तर प्रदेश',
      cityDesc: 'केवल कानपुर नगर के घरों, अपार्टमेंट्स और कमर्शियल इमारतों के लिए समर्पित।',
      directWhatsApp: 'सीधा व्हाट्सऐप',
      callNow: 'अभी कॉल करें',
      whyOnlyTitle: 'केवल कानपुर नगर ही क्यों?',
      whyOnlyDesc:
        'केवल कानपुर नगर में काम करने से किशन प्लंबिंग वर्क्स समय पर साइट निरीक्षण कर पाता है, कारीगरी की करीबी निगरानी करता है और हर वादे को बिना देरी निभाता है।',
      formTitle: 'मुफ्त कोटेशन का अनुरोध करें',
      formSubtitle: 'तुरंत व्हाट्सऐप भेजने के लिए सभी विवरण पहले से तैयार हो जाते हैं।',
      formBadge: 'केवल कानपुर नगर',
      nameLabel: 'पूरा नाम',
      namePlaceholder: 'जैसे: राजेश गुप्ता',
      phoneLabel: 'मोबाइल नंबर',
      phonePlaceholder: 'जैसे: 98390 12345',
      serviceLabel: 'आवश्यक सेवा',
      localityLabel: 'क्षेत्र / इलाका (कानपुर नगर)',
      useLiveLocation: 'लाइव लोकेशन लें',
      fetchingGps: 'GPS प्राप्त हो रहा है...',
      localityPlaceholder: 'कानपुर नगर का क्षेत्र लिखें या चुनें...',
      useTypedLocality: 'लिखा गया क्षेत्र चुनें:',
      customTag: 'कस्टम',
      showOptions: 'क्षेत्र के विकल्प दिखाएँ',
      closeOptions: 'क्षेत्र के विकल्प बंद करें',
      customLocalityLabel: 'कानपुर नगर में अपने मोहल्ले या सोसाइटी का नाम लिखें',
      customLocalityPlaceholder: 'जैसे: शिवालिक अपार्टमेंट्स, आज़ाद नगर, शास्त्री नगर',
      outsideTitle: 'केवल कानपुर नगर में सेवाएँ',
      outsideDesc:
        'संपर्क करने के लिए धन्यवाद। किशन प्लंबिंग वर्क्स वर्तमान में केवल कानपुर नगर (उत्तर प्रदेश) के भीतर ही सेवाएँ प्रदान करता है। यदि आपकी साइट कानपुर नगर में है, तो कृपया शहर का स्थानीय क्षेत्र दर्ज करें।',
      detailsLabel: 'कार्य का विवरण',
      detailsPlaceholder:
        'अपनी आवश्यकता लिखें (जैसे: नए 2-मंजिला मकान की प्लंबिंग, 3 बाथरूम डायवर्टर फिटिंग, किचन सिंक लाइन या लीकेज रिपेयर)...',
      submitBtn: 'व्हाट्सऐप पर पूछताछ भेजें',
      submittingBtn: 'व्हाट्सऐप तैयार हो रहा है...',
      directTo: 'सीधे भेजें:',
      confirmedTitle: 'व्हाट्सऐप के लिए पूछताछ तैयार है',
      confirmedDesc:
        'यदि व्हाट्सऐप अपने-आप नहीं खुला हो, तो 9935670167 पर अपना भरा हुआ कोटेशन अनुरोध भेजने के लिए नीचे दिए बटन पर क्लिक करें।',
      openWhatsAppNow: 'अभी व्हाट्सऐप खोलें',
      gpsDetectedNear: 'लाइव GPS नज़दीकी क्षेत्र',
      gpsDetectedExact: 'लाइव GPS द्वारा प्राप्त क्षेत्र',
      gpsUnsupported: 'इस ब्राउज़र में लाइव GPS उपलब्ध नहीं है। कृपया नीचे अपना क्षेत्र लिखें या चुनें।',
      gpsDenied:
        'ब्राउज़र में लोकेशन की अनुमति बंद है। एड्रेस बार के लॉक/सेटिंग आइकन से Location Allow करें, या नीचे अपना कानपुर नगर क्षेत्र चुनें।',
      gpsDeniedPolicy:
        'इस एम्बेडेड प्रीव्यू विंडो में लोकेशन अनुमति सीमित है। GPS के लिए साइट को नए टैब में खोलें, या नीचे से सीधे अपना कानपुर नगर क्षेत्र चुनें।',
      gpsFailed: 'अभी GPS सिग्नल नहीं मिल सका। कृपया नीचे अपना कानपुर नगर क्षेत्र लिखें या चुनें।',
      gpsRetryBtn: 'फिर कोशिश करें',
      gpsOpenNewTab: 'GPS के लिए नए टैब में खोलें',
      gpsQuickPickTitle: 'कानपुर नगर का क्षेत्र तुरंत चुनें:',
      gpsSuccessTitle: 'लाइव लोकेशन जुड़ गई',
      gpsSuccessDesc: (area: string) => `आपके फॉर्म में ${area}, कानपुर नगर दर्ज हो गया है।`,
      gpsOutsideDesc:
        'आपकी लाइव GPS लोकेशन कानपुर नगर से बाहर दिख रही है। हम केवल कानपुर नगर में सेवाएँ देते हैं।',
      gpsUnavailableTitle: 'लोकेशन अनुमति आवश्यक है',
      formOutsideDesc:
        'हम केवल कानपुर नगर, उत्तर प्रदेश में काम करते हैं और शहर के बाहर के अनुरोध स्वीकार नहीं कर सकते।',
      formCheckTitle: 'कृपया अपना विवरण जांचें',
      formCheckDesc: 'अपना नाम, 10 अंकों का मोबाइल नंबर, क्षेत्र और कार्य का विवरण भरें।',
      formReadyTitle: 'कोटेशन पूछताछ तैयार है',
      formReadyDesc:
        'आपका विवरण मान्य है। किशन प्लंबिंग वर्क्स को भेजने के लिए "अभी व्हाट्सऐप खोलें" पर क्लिक करें।',
    },
    footer: {
      summary:
        '“48+ वर्षों का अनुभव। उचित दाम। संपूर्ण विश्वास।” घरों, अपार्टमेंट्स और कमर्शियल इमारतों के लिए संपूर्ण प्लंबिंग एवं सैनिटरी सेवाएँ।',
      areaNote: 'केवल कानपुर नगर, उत्तर प्रदेश में सेवारत',
      navHeading: 'नेविगेशन',
      servicesHeading: 'प्रमुख सेवाएँ',
      directHeading: 'सीधा संपर्क',
      directDesc: 'कानपुर नगर में साइट निरीक्षण और तय कोटेशन के लिए कॉल या व्हाट्सऐप करें।',
      copyright: (year: number) => `© ${year} किशन प्लंबिंग वर्क्स। केवल कानपुर नगर में सेवारत।`,
      excellence: '48+ वर्षों की प्लंबिंग एवं सैनिटरी उत्कृष्टता',
    },
    floating: {
      whatsappLabel: 'व्हाट्सऐप करें',
      whatsappAria: 'किशन प्लंबिंग वर्क्स से व्हाट्सऐप पर बात करें',
      callNow: 'कॉल करें',
      whatsappMobile: 'व्हाट्सऐप',
    },
  },
} as const;
