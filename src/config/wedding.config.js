// PUBLISHED WEDDING DETAILS
// This is the one file everyone sees. Edit it, then push to GitHub to publish.
// Details come from your printed invitation. Items marked TODO need your input.

const weddingConfig = {
  // Wedding moment, in Indian time. Used by the countdown.
  // Sumuhurtham: Thursday 10 Dec 2026, 8:32 PM
  weddingDateTime: '2026-12-10T20:32:00+05:30',

  couple: {
    groom: {
      en: 'Krishna',
      te: 'కృష్ణ',
    },
    bride: {
      en: 'Kartheeka',
      te: 'కార్తీక',
    },
  },

  family: {
    // TODO: confirm who these two couples are (parents? guardians?) and the exact wording
    groomParents: {
      en: 'Karri Nookaraju, Smt. Durga (late) & Karri Prakash, Smt. Latha',
      te: 'కర్రి నూకరాజు, శ్రీమతి దుర్గ (లేట్) & కర్రి ప్రకాష్, శ్రీమతి లత',
    },
    brideParents: {
      en: 'Sri Kaladi Srinu, Smt. Satyaveni of Kakinada',
      te: 'శ్రీ కలాడి శ్రీను, శ్రీమతి సత్యవేణి, కాకినాడ',
    },
    brideNote: {
      en: 'Elder daughter of Sri Kaladi Srinu & Smt. Satyaveni of Kakinada',
      te: 'కాకినాడకు చెందిన శ్రీ కలాడి శ్రీను, శ్రీమతి సత్యవేణి గార్ల పెద్ద కుమార్తె',
    },
    groomNote: {
      en: 'Only son of the Karri family',
      te: 'కర్రి కుటుంబ ఏకైక కుమారుడు',
    },
  },

  ceremony: {
    title: { en: 'Sumuhurtham', te: 'సుముహూర్తం' },
    dateLabel: { en: 'Thursday, 10th December 2026', te: 'గురువారం, 10 డిసెంబర్ 2026' },
    time: { en: '8:32 PM', te: 'రాత్రి 8:32' },
    note: { en: 'Mula Nakshatra · Karkata Lagnam', te: 'మూల నక్షత్రయుక్త కర్కాటక లగ్నం' },
  },

  dinner: {
    title: { en: 'Dinner', te: 'విందు' },
    dateLabel: { en: 'Thursday, 10th December 2026', te: 'గురువారం, 10 డిసెంబర్ 2026' },
    // Confirmed by the family: dinner is at 7:00 PM.
    time: { en: '7:00 PM onwards', te: 'రాత్రి 7:00 నుండి' },
    note: { en: 'At the venue', te: 'వివాహ వేదిక వద్దే' },
  },

  venue: {
    name: { en: 'Pattana Komula Velama Samkshema Sangam', te: 'పట్టణ కోమూల వెలమ సంక్షేమ సంఘం' }, 
    address: {
      en: 'Paseela Vari Street, Near Krishna Temple, Peddapuram',
      te: 'పాసీల వారి వీధి, కృష్ణ దేవాలయం దగ్గర, పెద్దాపురం',
    },
    // Opens Google Maps with a search. Replace with the exact map link once you have it.
    mapsQuery: 'Pattana Komula Velama Samkshema Sangam, Peddapuram',
  },

  hosts: {
    en: 'Karri Nookaraju, Smt. Durga (late) · Karri Prakash, Smt. Latha',
    te: 'కర్రి నూకరాజు, శ్రీమతి దుర్గ (లేట్) · కర్రి ప్రకాష్, శ్రీమతి లత',
  },

  // Photos live in public/images/. Paths here are relative to that "public" folder.
  // Each gallery photo has a small "thumb" (fast grid) and a "full" copy (full-screen viewer).
  images: {
    hero: 'images/hero.jpg',
    gallery: [
      { thumb: 'images/gallery/1-thumb.jpg', full: 'images/gallery/1.jpg', width: 900, height: 505, alt: 'Krishna and Kartheeka, leaning together' },
      { thumb: 'images/gallery/2-thumb.jpg', full: 'images/gallery/2.jpg', width: 900, height: 505, alt: 'Krishna and Kartheeka holding their wedding garlands' },
      { thumb: 'images/gallery/3-thumb.jpg', full: 'images/gallery/3.jpg', width: 505, height: 900, alt: 'Krishna and Kartheeka exchanging garlands' },
      { thumb: 'images/gallery/4-thumb.jpg', full: 'images/gallery/4.jpg', width: 900, height: 505, alt: 'Krishna and Kartheeka seated together in their garlands' },
      { thumb: 'images/gallery/5-thumb.jpg', full: 'images/gallery/5.jpg', width: 505, height: 900, alt: 'Krishna and Kartheeka looking at each other' },
      { thumb: 'images/gallery/6-thumb.jpg', full: 'images/gallery/6.jpg', width: 505, height: 900, alt: 'Krishna and Kartheeka standing arm in arm' },
      { thumb: 'images/gallery/7-thumb.jpg', full: 'images/gallery/7.jpg', width: 505, height: 900, alt: 'Kartheeka and Krishna holding hands' },
      { thumb: 'images/gallery/8-thumb.jpg', full: 'images/gallery/8.jpg', width: 900, height: 505, alt: 'Kartheeka touching Krishna’s cheek' },
    ],
  },
};

export default weddingConfig;
