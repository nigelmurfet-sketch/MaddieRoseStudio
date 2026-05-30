import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { IMAGES } from '../config/images';
import { useEffect, useState } from 'react';
import { getLocalSiteConfig, loadSiteConfig } from '../utils/siteConfig';

const galleryData = {
  weddings: {
    title: 'Weddings',
    description: 'Timeless, romantic, and ethereal moments from your most special day.',
    hero: IMAGES.weddings.hero,
    images: IMAGES.weddings.gallery.map((src, id) => ({ id, src, alt: `Wedding ${id + 1}` }))
  },
  newborn: {
    title: 'Birth',
    description: 'Capturing the miracle of life and those first precious moments.',
    hero: IMAGES.newborn.hero,
    images: IMAGES.newborn.gallery.map((src, id) => ({ id, src, alt: `Birth ${id + 1}` }))
  },
  family: {
    title: 'Family',
    description: 'Authentic joy and connection captured in beautiful natural light.',
    hero: IMAGES.family.hero,
    images: IMAGES.family.gallery.map((src, id) => ({ id, src, alt: `Family ${id + 1}` }))
  }
};

const GalleryPage = () => {
  const { type } = useParams<{ type: string }>();
  const [siteConfig, setSiteConfig] = useState(getLocalSiteConfig());

  useEffect(() => {
    loadSiteConfig()
      .then(setSiteConfig)
      .catch(() => {});
  }, []);

  const liveGalleries = siteConfig.galleryImages;
  const liveBackgrounds = siteConfig.backgroundImages;

  const data = galleryData[type as keyof typeof galleryData];
  if (!data) return <div>Gallery not found</div>;

  // Merge live images if they exist
  const displayHero = (type && liveBackgrounds && liveBackgrounds[`${type}Hero`]) || data.hero;
  
  // Combine hardcoded and live images, ensuring we only show assigned ones and limit to 20
  const dashboardImages = (type && liveGalleries && liveGalleries[type]) || [];
  const displayImages = dashboardImages.length > 0
    ? dashboardImages.slice(0, 20).map((src: string, id: number) => ({ id: `live-${id}`, src, alt: `${type} ${id}` }))
    : data.images.filter((img: any) => img.src && !img.src.includes('placeholder')).slice(0, 20);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={displayHero} alt={data.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link to="/" className="inline-flex items-center text-white/70 hover:text-white uppercase tracking-widest text-xs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6"
          >
            {data.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 font-light max-w-2xl mx-auto text-lg"
          >
            {data.description}
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="columns-1 md:columns-2 gap-8 space-y-8">
          {displayImages.map((image: any, index: number) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden rounded-xl bg-stone-100"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-serif text-stone-900 mb-8">Ready to book your {data.title.toLowerCase()} session?</h3>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 bg-stone-900 text-white px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-stone-800 transition-colors"
          >
            Let's Chat
          </Link>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
