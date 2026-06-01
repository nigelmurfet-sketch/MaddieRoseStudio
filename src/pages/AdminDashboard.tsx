import { motion, AnimatePresence } from 'framer-motion';
import { Camera, FileText, Trash2, ArrowLeft, Settings, Users, Plus, Save, Image as ImageIcon, Upload, X, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadSiteConfig, saveSiteConfig, getLocalSiteConfig } from '../utils/siteConfig';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'log' | 'clients' | 'galleries' | 'packages' | 'reviews' | 'faqs' | 'settings'>('log');

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/login', { replace: true });
    }
  }, [navigate]);
  
  useEffect(() => {
    loadSiteConfig().then((config) => {
      setPackages(config.packages);
      setStudioSettings(config.studioSettings);
      setReviews(config.reviews);
      setFaqs(config.faqs);
      setClients(config.clients);
      setGalleryImages(config.galleryImages);
      setBackgroundImages(config.backgroundImages);
    }).catch((error) => {
      console.warn('Failed to load remote site config:', error);
    });
  }, []);

  const syncConfig = async (updatedConfig: any = {}) => {
    const config = {
      studioSettings,
      packages,
      reviews,
      faqs,
      clients,
      galleryImages,
      backgroundImages,
      ...updatedConfig,
    };
    const success = await saveSiteConfig(config);
    if (!success) {
      console.warn('Could not persist site config to backend.');
    }
    return success;
  };

  // LOG DATA
  const [logs, setLogs] = useState([
    { id: 1, type: 'Inquiry', name: 'Sophie Williams', service: 'Wedding', date: '2024-05-15', status: 'Pending', email: 'sophie@example.com' },
    { id: 2, type: 'Inquiry', name: 'Mark Thompson', service: 'Family', date: '2024-06-20', status: 'Responded', email: 'mark.t@example.com' },
    { id: 3, type: 'Inquiry', name: 'Jessica Chen', service: 'Newborn', date: '2024-05-30', status: 'Booked', email: 'jess.c@gmail.com' },
  ]);

  // PACKAGES DATA
  const [packages, setPackages] = useState(() => {
    const saved = localStorage.getItem('studioPackages');
    return saved ? JSON.parse(saved) : {
      weddings: [
        { name: 'The Intimate', price: '$2,800', features: '4 Hours Coverage, 1 Photographer, 300+ Digital Images, Online Gallery' },
        { name: 'The Classic', price: '$4,200', features: '8 Hours Coverage, 2 Photographers, 600+ Digital Images, Engagement Session, Heirloom USB Box', highlight: true },
        { name: 'The Grand', price: '$5,800', features: 'Full Day (12h) Coverage, 2 Photographers, 800+ Digital Images, Engagement Session, Premium 10x10 Album' }
      ],
      newborn: [
        { name: 'Simply Sweet', price: '$450', desc: '1 hour studio session, 15 digital images. Perfect for just the essentials.' },
        { name: 'The Lifestyle', price: '$750', desc: '2-3 hours in-home session, all best digital images (40+), 5 fine art prints.' },
        { name: "The First Year Bundle", price: '$1,800', desc: 'Maternity, Newborn, and 12-month sessions. A complete memory collection.', deal: 'Best Value' }
      ],
      family: [
        { name: 'The Mini', price: '$350', desc: '30 minute session at select locations, 10 digital images.' },
        { name: 'The Signature', price: '$650', desc: '90 minute sunset session, 50+ digital images, $50 print credit.' },
        { name: 'The Generational', price: '$950', desc: 'Extended family session (up to 12 people), 2 hours, all digital images.' }
      ]
    };
  });

  const savePackages = async () => {
    localStorage.setItem('studioPackages', JSON.stringify(packages));
    await syncConfig({ packages });
    alert('Shoot packages updated!');
  };

  type PackageSection = 'weddings' | 'newborn' | 'family';
  const updatePackage = (section: PackageSection, idx: number, field: string, value: string) => {
    setPackages(prev => ({
      ...prev,
      [section]: prev[section].map((item: any, itemIdx: number) =>
        itemIdx === idx ? { ...item, [field]: value } : item
      )
    }));
  };

  // SETTINGS DATA
  const [studioSettings, setStudioSettings] = useState({
    masterCode: localStorage.getItem('masterCode') || 'MADDIE2024',
    email: localStorage.getItem('studioEmail') || 'maddierosemac@gmail.com',
    phone: localStorage.getItem('studioPhone') || '+61 457 770 230',
    location: localStorage.getItem('studioLocation') || 'Bayside Melbourne',
    serviceArea: localStorage.getItem('studioArea') || 'VIC & TAS',
    reviewsTitle: localStorage.getItem('reviewsTitle') || 'What Our Clients Say',
    reviewsSubtitle: localStorage.getItem('reviewsSubtitle') || 'Kind Words',
    album1: localStorage.getItem('album1') || '8x8" Petite Album',
    album1Price: localStorage.getItem('album1Price') || '$450',
    album2: localStorage.getItem('album2') || '10x10" Signature Album',
    album2Price: localStorage.getItem('album2Price') || '$750',
    album3: localStorage.getItem('album3') || '12x12" Heirloom Album',
    album3Price: localStorage.getItem('album3Price') || '$950',
    frame1: localStorage.getItem('frame1') || '11x14" Framed Print',
    frame1Price: localStorage.getItem('frame1Price') || '$280',
    frame2: localStorage.getItem('frame2') || '16x20" Framed Print',
    frame2Price: localStorage.getItem('frame2Price') || '$420',
    frame3: localStorage.getItem('frame3') || '24x36" Statement Frame',
    frame3Price: localStorage.getItem('frame3Price') || '$650',
  });

  // SITE VISIT TRACKER
  const [siteVisits, setSiteVisits] = useState(() => {
    return parseInt(localStorage.getItem('siteVisitCount') || '0');
  });

  useEffect(() => {
    // Basic session-based visit tracker simulation
    const hasVisited = sessionStorage.getItem('hasVisitedSession');
    if (!hasVisited) {
      const newCount = siteVisits + 1;
      setSiteVisits(newCount);
      localStorage.setItem('siteVisitCount', newCount.toString());
      sessionStorage.setItem('hasVisitedSession', 'true');
      
      // Add a log entry for the visit
      const visitEntry = {
        id: Date.now() + Math.random(),
        type: 'Site Visit',
        name: 'Guest User',
        service: 'Browsing',
        date: new Date().toLocaleDateString(),
        status: 'Logged',
        email: 'N/A'
      };
      setLogs(prev => [visitEntry, ...prev]);
    }
  }, []);

  // CLIENT PORTAL DATA
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('authorizedClients');
    return saved ? JSON.parse(saved) : [
      { email: 'client@example.com', galleryName: 'The Smith Family', id: 1 },
      { email: 'bride@example.com', galleryName: 'Sarah & James Wedding', id: 2 }
    ];
  });

  const [newClient, setNewClient] = useState({ email: '', galleryName: '', driveLink: '' });

  // REVIEWS DATA
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('siteReviews');
    return saved ? JSON.parse(saved) : [
      { name: "Sarah & James", type: "Wedding", text: "Maddie captured our wedding day with such grace and professionalism. The photos are more than we could have ever dreamed of.", rating: 5, id: 1 },
      { name: "The Harrison Family", type: "Family Session", text: "We've had many family photoshoots over the years, but none felt as relaxed and natural as this one.", rating: 5, id: 2 },
      { name: "Emily R.", type: "Newborn", text: "The most gentle and patient photographer. Our newborn session was so calm, and the photos are timeless treasures.", rating: 5, id: 3 }
    ];
  });

  const [newReview, setNewReview] = useState({ name: '', type: '', text: '', rating: 5 });

  const addReview = async () => {
    if (!newReview.name || !newReview.text) return;
    const updated = [...reviews, { ...newReview, id: Date.now() }];
    setReviews(updated);
    localStorage.setItem('siteReviews', JSON.stringify(updated));
    setNewReview({ name: '', type: '', text: '', rating: 5 });
    await syncConfig({ reviews: updated });
  };

  const removeReview = (id: number) => {
    const updated = reviews.filter((r: any) => r.id !== id);
    setReviews(updated);
    localStorage.setItem('siteReviews', JSON.stringify(updated));
  };

  // FAQ DATA
  const [faqs, setFaqs] = useState(() => {
    const saved = localStorage.getItem('siteFaqs');
    return saved ? JSON.parse(saved) : [
      { question: "When will we receive our photos?", answer: "Hi there! For lifestyle sessions like Newborn and Family, you'll receive your gallery within 3 weeks. For Weddings, because of the extra care and storytelling involved, I typically deliver the full high-res gallery within 6-8 weeks, though I always send a 'sneak peek' within 48 hours!" },
      { question: "What should we wear for our session?", answer: "I love this question! My biggest tip is to coordinate, not match. Aim for neutral tones and textures—linens, knits, and soft fabrics look beautiful in Melbourne's natural light. I'll send you a full styling guide once you've booked your date!" },
      { question: "What happens if it rains during an outdoor shoot?", answer: "Don't worry! If the weather isn't playing along, we can either lean into the moodiness (I have some very cute clear umbrellas!) or we can reschedule to a clearer day. For Newborn sessions, we're usually safe indoors anyway!" },
      { question: "Do you travel outside of Bayside Melbourne?", answer: "Absolutely! While I'm based in Bayside, I frequent Victoria and Tasmania regularly. I'm always happy to travel for love and beautiful light. Just let me know your location in the inquiry form and we can chat about the arrangements." },
      { question: "Can we have the RAW/unedited files?", answer: "I only deliver fully edited, high-resolution JPEG files. Part of the Maddie Rose Studio experience is the signature editing style you see in my portfolio. I promise you're only getting the absolute best shots from our time together!" }
    ];
  });

  const saveFaqs = async () => {
    localStorage.setItem('siteFaqs', JSON.stringify(faqs));
    await syncConfig({ faqs });
    alert('FAQs updated!');
  };

  // GALLERY & BACKGROUND IMAGES DATA
  const [galleryImages, setGalleryImages] = useState(() => {
    const saved = localStorage.getItem('siteGalleries');
    return saved ? JSON.parse(saved) : {
      weddings: [],
      newborn: [],
      family: []
    };
  });

  const [backgroundImages, setBackgroundImages] = useState(() => {
    const saved = localStorage.getItem('siteBackgrounds');
    return saved ? JSON.parse(saved) : {
      homeHero: '',
      weddingHero: '',
      newbornHero: '',
      familyHero: '',
      aboutStudio: ''
    };
  });

  const [imageUrlInputs, setImageUrlInputs] = useState<Record<string, string>>({});

  const isValidImageUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(parsed.pathname);
    } catch {
      return false;
    }
  };

  const saveImageUrl = async (type: 'gallery' | 'background', category: string) => {
    const key = `${type}-${category}`;
    const url = (imageUrlInputs[key] || '').trim();
    if (!url) {
      alert('Please paste a valid image URL before saving.');
      return;
    }

    if (!isValidImageUrl(url)) {
      alert('Please enter a valid image URL ending in .jpg, .png, .webp, or similar.');
      return;
    }

    try {
      if (type === 'gallery') {
        const currentCount = (galleryImages[category] || []).length;
        if (currentCount >= 20) {
          alert('Gallery is full. Each gallery can have a maximum of 20 photos.');
          return;
        }
        const updated = { ...galleryImages, [category]: [...(galleryImages[category] || []), url] };
        setGalleryImages(updated);
        localStorage.setItem('siteGalleries', JSON.stringify(updated));
        await syncConfig({ galleryImages: updated });
      } else {
        const updated = { ...backgroundImages, [category]: url };
        setBackgroundImages(updated);
        localStorage.setItem('siteBackgrounds', JSON.stringify(updated));
        await syncConfig({ backgroundImages: updated });
      }
      setImageUrlInputs(prev => ({ ...prev, [key]: '' }));
    } catch (err) {
      alert('Could not save the image URL. Please try again or use a different link.');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent, type: 'gallery' | 'background', category: string) => {
    let file: File | undefined;
    
    if ('files' in e.target && e.target.files) {
      file = e.target.files[0];
    } else if ('dataTransfer' in e) {
      e.preventDefault();
      file = e.dataTransfer.files[0];
    }

    if (!file) return;

    // Check if file is too large for LocalStorage (Max ~5MB total for the whole site)
    if (file.size > 2 * 1024 * 1024) {
      alert("This file is too large to save directly in the browser's memory. \n\nPlease use a smaller compressed JPEG (under 1MB) or use a direct URL link from your Google Drive for permanent storage.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      
      try {
        if (type === 'gallery') {
          const currentCount = (galleryImages[category] || []).length;
          if (currentCount >= 20) {
            alert("Gallery is full. Each gallery can have a maximum of 20 photos.");
            return;
          }
          const updated = { ...galleryImages, [category]: [...(galleryImages[category] || []), base64String] };
          setGalleryImages(updated);
          localStorage.setItem('siteGalleries', JSON.stringify(updated));
          await syncConfig({ galleryImages: updated });
        } else {
          const updated = { ...backgroundImages, [category]: base64String };
          setBackgroundImages(updated);
          localStorage.setItem('siteBackgrounds', JSON.stringify(updated));
          await syncConfig({ backgroundImages: updated });
        }
      } catch (err) {
        alert("Studio memory is full. Please remove some photos before adding more, or use URL links instead.");
      }
    };
    reader.readAsDataURL(file);
  };

  const removeGalleryImage = async (category: string, index: number) => {
    const updated = { ...galleryImages, [category]: galleryImages[category].filter((_: any, i: number) => i !== index) };
    setGalleryImages(updated);
    localStorage.setItem('siteGalleries', JSON.stringify(updated));
    await syncConfig({ galleryImages: updated });
  };

  const handleImageUrlInputChange = (key: string, value: string) => {
    setImageUrlInputs(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const storedInquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    if (storedInquiries.length > 0) {
      const formatted = storedInquiries.map((iq: any, i: number) => ({
        id: Date.now() + i,
        type: 'Site Inquiry',
        name: iq.name,
        service: iq.service,
        date: iq.date || 'Not set',
        status: 'New',
        email: iq.email
      }));
      setLogs(prev => [...formatted, ...prev]);
    }
  }, []);

  const saveSettings = async () => {
    localStorage.setItem('masterCode', studioSettings.masterCode);
    localStorage.setItem('studioEmail', studioSettings.email);
    localStorage.setItem('studioPhone', studioSettings.phone);
    localStorage.setItem('studioLocation', studioSettings.location);
    localStorage.setItem('studioArea', studioSettings.serviceArea);
    localStorage.setItem('reviewsTitle', studioSettings.reviewsTitle);
    localStorage.setItem('reviewsSubtitle', studioSettings.reviewsSubtitle);
    localStorage.setItem('album1', studioSettings.album1);
    localStorage.setItem('album1Price', studioSettings.album1Price);
    localStorage.setItem('album2', studioSettings.album2);
    localStorage.setItem('album2Price', studioSettings.album2Price);
    localStorage.setItem('album3', studioSettings.album3);
    localStorage.setItem('album3Price', studioSettings.album3Price);
    localStorage.setItem('frame1', studioSettings.frame1);
    localStorage.setItem('frame1Price', studioSettings.frame1Price);
    localStorage.setItem('frame2', studioSettings.frame2);
    localStorage.setItem('frame2Price', studioSettings.frame2Price);
    localStorage.setItem('frame3', studioSettings.frame3);
    localStorage.setItem('frame3Price', studioSettings.frame3Price);
    await syncConfig({ studioSettings });
    alert('Studio settings updated across the website!');
  };

  const sendNotificationEmail = async (client: any) => {
    const portalCode = studioSettings.masterCode || 'MADDIE2024';
    const studioEmail = studioSettings.email || 'maddierosemac@gmail.com';
    const driveLink = client.driveLink?.trim();
    const subject = driveLink
      ? `Your ${client.galleryName} gallery is ready to view`
      : `Your ${client.galleryName} portal is set up`;

    const html = driveLink
      ? `<p>Hi ${client.galleryName},</p><p>Your private gallery has been uploaded and is ready to view. Use the button below to open your gallery and download your photos.</p><p><a href="${driveLink}" target="_blank" style="display:inline-block;padding:12px 18px;background:#111827;color:#ffffff;border-radius:8px;text-decoration:none;">Open your gallery</a></p><p>Your gallery access code is <strong>${portalCode}</strong>. Use your email and this code at the client login page.</p><p>If you have any questions, reply to this email.</p><p>— ${studioEmail}</p>`
      : `<p>Hi ${client.galleryName},</p><p>Your private gallery portal has been set up successfully.</p><p>I will send you the access link once the gallery is uploaded and ready.</p><p>Your gallery access code is <strong>${portalCode}</strong>. Use your email and this code at the client login page.</p><p>— ${studioEmail}</p>`;

    const text = driveLink
      ? `Hi ${client.galleryName},\n\nYour private gallery is ready. Open it here: ${driveLink}\n\nYour gallery access code is ${portalCode}. Use your email and this code at the client login page.\n\n— ${studioEmail}`
      : `Hi ${client.galleryName},\n\nYour private gallery portal is set up. I will send you the access link once the gallery is uploaded and ready.\n\nYour gallery access code is ${portalCode}. Use your email and this code at the client login page.\n\n— ${studioEmail}`;

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${apiUrl}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: client.email, subject, text, html }),
      });

      if (!response.ok) {
        throw new Error('Email service returned an error.');
      }

      alert(`Notification email sent to ${client.email}`);
      return true;
    } catch (error) {
      console.error('Email send failed:', error);
      alert('Unable to send email. Please check your server configuration and try again.');
      return false;
    }
  };

  const addClient = async () => {
    if (!newClient.email || !newClient.galleryName) return;
    if (clients.some((client: any) => client.email.toLowerCase() === newClient.email.toLowerCase())) {
      alert('This client email is already authorized.');
      return;
    }
    const newEntry = { ...newClient, id: Date.now() };
    const updatedClients = [...clients, newEntry];
    setClients(updatedClients);
    localStorage.setItem('authorizedClients', JSON.stringify(updatedClients));
    await syncConfig({ clients: updatedClients });
    setNewClient({ email: '', galleryName: '', driveLink: '' });

    if (newEntry.driveLink?.trim()) {
      await sendNotificationEmail(newEntry);
    }
  };

  const removeClient = async (id: number) => {
    const updatedClients = clients.filter((c: any) => c.id !== id);
    setClients(updatedClients);
    localStorage.setItem('authorizedClients', JSON.stringify(updatedClients));
    await syncConfig({ clients: updatedClients });
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.href = '/';
  };

  return (
    <div className="bg-stone-50 min-h-screen pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Site Visits', value: siteVisits.toString(), icon: <Users className="h-4 w-4" /> },
            { label: 'Total Inquiries', value: logs.filter(l => l.type === 'Site Inquiry' || l.type === 'Inquiry').length.toString(), icon: <FileText className="h-4 w-4" /> },
            { label: 'Recent Events', value: logs.length.toString(), icon: <Settings className="h-4 w-4" /> },
            { label: 'Studio Status', value: 'Live', icon: <Camera className="h-4 w-4" /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">{stat.label}</span>
                <div className="text-stone-300">{stat.icon}</div>
              </div>
              <p className="text-3xl font-serif text-stone-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 min-w-0">
          <div>
            <div className="flex items-center space-x-3 mb-4 flex-wrap gap-3">
              <div className="w-10 h-10 bg-stone-900 rounded-lg flex items-center justify-center">
                <Camera className="text-white h-5 w-5" />
              </div>
              <h1 className="text-3xl font-serif text-stone-900">Studio <span className="italic">Command</span></h1>
            </div>
            <p className="text-stone-500 font-light text-sm">Welcome back, Maddie. You are in full control of your studio portal.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors flex items-center space-x-2"
          >
            <span>Secure Logout</span>
            <ArrowLeft className="h-3 w-3" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 border-b border-stone-200 mb-12 overflow-x-auto whitespace-nowrap">
          {[
            { id: 'log', label: 'Activity Log', icon: <FileText className="h-4 w-4" /> },
            { id: 'clients', label: 'Client Access', icon: <Users className="h-4 w-4" /> },
            { id: 'galleries', label: 'Visuals & Design', icon: <ImageIcon className="h-4 w-4" /> },
            { id: 'packages', label: 'Shoot Packages', icon: <Plus className="h-4 w-4" /> },
            { id: 'reviews', label: 'Reviews', icon: <Star className="h-4 w-4" /> },
            { id: 'faqs', label: 'FAQs', icon: <FileText className="h-4 w-4" /> },
            { id: 'settings', label: 'Studio Settings', icon: <Settings className="h-4 w-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 text-xs uppercase tracking-widest flex items-center space-x-2 transition-all ${
                activeTab === tab.id ? 'text-stone-900 border-b-2 border-stone-900 font-bold' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ACTIVITY LOG TAB */}
          {activeTab === 'log' && (
            <motion.div key="log" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="bg-white rounded-2xl md:rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-full table-auto">
                    <thead>
                      <tr className="border-b border-stone-100 bg-stone-50/50">
                        <th className="p-4 md:p-6 text-[10px] uppercase tracking-widest text-stone-400">Type</th>
                        <th className="p-4 md:p-6 text-[10px] uppercase tracking-widest text-stone-400">Client</th>
                        <th className="p-4 md:p-6 text-[10px] uppercase tracking-widest text-stone-400">Service</th>
                        <th className="p-4 md:p-6 text-[10px] uppercase tracking-widest text-stone-400">Status</th>
                        <th className="p-4 md:p-6 text-[10px] uppercase tracking-widest text-stone-400 text-right text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.map((log) => (
                        <tr key={log.id} className="border-b border-stone-50 hover:bg-stone-50/30 transition-colors">
                          <td className="p-4 md:p-6">
                            <span className="text-[10px] md:text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded-md font-medium">{log.type}</span>
                          </td>
                          <td className="p-4 md:p-6">
                            <p className="text-stone-900 font-medium text-sm">{log.name}</p>
                            <p className="text-[10px] md:text-xs text-stone-400 truncate max-w-[140px] md:max-w-none">{log.email}</p>
                          </td>
                          <td className="p-4 md:p-6 text-xs md:text-sm text-stone-600">{log.service}</td>
                          <td className="p-4 md:p-6">
                            <span className={`text-[10px] uppercase tracking-tighter px-2 py-0.5 rounded-full font-bold ${
                              log.status === 'Booked' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                            }`}>
                              {log.status}
                            </span>
                          </td>
                          <td className="p-4 md:p-6 text-right">
                            <button onClick={() => setLogs(logs.filter(l => l.id !== log.id))} className="p-2 text-stone-300 hover:text-red-400 transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="md:hidden p-4 bg-stone-50 text-[10px] text-center text-stone-400 border-t border-stone-100">
                  Swipe horizontally to view full table
                </div>
              </div>
            </motion.div>
          )}

          {/* VISUALS & GALLERIES TAB */}
          {activeTab === 'galleries' && (
            <motion.div key="galleries" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
              {/* Background & Hero Management */}
              <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
                <h3 className="text-xl font-serif mb-8 flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Website Heroes & Backgrounds
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { id: 'homeHero', label: 'Home Page Hero' },
                    { id: 'weddingHero', label: 'Wedding Page Hero' },
                    { id: 'newbornHero', label: 'Birth Page Hero' },
                    { id: 'familyHero', label: 'Family Page Hero' },
                    { id: 'aboutStudio', label: 'About Studio Photo' },
                  ].map((bg) => (
                    <div key={bg.id} className="space-y-4">
                      <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">{bg.label}</p>
                      <div 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleFileUpload(e as any, 'background', bg.id)}
                        className="relative aspect-video rounded-xl bg-stone-50 border-2 border-dashed border-stone-200 flex items-center justify-center overflow-hidden group"
                      >
                        {backgroundImages[bg.id] ? (
                          <img src={backgroundImages[bg.id]} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center">
                            <Upload className="h-6 w-6 text-stone-300 mx-auto mb-2" />
                            <p className="text-[10px] text-stone-400">Click or Drag & Drop</p>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'background', bg.id)}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={imageUrlInputs[`background-${bg.id}`] || ''}
                          onChange={(e) => handleImageUrlInputChange(`background-${bg.id}`, e.target.value)}
                          placeholder="Paste image URL (jpg/png/webp)"
                          className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400"
                        />
                        <button
                          onClick={() => saveImageUrl('background', bg.id)}
                          className="w-full rounded-full bg-stone-900 text-white px-4 py-2 text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors"
                        >
                          Save URL
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery Image Management */}
              {['weddings', 'newborn', 'family'].map((cat) => (
                <div key={cat} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-serif capitalize flex items-center gap-2">
                      <ImageIcon className="h-5 w-5" />
                      {cat === 'newborn' ? 'Birth' : cat} Portfolio Gallery
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold bg-stone-50 px-3 py-1 rounded-full border border-stone-100">
                      {galleryImages[cat].length} / 20 Photos
                    </span>
                  </div>
                  
                  <div className="mb-6 grid gap-3 sm:grid-cols-[1fr_auto]">
                    <input
                      type="text"
                      value={imageUrlInputs[`gallery-${cat}`] || ''}
                      onChange={(e) => handleImageUrlInputChange(`gallery-${cat}`, e.target.value)}
                      placeholder="Paste gallery image URL (jpg/png/webp)"
                      className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-400"
                    />
                    <button
                      onClick={() => saveImageUrl('gallery', cat)}
                      className="rounded-full bg-stone-900 text-white px-4 py-2 text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors"
                    >
                      Add URL
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                    {galleryImages[cat].map((img: string, idx: number) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group shadow-sm">
                        <img src={img} className="w-full h-full object-cover" />
                        <button 
                          onClick={() => removeGalleryImage(cat, idx)}
                          className="absolute top-2 right-2 p-1 bg-white/90 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    <div 
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleFileUpload(e as any, 'gallery', cat)}
                      className="relative aspect-square rounded-xl bg-stone-50 border-2 border-dashed border-stone-200 flex flex-col items-center justify-center hover:bg-stone-100 transition-colors"
                    >
                      <Plus className="h-6 w-6 text-stone-300 mb-2" />
                      <p className="text-[10px] text-stone-400 font-bold uppercase">Drop Photo</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'gallery', cat)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest italic">
                    Tip: Use external image URLs to avoid browser storage limits. Uploaded photos are still supported for small files.
                  </p>
                </div>
              ))}
            </motion.div>
          )}

          {/* SHOOT PACKAGES TAB */}
          {activeTab === 'packages' && (
            <motion.div key="packages" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
              <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
                <h3 className="text-xl font-serif mb-8 flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Manage Shoot Packages
                </h3>

                {/* Wedding Collections */}
                <div className="mb-12">
                  <h4 className="text-sm uppercase tracking-widest text-stone-400 font-bold mb-6">Wedding Collections</h4>
                  <div className="space-y-6">
                    {packages.weddings.map((pkg: any, idx: number) => (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-stone-50 rounded-xl border border-stone-100">
                        <input
                          type="text"
                          placeholder="Name"
                          value={pkg.name}
                          onChange={e => updatePackage('weddings', idx, 'name', e.target.value)}
                          className="bg-white border-none rounded-lg p-3 text-sm outline-none focus:ring-1 focus:ring-stone-200"
                        />
                        <input
                          type="text"
                          placeholder="Price"
                          value={pkg.price}
                          onChange={e => updatePackage('weddings', idx, 'price', e.target.value)}
                          className="bg-white border-none rounded-lg p-3 text-sm outline-none focus:ring-1 focus:ring-stone-200"
                        />
                        <input
                          type="text"
                          placeholder="Features (comma separated)"
                          value={pkg.features}
                          onChange={e => updatePackage('weddings', idx, 'features', e.target.value)}
                          className="md:col-span-2 bg-white border-none rounded-lg p-3 text-sm outline-none focus:ring-1 focus:ring-stone-200"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Newborn & Family */}
                {['newborn', 'family'].map((type) => (
                  <div key={type} className="mb-12">
                    <h4 className="text-sm uppercase tracking-widest text-stone-400 font-bold mb-6 capitalize">{type === 'newborn' ? 'Birth' : type}</h4>
                    <div className="space-y-6">
                      {(packages as any)[type].map((pkg: any, idx: number) => (
                        <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-stone-50 rounded-xl border border-stone-100">
                          <input
                            type="text"
                            placeholder="Name"
                            value={pkg.name}
                            onChange={e => updatePackage(type as any, idx, 'name', e.target.value)}
                            className="bg-white border-none rounded-lg p-3 text-sm outline-none focus:ring-1 focus:ring-stone-200"
                          />
                          <input
                            type="text"
                            placeholder="Price"
                            value={pkg.price}
                            onChange={e => updatePackage(type as any, idx, 'price', e.target.value)}
                            className="bg-white border-none rounded-lg p-3 text-sm outline-none focus:ring-1 focus:ring-stone-200"
                          />
                          <input
                            type="text"
                            placeholder="Description"
                            value={pkg.desc}
                            onChange={e => updatePackage(type as any, idx, 'desc', e.target.value)}
                            className="md:col-span-2 bg-white border-none rounded-lg p-3 text-sm outline-none focus:ring-1 focus:ring-stone-200"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <button onClick={savePackages} className="w-full bg-stone-900 text-white py-4 rounded-xl uppercase tracking-widest text-xs flex items-center justify-center space-x-2 hover:bg-stone-800 shadow-lg">
                  <Save className="h-4 w-4" />
                  <span>Save Shoot Packages</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* FAQS TAB */}
          {activeTab === 'faqs' && (
            <motion.div key="faqs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
                <h3 className="text-xl font-serif mb-8 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Manage Frequently Asked Questions
                </h3>
                <div className="space-y-8">
                  {faqs.map((faq: any, idx: number) => (
                    <div key={idx} className="p-6 bg-stone-50 rounded-2xl border border-stone-100 space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Question {idx + 1}</label>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={e => {
                            const newF = [...faqs];
                            newF[idx].question = e.target.value;
                            setFaqs(newF);
                          }}
                          className="w-full bg-white border-none rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-stone-200"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Answer</label>
                        <textarea
                          rows={3}
                          value={faq.answer}
                          onChange={e => {
                            const newF = [...faqs];
                            newF[idx].answer = e.target.value;
                            setFaqs(newF);
                          }}
                          className="w-full bg-white border-none rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-stone-200"
                        />
                      </div>
                    </div>
                  ))}
                  <button onClick={saveFaqs} className="w-full bg-stone-900 text-white py-4 rounded-xl uppercase tracking-widest text-xs flex items-center justify-center space-x-2 hover:bg-stone-800 shadow-lg">
                    <Save className="h-4 w-4" />
                    <span>Save All FAQs</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
                <h3 className="text-lg font-serif mb-6">Add New Review</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <input
                    type="text"
                    placeholder="Client Name(s)"
                    value={newReview.name}
                    onChange={e => setNewReview({...newReview, name: e.target.value})}
                    className="bg-stone-50 border-none rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-stone-200"
                  />
                  <input
                    type="text"
                    placeholder="Shoot Type (e.g. Wedding)"
                    value={newReview.type}
                    onChange={e => setNewReview({...newReview, type: e.target.value})}
                    className="bg-stone-50 border-none rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-stone-200"
                  />
                </div>
                <textarea
                  placeholder="Review Text"
                  value={newReview.text}
                  onChange={e => setNewReview({...newReview, text: e.target.value})}
                  rows={3}
                  className="w-full bg-stone-50 border-none rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-stone-200 mb-6"
                />
                <button onClick={addReview} className="bg-stone-900 text-white rounded-xl text-xs uppercase tracking-widest px-8 py-4 flex items-center justify-center space-x-2 hover:bg-stone-800">
                  <Plus className="h-4 w-4" />
                  <span>Add Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((rev: any) => (
                  <div key={rev.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm relative">
                    <button 
                      onClick={() => removeReview(rev.id)}
                      className="absolute top-4 right-4 text-stone-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="flex space-x-1 mb-4">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-stone-600 text-sm font-light italic mb-4 line-clamp-3">"{rev.text}"</p>
                    <p className="text-stone-900 font-serif font-medium">{rev.name}</p>
                    <p className="text-stone-400 text-[10px] uppercase tracking-widest">{rev.type}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CLIENT ACCESS TAB */}
          {activeTab === 'clients' && (
            <motion.div key="clients" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
                <h3 className="text-lg font-serif mb-6">Authorize New Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <input
                    type="email"
                    placeholder="Client Email"
                    value={newClient.email}
                    onChange={e => setNewClient({...newClient, email: e.target.value})}
                    className="bg-stone-50 border-none rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-stone-200"
                  />
                  <input
                    type="text"
                    placeholder="Gallery Name (e.g. Smith Family)"
                    value={newClient.galleryName}
                    onChange={e => setNewClient({...newClient, galleryName: e.target.value})}
                    className="bg-stone-50 border-none rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-stone-200"
                  />
                  <input
                    type="text"
                    placeholder="Google Drive Link"
                    value={newClient.driveLink}
                    onChange={e => setNewClient({...newClient, driveLink: e.target.value})}
                    className="bg-stone-50 border-none rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-stone-200"
                  />
                  <button onClick={addClient} className="bg-stone-900 text-white rounded-xl text-xs uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-stone-800">
                    <Plus className="h-4 w-4" />
                    <span>Authorize Access</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-stone-100 bg-stone-50/50">
                      <th className="p-6 text-[10px] uppercase tracking-widest text-stone-400">Authorized Email</th>
                      <th className="p-6 text-[10px] uppercase tracking-widest text-stone-400">Gallery Folder</th>
                      <th className="p-6 text-[10px] uppercase tracking-widest text-stone-400">Drive Link</th>
                      <th className="p-6 text-[10px] uppercase tracking-widest text-stone-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((c: any) => (
                      <tr key={c.id} className="border-b border-stone-50">
                        <td className="p-6 text-sm text-stone-900 font-medium">{c.email}</td>
                        <td className="p-6 text-sm text-stone-500 italic">{c.galleryName}</td>
                        <td className="p-6 text-sm text-stone-500 break-words">{c.driveLink ? <a href={c.driveLink} target="_blank" rel="noreferrer" className="text-stone-700 underline">Open link</a> : 'Not set'}</td>
                        <td className="p-6 text-right flex justify-end gap-3">
                          <button
                            onClick={() => sendNotificationEmail(c)}
                            className="text-stone-500 hover:text-stone-900 transition-colors text-xs uppercase tracking-widest"
                          >
                            Notify
                          </button>
                          <button onClick={() => removeClient(c.id)} className="text-stone-300 hover:text-red-400 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* STUDIO SETTINGS TAB */}
          {activeTab === 'settings' && (
            <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="bg-white p-10 rounded-3xl border border-stone-200 shadow-sm max-w-3xl">
                <h3 className="text-xl font-serif mb-8">Studio Master Identity</h3>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Master Gallery Code</label>
                      <input
                        type="text"
                        value={studioSettings.masterCode}
                        onChange={e => setStudioSettings({...studioSettings, masterCode: e.target.value})}
                        className="w-full bg-stone-50 border-none rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-stone-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Studio Email</label>
                      <input
                        type="email"
                        value={studioSettings.email}
                        onChange={e => setStudioSettings({...studioSettings, email: e.target.value})}
                        className="w-full bg-stone-50 border-none rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-stone-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Phone Number</label>
                      <input
                        type="text"
                        value={studioSettings.phone}
                        onChange={e => setStudioSettings({...studioSettings, phone: e.target.value})}
                        className="w-full bg-stone-50 border-none rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-stone-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Primary Location</label>
                      <input
                        type="text"
                        value={studioSettings.location}
                        onChange={e => setStudioSettings({...studioSettings, location: e.target.value})}
                        className="w-full bg-stone-50 border-none rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-stone-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Service Area Description</label>
                    <input
                      type="text"
                      value={studioSettings.serviceArea}
                      onChange={e => setStudioSettings({...studioSettings, serviceArea: e.target.value})}
                      className="w-full bg-stone-50 border-none rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-stone-200"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Reviews Section Subtitle</label>
                      <input
                        type="text"
                        value={studioSettings.reviewsSubtitle}
                        onChange={e => setStudioSettings({...studioSettings, reviewsSubtitle: e.target.value})}
                        className="w-full bg-stone-50 border-none rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-stone-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Reviews Section Title</label>
                      <input
                        type="text"
                        value={studioSettings.reviewsTitle}
                        onChange={e => setStudioSettings({...studioSettings, reviewsTitle: e.target.value})}
                        className="w-full bg-stone-50 border-none rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-stone-200"
                      />
                    </div>
                  </div>

                  <div className="pt-8 border-t border-stone-100">
                    <h4 className="text-sm font-serif mb-6">Heirloom Collections (Pricing)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {['album1', 'album2', 'album3', 'frame1', 'frame2', 'frame3'].map((item) => (
                        <div key={item} className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">{item} Name</label>
                            <input
                              type="text"
                              value={(studioSettings as any)[item]}
                              onChange={e => setStudioSettings({...studioSettings, [item]: e.target.value})}
                              className="w-full bg-stone-50 border-none rounded-lg p-3 text-xs outline-none focus:ring-1 focus:ring-stone-200"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Price</label>
                            <input
                              type="text"
                              value={(studioSettings as any)[`${item}Price`]}
                              onChange={e => setStudioSettings({...studioSettings, [`${item}Price`]: e.target.value})}
                              className="w-full bg-stone-50 border-none rounded-lg p-3 text-xs outline-none focus:ring-1 focus:ring-stone-200"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={saveSettings}
                    className="w-full bg-stone-900 text-white py-4 rounded-xl uppercase tracking-widest text-xs flex items-center justify-center space-x-2 hover:bg-stone-800 shadow-lg"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Studio Settings</span>
                  </button>

                  <div className="pt-8 border-t border-stone-100">
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-4">Developer Sync</p>
                    <button 
                      onClick={() => {
                        const config = {
                          settings: studioSettings,
                          clients: clients,
                          backgrounds: backgroundImages,
                          galleries: galleryImages
                        };
                        console.log("MADDIE_ROSE_CONFIG_EXPORT:", JSON.stringify(config));
                        alert("Configuration exported to browser console. In a production environment, this would sync to your permanent database.");
                      }}
                      className="w-full border border-stone-200 text-stone-500 py-3 rounded-xl uppercase tracking-widest text-[10px] hover:bg-stone-50 transition-colors"
                    >
                      Export Site Configuration
                    </button>
                    <p className="mt-2 text-[9px] text-stone-400 italic">Use this to send your changes to your developer for permanent deployment.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
