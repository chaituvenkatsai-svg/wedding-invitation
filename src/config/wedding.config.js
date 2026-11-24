// PUBLISHED WEDDING DETAILS
// This is the one file everyone sees. Edit it, then push to GitHub to publish.
// Details come from your printed invitation. Items marked TODO need your input.

const weddingConfig = {
  // Wedding moment, in Indian time. Used by the countdown.
  // Sumuhurtham: Thursday 10 Dec 2026, 8:32 PM
  weddingDateTime: '2026-12-10T20:32:00+05:30',

  couple: {
    groom: {
      en: 'k Krishna',
      te: 'కృష్ణ', // TODO: confirm Telugu spelling
    },
    bride: {
      en: 'Kartheeka',
      te: 'కార్తీక', // TODO: confirm Telugu spelling
    },
  },

  family: {
    // TODO: confirm who these two couples are (parents? guardians?) and the exact wording
    groomParents: {
      en: 'Karri Nookaraju, Smt. Durga (late) & Karri Prakash, Smt. Latha',
      te: 'కర్రి నూకరాజు, శ్రీమతి దుర్గ (లేట్) & కర్రి ప్రకాష్, శ్రీమతి లత', // TODO: confirm
    },
    brideParents: {
      en: 'Sri Kaladi Srinu, Smt. Satyaveni of Kakinada',
      te: 'శ్రీ కలాడి శ్రీను, శ్రీమతి సత్యవేణి, కాకినాడ', // TODO: confirm
    },
    brideNote: {
      en: 'Elder daughter of Sri Kaladi Srinu & Smt. Satyaveni of Kakinada',
      te: 'కాకినాడకు చెందిన శ్రీ కలాడి శ్రీను, శ్రీమతి సత్యవేణి గార్ల పెద్ద కుమార్తె',
    },
    groomNote: {
      en: 'Only son of the Karri family',
      te: 'కర్రి కుటుంబ ఏకైక కుమారుడు', // TODO: confirm
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
    // TODO: your printed card says "7-00 a.m onwards". Dinner is almost certainly 7:00 PM. Please confirm.
    time: { en: '7:00 PM onwards', te: 'రాత్రి 7:00 నుండి' },
    note: { en: 'At the venue', te: 'వివాహ వేదిక వద్దే' },
  },

  venue: {
    name: { en: 'Pattana Komula Velama Samkshema Sangam', te: 'పట్టణ కోమూల వెలమ సంక్షేమ సంఘం' }, // TODO: confirm Telugu
    address: {
      en: 'Paseela Vari Street, Near Krishna Temple, Peddapuram',
      te: 'పాసీల వారి వీధి, కృష్ణ దేవాలయం దగ్గర, పెద్దాపురం', // TODO: confirm
    },
    // Opens Google Maps with a search. Replace with the exact map link once you have it.
    mapsQuery: 'Pattana Komula Velama Samkshema Sangam, Peddapuram',
  },

  hosts: {
    en: 'Karri Nookaraju, Smt. Durga (late) · Karri Prakash, Smt. Latha',
    te: 'కర్రి నూకరాజు, శ్రీమతి దుర్గ (లేట్) · కర్రి ప్రకాష్, శ్రీమతి లత',
  },

  // Photos: put image files in public/images/ and list them here.
  // Empty slots show an elegant placeholder until you add real photos.
  images: {
    hero: '', // e.g. 'images/hero.jpg'
    gallery: [], // e.g. ['images/1.jpg', 'images/2.jpg']
  },
};

export default weddingConfig;
