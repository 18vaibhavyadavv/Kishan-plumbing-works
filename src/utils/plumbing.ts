export type Language = 'en' | 'hi';

export const OFFICIAL_PHONE = '9935670167';
export const DISPLAY_PHONE = '+91 99356 70167';
export const TEL_LINK = `tel:+91${OFFICIAL_PHONE}`;
export const WHATSAPP_BASE_URL = `https://wa.me/91${OFFICIAL_PHONE}`;
export const DEFAULT_WHATSAPP_MESSAGE =
  'Namaste Kishan Plumbing Works! Mujhe plumbing service ke liye quotation chahiye.';
export const DEFAULT_WHATSAPP_MESSAGE_HI =
  'नमस्ते किशन प्लंबिंग वर्क्स! मुझे कानपुर नगर में प्लंबिंग सेवा के लिए कोटेशन चाहिए।';
export const SERVICE_AREA_LABEL = 'Serving Kanpur Nagar Only';

export interface LiveCoordinates {
  lat: number;
  lng: number;
}

export interface EnquiryFormData {
  name: string;
  phone: string;
  service: string;
  locality: string;
  customLocality?: string;
  workDetails: string;
  coordinates?: LiveCoordinates | null;
}

export interface EnquiryErrors {
  name?: string;
  phone?: string;
  service?: string;
  locality?: string;
  customLocality?: string;
  workDetails?: string;
}

export interface EnquiryValidationResult {
  valid: boolean;
  errors: EnquiryErrors;
  outsideServiceArea: boolean;
  resolvedLocality: string;
  normalizedPhone: string;
}

const OUTSIDE_CITIES = [
  'lucknow',
  'लखनऊ',
  'unnao',
  'उन्नाव',
  'kanpur dehat',
  'कानपुर देहात',
  'akbarpur',
  'अकबरपुर',
  'delhi',
  'दिल्ली',
  'ncr',
  'noida',
  'नोएडा',
  'gurgaon',
  'gurugram',
  'गुरुग्राम',
  'ghaziabad',
  'गाजियाबाद',
  'agra',
  'आगरा',
  'prayagraj',
  'allahabad',
  'प्रयागराज',
  'varanasi',
  'banaras',
  'वाराणसी',
  'jhansi',
  'झांसी',
  'etawah',
  'इटावा',
  'fatehpur',
  'फतेहपुर',
  'kannauj',
  'कन्नौज',
  'farrukhabad',
  'फर्रुखाबाद',
  'barabanki',
  'hardoi',
  'sitapur',
  'raebareli',
  'rae bareli',
  'mumbai',
  'मुंबई',
  'pune',
  'bangalore',
  'bengaluru',
  'jaipur',
  'outside kanpur',
  'कानपुर नगर से बाहर',
];

export interface KanpurGeoAnchor {
  name: string;
  lat: number;
  lng: number;
}

export const KANPUR_LOCALITY_ANCHORS: KanpurGeoAnchor[] = [
  { name: 'Swaroop Nagar', lat: 26.4807, lng: 80.3143 },
  { name: 'Civil Lines', lat: 26.4735, lng: 80.3514 },
  { name: 'Kakadeo', lat: 26.4733, lng: 80.2952 },
  { name: 'Kalyanpur', lat: 26.5065, lng: 80.2564 },
  { name: 'Kidwai Nagar', lat: 26.4337, lng: 80.3264 },
  { name: 'Govind Nagar', lat: 26.4472, lng: 80.3054 },
  { name: 'Barra', lat: 26.4252, lng: 80.2981 },
  { name: 'Arya Nagar', lat: 26.4823, lng: 80.3228 },
  { name: 'Tilak Nagar', lat: 26.4855, lng: 80.3212 },
  { name: 'Gumti No. 5', lat: 26.4623, lng: 80.3097 },
  { name: 'Shyam Nagar', lat: 26.4209, lng: 80.3714 },
  { name: 'Lal Bangla', lat: 26.4396, lng: 80.3788 },
  { name: 'Indira Nagar', lat: 26.5005, lng: 80.2785 },
  { name: 'Vikas Nagar', lat: 26.4946, lng: 80.2921 },
  { name: 'Panki', lat: 26.4664, lng: 80.2414 },
  { name: 'Jajmau', lat: 26.4357, lng: 80.4021 },
  { name: 'Ratan Lal Nagar', lat: 26.4426, lng: 80.2953 },
  { name: 'Saket Nagar', lat: 26.4366, lng: 80.3173 },
];

export function getDefaultWhatsAppMessage(lang: Language = 'en'): string {
  return lang === 'hi' ? DEFAULT_WHATSAPP_MESSAGE_HI : DEFAULT_WHATSAPP_MESSAGE;
}

export function buildWhatsAppUrl(
  message: string = DEFAULT_WHATSAPP_MESSAGE,
  lang: Language = 'en'
): string {
  const fallback = getDefaultWhatsAppMessage(lang);
  const cleanMessage = message.trim() || fallback;
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(cleanMessage)}`;
}

export function buildServiceWhatsAppUrl(serviceName: string, lang: Language = 'en'): string {
  const cleanService = serviceName.trim();
  if (!cleanService) {
    return buildWhatsAppUrl(getDefaultWhatsAppMessage(lang), lang);
  }
  const message =
    lang === 'hi'
      ? `नमस्ते किशन प्लंबिंग वर्क्स! मुझे "${cleanService}" सेवा के लिए कोटेशन चाहिए। स्थान: कानपुर नगर।`
      : `Namaste Kishan Plumbing Works! Mujhe "${cleanService}" service ke liye quotation chahiye. Location: Kanpur Nagar.`;
  return buildWhatsAppUrl(message, lang);
}

export function normalizeIndianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return digits;
}

export function isOutsideKanpur(locality: string, customLocality: string = ''): boolean {
  const trimmedLocality = locality.trim().toLowerCase();
  if (trimmedLocality === 'outside kanpur nagar' || trimmedLocality === 'कानपुर नगर से बाहर') {
    return true;
  }

  const combined = `${locality} ${customLocality}`.toLowerCase();
  return OUTSIDE_CITIES.some((city) => {
    const escaped = city.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const isAscii = /^[a-z0-9\s]+$/i.test(city);
    const regex = isAscii ? new RegExp(`\\b${escaped}\\b`, 'i') : new RegExp(escaped, 'i');
    return regex.test(combined);
  });
}

export function isWithinKanpurNagarCoords(lat: number, lng: number): boolean {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return false;
  // Kanpur Nagar metro + urban/peri-urban bounds (~26.20..26.70 N, ~80.05..80.55 E)
  return lat >= 26.2 && lat <= 26.7 && lng >= 80.05 && lng <= 80.55;
}

export function matchNearestKanpurLocality(lat: number, lng: number): string {
  let bestName = KANPUR_LOCALITY_ANCHORS[0].name;
  let bestDist = Infinity;

  for (const anchor of KANPUR_LOCALITY_ANCHORS) {
    const dLat = lat - anchor.lat;
    const dLng = lng - anchor.lng;
    const dist = dLat * dLat + dLng * dLng;
    if (dist < bestDist) {
      bestDist = dist;
      bestName = anchor.name;
    }
  }

  return bestName;
}

export type GeolocationErrorReason = 'policy_blocked' | 'user_denied' | 'unavailable' | 'timeout';

export function classifyGeolocationError(
  code: number,
  message: string = '',
  isEmbedded: boolean = false
): GeolocationErrorReason {
  const lowerMsg = message.toLowerCase();
  if (code === 1) {
    if (
      lowerMsg.includes('permissions policy') ||
      lowerMsg.includes('feature policy') ||
      lowerMsg.includes('origin') ||
      isEmbedded
    ) {
      return 'policy_blocked';
    }
    return 'user_denied';
  }
  if (code === 3) {
    return 'timeout';
  }
  return 'unavailable';
}

export function filterLocalities(
  localities: string[],
  query: string,
  aliases?: Record<string, string>
): string[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return localities;

  const matched = localities.filter((item) => {
    const alias = aliases?.[item]?.toLowerCase() ?? '';
    return item.toLowerCase().includes(normalized) || alias.includes(normalized);
  });
  // Always keep "Other Kanpur Nagar Locality" accessible when filtering so users can pick it
  const otherOption = 'Other Kanpur Nagar Locality';
  if (localities.includes(otherOption) && !matched.includes(otherOption)) {
    matched.push(otherOption);
  }
  return matched;
}

export function validateEnquiryForm(
  data: EnquiryFormData,
  lang: Language = 'en'
): EnquiryValidationResult {
  const errors: EnquiryErrors = {};
  const name = data.name.trim();
  const normalizedPhone = normalizeIndianPhone(data.phone);
  const service = data.service.trim();
  const locality = data.locality.trim();
  const customLocality = (data.customLocality || '').trim();
  const workDetails = data.workDetails.trim();
  const isHi = lang === 'hi';

  if (name.length < 2) {
    errors.name = isHi
      ? 'कृपया अपना पूरा नाम लिखें (कम से कम 2 अक्षर)।'
      : 'Please enter your full name (at least 2 characters).';
  }

  if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
    errors.phone = isHi
      ? 'कृपया मान्य 10 अंकों का भारतीय मोबाइल नंबर दर्ज करें।'
      : 'Please enter a valid 10-digit Indian mobile number.';
  }

  if (!service) {
    errors.service = isHi
      ? 'कृपया आवश्यक प्लंबिंग सेवा चुनें।'
      : 'Please select the plumbing service you require.';
  }

  const outsideServiceArea =
    isOutsideKanpur(locality, customLocality) || isOutsideKanpur('', workDetails);

  if (locality.length < 2) {
    errors.locality = isHi
      ? 'कृपया कानपुर नगर में अपना क्षेत्र लिखें या चुनें।'
      : 'Please type or select your Kanpur Nagar locality.';
  } else if (locality === 'Other Kanpur Nagar Locality' && customLocality.length < 2) {
    errors.customLocality = isHi
      ? 'कृपया कानपुर नगर में अपने मोहल्ले, कॉलोनी या सोसाइटी का नाम लिखें।'
      : 'Please type your area, colony, or society name in Kanpur Nagar.';
  }

  if (outsideServiceArea) {
    errors.locality = isHi
      ? 'हम अभी केवल कानपुर नगर में सेवाएँ देते हैं। कोटेशन के लिए कृपया कानपुर नगर का पता दर्ज करें।'
      : 'We currently serve Kanpur Nagar only. Please enter a Kanpur Nagar address to request a quotation.';
  }

  if (workDetails.length < 5) {
    errors.workDetails = isHi
      ? 'कृपया कार्य का संक्षिप्त विवरण लिखें (कम से कम 5 अक्षर)।'
      : 'Please share a brief note on the work required (at least 5 characters).';
  }

  let resolvedLocality = isHi ? 'कानपुर नगर' : 'Kanpur Nagar';
  if (locality === 'Other Kanpur Nagar Locality' && customLocality) {
    resolvedLocality = /kanpur|कानपुर/i.test(customLocality)
      ? customLocality
      : `${customLocality}, Kanpur Nagar`;
  } else if (locality && locality !== 'Other Kanpur Nagar Locality') {
    resolvedLocality = /kanpur|कानपुर/i.test(locality) ? locality : `${locality}, Kanpur Nagar`;
  }

  return {
    valid: Object.keys(errors).length === 0 && !outsideServiceArea,
    errors,
    outsideServiceArea,
    resolvedLocality,
    normalizedPhone,
  };
}

export function formatEnquiryMessage(data: EnquiryFormData, lang: Language = 'en'): string {
  const validation = validateEnquiryForm(data, lang);
  const isHi = lang === 'hi';
  const lines = [
    isHi
      ? 'नमस्ते किशन प्लंबिंग वर्क्स! मुझे प्लंबिंग सेवा के लिए कोटेशन चाहिए।'
      : 'Namaste Kishan Plumbing Works! Mujhe plumbing service ke liye quotation chahiye.',
    '',
    `${isHi ? 'नाम' : 'Name'}: ${data.name.trim()}`,
    `${isHi ? 'मोबाइल' : 'Mobile'}: ${validation.normalizedPhone || data.phone.trim()}`,
    `${isHi ? 'आवश्यक सेवा' : 'Service Required'}: ${data.service.trim()}`,
    `${isHi ? 'क्षेत्र / स्थान' : 'Locality'}: ${validation.resolvedLocality}`,
  ];

  if (
    data.coordinates &&
    Number.isFinite(data.coordinates.lat) &&
    Number.isFinite(data.coordinates.lng)
  ) {
    lines.push(
      `${isHi ? 'लाइव लोकेशन पिन' : 'Live Location Pin'}: https://maps.google.com/?q=${data.coordinates.lat.toFixed(5)},${data.coordinates.lng.toFixed(5)}`
    );
  }

  lines.push(`${isHi ? 'कार्य विवरण' : 'Work Details'}: ${data.workDetails.trim()}`);
  return lines.join('\n');
}
