import { motion } from 'framer-motion';
import { Download, Share2, Heart, ArrowLeft, ExternalLink, Star, Send, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CLIENT_GALLERIES } from '../config/clients';
import { getLocalSiteConfig, loadSiteConfig } from '../utils/siteConfig';

const ClientGallery = () => {
  const navigate = useNavigate();
  const clientEmail = localStorage.getItem('clientAccess');
  const clientGalleryName = localStorage.getItem('clientGalleryName');
  const [siteConfig, setSiteConfig] = useState(getLocalSiteConfig());

  useEffect(() => {
    if (!clientEmail) {
      navigate('/login', { replace: true });
    }
  }, [clientEmail, navigate]);

  useEffect(() => {
    loadSiteConfig()
      .then(setSiteConfig)
      .catch(() => {});
  }, []);

  const authorizedClients = siteConfig.clients.length > 0 ? siteConfig.clients : CLIENT_GALLERIES;
  const currentClient = authorizedClients.find((c: any) => c.email.toLowerCase() === clientEmail?.toLowerCase());
  const displayName = clientGalleryName || currentClient?.galleryName || 'Client';
  const driveLink = currentClient?.driveLink || '';

  const galleryImages = Object.values(siteConfig.galleryImages).flat().filter(Boolean) as string[];
  const displayImages = galleryImages.length > 0
    ? galleryImages.map((src, idx) => ({ id: `live-${idx}`, src, alt: `Gallery ${idx + 1}` }))
    : [
      { id: 1, src: '/wedding-hero.jpg', alt: 'Wedding 1' },
      { id: 2, src: '/wedding-2.jpg', alt: 'Wedding 2' },
      { id: 3, src: '/newborn-hero.jpg', alt: 'Newborn 1' },
      { id: 4, src: '/family-hero.jpg', alt: 'Family 1' },
      { id: 5, src: '/family-2.jpg', alt: 'Family 2' },
      { id: 6, src: '/about-studio.jpg', alt: 'Studio 1' },
    ];

  const handleLogout = () => {
    localStorage.removeItem('clientAccess');
    localStorage.removeItem('clientGalleryName');
    navigate('/', { replace: true });
  };

  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, text: '' });

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    inquiries.push({
      id: Date.now(),
      type: 'Client Review',
      name: displayName,
      email: clientEmail,
      service: `${reviewData.rating} Stars`,
      message: reviewData.text,
      status: 'New'
    });
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
    setReviewSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 text-stone-400 text-xs uppercase tracking-widest mb-4"
            >
              <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-stone-900">Private Gallery</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-serif text-stone-900"
            >
              {displayName}
            </motion.h1>
            <p className="text-stone-500 font-light mt-4">Welcome back. Your photos are ready for viewing and high-resolution download.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            {driveLink ? (
              <a
                href={driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-stone-900 text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-stone-800 transition-all flex items-center space-x-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Access Google Drive Gallery</span>
              </a>
            ) : (
              <button
                disabled
                className="bg-stone-200 text-stone-500 px-8 py-3 rounded-full text-xs uppercase tracking-widest transition-all cursor-not-allowed"
              >
                Google Drive Link Not Set
              </button>
            )}
            <button
              onClick={handleLogout}
              className="border border-stone-200 text-stone-500 px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-stone-50 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {displayImages.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl bg-stone-50"
            >
              <img src={photo.src} alt={photo.alt} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors">
                      <Heart className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                  <a
                    href={photo.src}
                    download
                    className="p-2 bg-white text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-12 bg-stone-50 rounded-3xl border border-stone-100 text-center flex flex-col justify-center">
            <h3 className="text-2xl font-serif text-stone-900 mb-4">Sharing your memories?</h3>
            <p className="text-stone-500 font-light mb-8 max-w-sm mx-auto">I love seeing my work in the wild! Please tag me on Instagram at <a href="https://www.instagram.com/mannyandme__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer" className="text-stone-900 font-medium underline">@mannyandme__</a></p>
            <Link to="/contact" className="inline-flex items-center justify-center space-x-2 text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Questions about your gallery?</span>
            </Link>
          </div>

          <div className="p-12 bg-stone-900 rounded-3xl text-white">
            {reviewSubmitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center">
                <Check className="h-12 w-12 text-stone-400 mb-4" />
                <h4 className="text-xl font-serif mb-2">Thank you!</h4>
                <p className="text-stone-400 font-light text-sm">Your feedback means the world to the studio.</p>
              </motion.div>
            ) : (
              <form onSubmit={submitReview} className="space-y-6">
                <h3 className="text-2xl font-serif">Leave a Review</h3>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setReviewData({ ...reviewData, rating: num })}
                      className="focus:outline-none"
                    >
                      <Star className={`h-5 w-5 ${num <= reviewData.rating ? 'text-amber-400 fill-amber-400' : 'text-stone-700'}`} />
                    </button>
                  ))}
                </div>
                <textarea
                  required
                  rows={3}
                  value={reviewData.text}
                  onChange={(e) => setReviewData({ ...reviewData, text: e.target.value })}
                  placeholder="How was your experience with the studio?"
                  className="w-full bg-stone-800 border-none rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-stone-600 text-white"
                />
                <button type="submit" className="w-full bg-white text-stone-900 py-3 rounded-xl uppercase tracking-widest text-[10px] font-bold flex items-center justify-center space-x-2 hover:bg-stone-200 transition-colors">
                  <span>Submit Review</span>
                  <Send className="h-3 w-3" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientGallery;
