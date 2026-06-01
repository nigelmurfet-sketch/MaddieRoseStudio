import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Camera } from 'lucide-react';
import { IMAGES } from '../config/images';
import { useState, useEffect } from 'react';
import { getLocalSiteConfig, loadSiteConfig } from '../utils/siteConfig';

const Home = () => {
  const [siteConfig, setSiteConfig] = useState(getLocalSiteConfig());

  useEffect(() => {
    loadSiteConfig()
      .then(setSiteConfig)
      .catch(() => {});
  }, []);

  const customHero = siteConfig.backgroundImages.homeHero || '';
  const reviewsTitle = siteConfig.studioSettings.reviewsTitle;
  const reviewsSubtitle = siteConfig.studioSettings.reviewsSubtitle;
  const displayReviews = siteConfig.reviews;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900">
        {customHero ? (
          <div className="absolute inset-0 z-0">
            <img src={customHero} alt="Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ) : (
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-b from-stone-800 to-stone-950"></div>
          </div>
        )}


        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-8xl font-serif text-white mb-6 tracking-tight"
          >
            Maddie Rose <span className="font-light italic">Studio</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-white font-light tracking-widest uppercase mb-10"
          >
            Capturing Life's Most Beautiful Chapters
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-white text-stone-900 px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-stone-100 transition-colors"
            >
              <span>Book Your Session</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
          {/* Bouncing Ball with Squash and Stretch */}
          <motion.div 
            animate={{ 
              y: [0, -100, 0],
              scaleY: [0.6, 1.1, 1, 1.1, 0.6],
              scaleX: [1.4, 0.9, 1, 0.9, 1.4]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              times: [0, 0.4, 0.5, 0.6, 1],
              ease: ["easeOut", "easeIn", "easeOut", "easeIn"]
            }}
            className="w-6 h-6 bg-white rounded-full relative z-10 shadow-[0_0_25px_rgba(255,255,255,0.8)]"
          />
          
          {/* Floor Shadow */}
          <motion.div 
            animate={{ 
              scale: [1.2, 0.3, 1.2],
              opacity: [0.5, 0.1, 0.5]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              times: [0, 0.5, 1],
              ease: ["easeOut", "easeIn"]
            }}
            className="w-8 h-2 bg-black/40 rounded-full blur-md -mt-1"
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-sm uppercase tracking-[0.3em] text-stone-500 mb-4">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-stone-900">Services & Portfolio</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Wedding */}
            <motion.div
              whileHover={{ y: -10 }}
              className="group relative h-[600px] overflow-hidden rounded-2xl shadow-lg"
            >
              <img
                src={IMAGES.weddings.hero}
                alt="Weddings"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors"></div>
              <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                <h4 className="text-3xl font-serif mb-4">Weddings</h4>
                <p className="font-light text-stone-200 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Timeless storytelling for your most precious day. Elegant and romantic.
                </p>
                <Link
                  to="/gallery/weddings"
                  className="inline-flex items-center space-x-2 text-sm uppercase tracking-widest border-b border-white pb-1 w-fit"
                >
                  <span>View Gallery</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Birth */}
            <motion.div
              whileHover={{ y: -10 }}
              className="group relative h-[600px] overflow-hidden rounded-2xl shadow-lg"
            >
              <img
                src={IMAGES.newborn.hero}
                alt="Birth"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors"></div>
              <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                <h4 className="text-3xl font-serif mb-4">Birth</h4>
                <p className="font-light text-stone-200 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Capturing the miracle of life and those first precious moments.
                </p>
                <Link
                  to="/gallery/newborn"
                  className="inline-flex items-center space-x-2 text-sm uppercase tracking-widest border-b border-white pb-1 w-fit"
                >
                  <span>View Gallery</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Family */}
            <motion.div
              whileHover={{ y: -10 }}
              className="group relative h-[600px] overflow-hidden rounded-2xl shadow-lg"
            >
              <img
                src={IMAGES.family.hero}
                alt="Family"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors"></div>
              <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                <h4 className="text-3xl font-serif mb-4">Family</h4>
                <p className="font-light text-stone-200 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Capturing the authentic joy and connection within your family.
                </p>
                <Link
                  to="/gallery/family"
                  className="inline-flex items-center space-x-2 text-sm uppercase tracking-widest border-b border-white pb-1 w-fit"
                >
                  <span>View Gallery</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-stone-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-sm uppercase tracking-[0.3em] text-stone-500 mb-4">{reviewsSubtitle}</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-stone-900">{reviewsTitle}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayReviews.map((review: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-2xl shadow-sm border border-stone-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex space-x-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-stone-600 font-light italic leading-relaxed mb-8">"{review.text}"</p>
                </div>
                <div>
                  <p className="font-serif text-stone-900 text-lg">{review.name}</p>
                  <p className="text-stone-400 text-xs uppercase tracking-widest">{review.type}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <a href="https://www.instagram.com/mannyandme__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer" className="inline-block group">
            <Camera className="h-10 w-10 text-stone-300 mx-auto mb-8 transition-transform group-hover:scale-110 group-hover:text-stone-900" />
          </a>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-10 leading-relaxed">
            Capturing the <span className="italic">extraordinary</span> in every ordinary moment.
          </h2>
          <p className="text-stone-400 uppercase tracking-widest text-sm">Melbourne Based • Serving Victoria & Tasmania</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
