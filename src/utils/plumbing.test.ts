import test from 'node:test';
import assert from 'node:assert/strict';
import {
  OFFICIAL_PHONE,
  DEFAULT_WHATSAPP_MESSAGE,
  DEFAULT_WHATSAPP_MESSAGE_HI,
  buildWhatsAppUrl,
  buildServiceWhatsAppUrl,
  normalizeIndianPhone,
  isOutsideKanpur,
  isWithinKanpurNagarCoords,
  matchNearestKanpurLocality,
  filterLocalities,
  validateEnquiryForm,
  formatEnquiryMessage,
  classifyGeolocationError,
} from './plumbing';

test('buildWhatsAppUrl uses official 9935670167 number and encodes default message', () => {
  const url = buildWhatsAppUrl();
  assert.ok(url.startsWith(`https://wa.me/91${OFFICIAL_PHONE}?text=`));
  assert.ok(url.includes(encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)));

  const hiUrl = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE_HI, 'hi');
  assert.ok(decodeURIComponent(hiUrl).includes('किशन प्लंबिंग वर्क्स'));
});

test('buildServiceWhatsAppUrl includes selected service name in English and Hindi', () => {
  const url = buildServiceWhatsAppUrl('Bathroom Fittings');
  assert.ok(url.startsWith(`https://wa.me/91${OFFICIAL_PHONE}?text=`));
  assert.ok(decodeURIComponent(url).includes('Bathroom Fittings'));
  assert.ok(decodeURIComponent(url).includes('Kanpur Nagar'));

  const hiUrl = buildServiceWhatsAppUrl('बाथरूम फिटिंग्स', 'hi');
  assert.ok(decodeURIComponent(hiUrl).includes('बाथरूम फिटिंग्स'));
  assert.ok(decodeURIComponent(hiUrl).includes('कानपुर नगर'));
});

test('normalizeIndianPhone strips +91, leading 0, and formatting characters', () => {
  assert.equal(normalizeIndianPhone('+91 99356-70167'), '9935670167');
  assert.equal(normalizeIndianPhone('09935670167'), '9935670167');
  assert.equal(normalizeIndianPhone('98390 12345'), '9839012345');
});

test('isOutsideKanpur detects outside locations (English & Hindi) and accepts Kanpur Nagar areas', () => {
  assert.equal(isOutsideKanpur('Swaroop Nagar'), false);
  assert.equal(isOutsideKanpur('Other Kanpur Nagar Locality', 'Shivalik Apartments'), false);
  assert.equal(isOutsideKanpur('Outside Kanpur Nagar'), true);
  assert.equal(isOutsideKanpur('Other Kanpur Nagar Locality', 'Gomti Nagar, Lucknow'), true);
  assert.equal(isOutsideKanpur('Other Kanpur Nagar Locality', 'लखनऊ'), true);
  assert.equal(isOutsideKanpur('Civil Lines', 'Unnao border'), true);
});

test('isWithinKanpurNagarCoords and matchNearestKanpurLocality identify Kanpur Nagar GPS locations', () => {
  assert.equal(isWithinKanpurNagarCoords(26.4733, 80.2952), true);
  assert.equal(matchNearestKanpurLocality(26.4735, 80.295), 'Kakadeo');
  assert.equal(isWithinKanpurNagarCoords(26.8467, 80.9462), false);
});

test('filterLocalities matches English queries and Hindi aliases while keeping Other Kanpur Nagar Locality', () => {
  const list = [
    'Swaroop Nagar',
    'Kakadeo',
    'Barra',
    'Other Kanpur Nagar Locality',
    'Outside Kanpur Nagar',
  ];
  const aliases = {
    Kakadeo: 'काकादेव',
    'Swaroop Nagar': 'स्वरूप नगर',
  };
  const kak = filterLocalities(list, 'kak', aliases);
  assert.deepEqual(kak, ['Kakadeo', 'Other Kanpur Nagar Locality']);

  const hiMatch = filterLocalities(list, 'काका', aliases);
  assert.deepEqual(hiMatch, ['Kakadeo', 'Other Kanpur Nagar Locality']);

  const all = filterLocalities(list, '');
  assert.equal(all.length, 5);
});

test('validateEnquiryForm supports directly typed custom locality and Other Kanpur Nagar Locality', () => {
  const typedRes = validateEnquiryForm({
    name: 'Suresh Mishra',
    phone: '9839012345',
    service: 'Water Pipeline Installation',
    locality: 'Geeta Nagar',
    workDetails: 'New CPVC main line fitting for ground floor.',
  });
  assert.equal(typedRes.valid, true);
  assert.equal(typedRes.resolvedLocality, 'Geeta Nagar, Kanpur Nagar');

  const otherMissing = validateEnquiryForm({
    name: 'Suresh Mishra',
    phone: '9839012345',
    service: 'Water Pipeline Installation',
    locality: 'Other Kanpur Nagar Locality',
    customLocality: '',
    workDetails: 'New CPVC main line fitting for ground floor.',
  });
  assert.equal(otherMissing.valid, false);
  assert.ok(otherMissing.errors.customLocality);
});

test('validateEnquiryForm rejects empty inputs and invalid phone numbers in both languages', () => {
  const resultEn = validateEnquiryForm({
    name: 'A',
    phone: '12345',
    service: '',
    locality: '',
    workDetails: 'Fix',
  });
  assert.equal(resultEn.valid, false);
  assert.ok(resultEn.errors.name);
  assert.ok(resultEn.errors.phone);
  assert.ok(resultEn.errors.service);
  assert.ok(resultEn.errors.locality);
  assert.ok(resultEn.errors.workDetails);

  const resultHi = validateEnquiryForm(
    {
      name: 'अ',
      phone: '12345',
      service: '',
      locality: '',
      workDetails: 'काम',
    },
    'hi'
  );
  assert.equal(resultHi.valid, false);
  assert.ok(resultHi.errors.name?.includes('कृपया'));
  assert.ok(resultHi.errors.phone?.includes('मोबाइल'));
});

test('validateEnquiryForm flags outside Kanpur Nagar enquiries cleanly', () => {
  const result = validateEnquiryForm({
    name: 'Rajesh Sharma',
    phone: '9839012345',
    service: 'Complete House Plumbing',
    locality: 'Outside Kanpur Nagar',
    workDetails: 'New house plumbing required in Lucknow.',
  });
  assert.equal(result.valid, false);
  assert.equal(result.outsideServiceArea, true);
  assert.ok(result.errors.locality?.includes('Kanpur Nagar only'));
});

test('formatEnquiryMessage includes live GPS pin in both English and Hindi', () => {
  const payload = {
    name: 'Ankit Verma',
    phone: '+91 98390 55443',
    service: 'Bathroom Fittings',
    locality: 'Kakadeo',
    workDetails: 'Need concealed diverter and two bathroom fittings installed.',
    coordinates: { lat: 26.4733, lng: 80.2952 },
  };
  const msg = formatEnquiryMessage(payload, 'en');
  assert.ok(msg.includes('Name: Ankit Verma'));
  assert.ok(msg.includes('Mobile: 9839055443'));
  assert.ok(msg.includes('Service Required: Bathroom Fittings'));
  assert.ok(msg.includes('Locality: Kakadeo, Kanpur Nagar'));
  assert.ok(msg.includes('https://maps.google.com/?q=26.47330,80.29520'));

  const hiMsg = formatEnquiryMessage(
    { ...payload, service: 'बाथरूम फिटिंग्स' },
    'hi'
  );
  assert.ok(hiMsg.includes('नाम: Ankit Verma'));
  assert.ok(hiMsg.includes('आवश्यक सेवा: बाथरूम फिटिंग्स'));
  assert.ok(hiMsg.includes('लाइव लोकेशन पिन: https://maps.google.com/?q=26.47330,80.29520'));
});

test('classifyGeolocationError distinguishes policy-blocked frames from user denial and timeouts', () => {
  assert.equal(
    classifyGeolocationError(1, 'Geolocation has been disabled in this document by permissions policy.', false),
    'policy_blocked'
  );
  assert.equal(classifyGeolocationError(1, 'User denied Geolocation', true), 'policy_blocked');
  assert.equal(classifyGeolocationError(1, 'User denied Geolocation', false), 'user_denied');
  assert.equal(classifyGeolocationError(3, 'Timeout expired', false), 'timeout');
  assert.equal(classifyGeolocationError(2, 'Position unavailable', false), 'unavailable');
});
