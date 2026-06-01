export const defaultSiteConfig = {
  studioSettings: {
    masterCode: 'MADDIE2024',
    email: 'maddierosemac@gmail.com',
    phone: '+61 457 770 230',
    location: 'Bayside Melbourne',
    serviceArea: 'VIC & TAS',
    reviewsTitle: 'What Our Clients Say',
    reviewsSubtitle: 'Kind Words',
    album1: '8x8" Petite Album',
    album1Price: '$450',
    album2: '10x10" Signature Album',
    album2Price: '$750',
    album3: '12x12" Heirloom Album',
    album3Price: '$950',
    frame1: '11x14" Framed Print',
    frame1Price: '$280',
    frame2: '16x20" Framed Print',
    frame2Price: '$420',
    frame3: '24x36" Statement Frame',
    frame3Price: '$650',
  },
  packages: {
    weddings: [
      { name: 'The Intimate', price: '$2,800', features: '4 Hours Coverage, 1 Photographer, 300+ Digital Images, Online Gallery' },
      { name: 'The Classic', price: '$4,200', features: '8 Hours Coverage, 2 Photographers, 600+ Digital Images, Engagement Session, Heirloom USB Box', highlight: true },
      { name: 'The Grand', price: '$5,800', features: 'Full Day (12h) Coverage, 2 Photographers, 800+ Digital Images, Engagement Session, Premium 10x10 Album' }
    ],
    newborn: [
      { name: 'Simply Sweet', price: '$450', desc: '1 hour studio session, 15 digital images. Perfect for just the essentials.' },
      { name: 'The Lifestyle', price: '$750', desc: '2-3 hours in-home session, all best digital images (40+), 5 fine art prints.' },
      { name: 'The First Year Bundle', price: '$1,800', desc: 'Maternity, Newborn, and 12-month sessions. A complete memory collection.', deal: 'Best Value' }
    ],
    family: [
      { name: 'The Mini', price: '$350', desc: '30 minute session at select locations, 10 digital images.' },
      { name: 'The Signature', price: '$650', desc: '90 minute sunset session, 50+ digital images, $50 print credit.' },
      { name: 'The Generational', price: '$950', desc: 'Extended family session (up to 12 people), 2 hours, all digital images.' }
    ]
  },
  reviews: [
    { name: 'Sarah & James', type: 'Wedding', text: 'Maddie captured our wedding day with such grace and professionalism. The photos are more than we could have ever dreamed of.', rating: 5 },
    { name: 'The Harrison Family', type: 'Family Session', text: 'We\'ve had many family photoshoots over the years, but none felt as relaxed and natural as this one.', rating: 5 },
    { name: 'Emily R.', type: 'Birth', text: 'The most gentle and patient photographer. Our newborn session was so calm, and the photos are timeless treasures.', rating: 5 }
  ],
  faqs: [
    { question: 'When will we receive our photos?', answer: 'Hi there! For lifestyle sessions like Newborn and Family, you\'ll receive your gallery within 3 weeks. For Weddings, because of the extra care and storytelling involved, I typically deliver the full high-res gallery within 6-8 weeks, though I always send a sneak peek within 48 hours!' },
    { question: 'What should we wear for our session?', answer: 'I love this question! My biggest tip is to coordinate, not match. Aim for neutral tones and textures—linens, knits, and soft fabrics look beautiful in Melbourne\'s natural light. I\'ll send you a full styling guide once you\'ve booked your date!' },
    { question: 'What happens if it rains during an outdoor shoot?', answer: 'Don\'t worry! If the weather isn\'t playing along, we can either lean into the moodiness (I have some very cute clear umbrellas!) or we can reschedule to a clearer day. For Newborn sessions, we\'re usually safe indoors anyway!' },
    { question: 'Do you travel outside of Bayside Melbourne?', answer: 'Absolutely! While I\'m based in Bayside, I frequent Victoria and Tasmania regularly. I\'m always happy to travel for love and beautiful light. Just let me know your location in the inquiry form and we can chat about the arrangements.' },
    { question: 'Can we have the RAW/unedited files?', answer: 'I only deliver fully edited, high-resolution JPEG files. Part of the Maddie Rose Studio experience is the signature editing style you see in my portfolio. I promise you\'re only getting the absolute best shots from our time together!' }
  ],
  clients: [
    { email: 'client@example.com', galleryName: 'The Smith Family', driveLink: '', id: 1 },
    { email: 'bride@example.com', galleryName: 'Sarah & James Wedding', driveLink: '', id: 2 }
  ],
  galleryImages: {
    weddings: [],
    newborn: [],
    family: []
  },
  backgroundImages: {
    homeHero: '',
    weddingHero: '',
    newbornHero: '',
    familyHero: '',
    aboutStudio: '',
    accent1: '',
    accent2: '',
    accent3: '',
    accent4: ''
  }
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const getLocalSiteConfig = () => {
  const localStudioSettings = {
    masterCode: localStorage.getItem('masterCode') || defaultSiteConfig.studioSettings.masterCode,
    email: localStorage.getItem('studioEmail') || defaultSiteConfig.studioSettings.email,
    phone: localStorage.getItem('studioPhone') || defaultSiteConfig.studioSettings.phone,
    location: localStorage.getItem('studioLocation') || defaultSiteConfig.studioSettings.location,
    serviceArea: localStorage.getItem('studioArea') || defaultSiteConfig.studioSettings.serviceArea,
    reviewsTitle: localStorage.getItem('reviewsTitle') || defaultSiteConfig.studioSettings.reviewsTitle,
    reviewsSubtitle: localStorage.getItem('reviewsSubtitle') || defaultSiteConfig.studioSettings.reviewsSubtitle,
    album1: localStorage.getItem('album1') || defaultSiteConfig.studioSettings.album1,
    album1Price: localStorage.getItem('album1Price') || defaultSiteConfig.studioSettings.album1Price,
    album2: localStorage.getItem('album2') || defaultSiteConfig.studioSettings.album2,
    album2Price: localStorage.getItem('album2Price') || defaultSiteConfig.studioSettings.album2Price,
    album3: localStorage.getItem('album3') || defaultSiteConfig.studioSettings.album3,
    album3Price: localStorage.getItem('album3Price') || defaultSiteConfig.studioSettings.album3Price,
    frame1: localStorage.getItem('frame1') || defaultSiteConfig.studioSettings.frame1,
    frame1Price: localStorage.getItem('frame1Price') || defaultSiteConfig.studioSettings.frame1Price,
    frame2: localStorage.getItem('frame2') || defaultSiteConfig.studioSettings.frame2,
    frame2Price: localStorage.getItem('frame2Price') || defaultSiteConfig.studioSettings.frame2Price,
    frame3: localStorage.getItem('frame3') || defaultSiteConfig.studioSettings.frame3,
    frame3Price: localStorage.getItem('frame3Price') || defaultSiteConfig.studioSettings.frame3Price,
  };

  const studioPackages = localStorage.getItem('studioPackages') ? JSON.parse(localStorage.getItem('studioPackages')!) : defaultSiteConfig.packages;
  const reviews = localStorage.getItem('siteReviews') ? JSON.parse(localStorage.getItem('siteReviews')!) : defaultSiteConfig.reviews;
  const faqs = localStorage.getItem('siteFaqs') ? JSON.parse(localStorage.getItem('siteFaqs')!) : defaultSiteConfig.faqs;
  const clients = localStorage.getItem('authorizedClients') ? JSON.parse(localStorage.getItem('authorizedClients')!) : defaultSiteConfig.clients;
  const galleryImages = localStorage.getItem('siteGalleries') ? JSON.parse(localStorage.getItem('siteGalleries')!) : defaultSiteConfig.galleryImages;
  const backgroundImages = localStorage.getItem('siteBackgrounds') ? JSON.parse(localStorage.getItem('siteBackgrounds')!) : defaultSiteConfig.backgroundImages;

  return {
    studioSettings: localStudioSettings,
    packages: studioPackages,
    reviews,
    faqs,
    clients,
    galleryImages,
    backgroundImages
  };
};

export const loadSiteConfig = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/config`);
    if (!response.ok) throw new Error('Unable to load site config');
    const remoteConfig = await response.json();
    return {
      ...defaultSiteConfig,
      ...remoteConfig,
      studioSettings: { ...defaultSiteConfig.studioSettings, ...(remoteConfig.studioSettings || {}) },
      packages: { ...defaultSiteConfig.packages, ...(remoteConfig.packages || {}) },
      reviews: remoteConfig.reviews || defaultSiteConfig.reviews,
      faqs: remoteConfig.faqs || defaultSiteConfig.faqs,
      clients: remoteConfig.clients || defaultSiteConfig.clients,
      galleryImages: remoteConfig.galleryImages || defaultSiteConfig.galleryImages,
      backgroundImages: remoteConfig.backgroundImages || defaultSiteConfig.backgroundImages,
    };
  } catch (error) {
    console.warn('Using local site configuration fallback.', error);
    return getLocalSiteConfig();
  }
};

export const saveSiteConfig = async (config: any) => {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const adminToken = sessionStorage.getItem('adminToken');
    if (adminToken) {
      headers['x-admin-token'] = adminToken;
    }

    const response = await fetch(`${API_BASE_URL}/api/config`, {
      method: 'POST',
      headers,
      body: JSON.stringify(config),
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to save site config', error);
    return false;
  }
};
