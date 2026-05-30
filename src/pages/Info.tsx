import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Heart, Shield, Sparkles, ChevronDown, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '../config/images';
import { getLocalSiteConfig, loadSiteConfig } from '../utils/siteConfig';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-stone-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left group"
      >
        <span className="text-lg font-serif text-stone-900 group-hover:text-stone-500 transition-colors">{question}</span>
        <ChevronDown className={`h-5 w-5 text-stone-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-stone-600 font-light leading-relaxed flex space-x-4">
               <div className="flex-shrink-0 pt-1">
                 <Camera className="h-4 w-4 text-stone-300" />
               </div>
               <div>
                 <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2 font-bold">Studio Response:</p>
                 {answer}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Info = () => {
  const [siteConfig, setSiteConfig] = useState(getLocalSiteConfig());

  useEffect(() => {
    loadSiteConfig()
      .then(setSiteConfig)
      .catch(() => {});
  }, []);

  const studioSettings = siteConfig.studioSettings;
  const packages = siteConfig.packages;
  const liveBackgrounds = siteConfig.backgroundImages;
  const displayStudioPhoto = (liveBackgrounds && liveBackgrounds.aboutStudio) || IMAGES.aboutStudio;
  const faqs = siteConfig.faqs;

  const processSteps = [
    {
      title: 'Consultation',
      description: 'We start with a coffee (or a virtual one) to discuss your vision, style, and expectations for the shoot.',
      icon: <Sparkles className="h-6 w-6 text-stone-400" />
    },
    {
      title: 'Planning',
      description: 'We help with location scouting, outfit coordination, and timeline planning to ensure everything is perfect.',
      icon: <Heart className="h-6 w-6 text-stone-400" />
    },
    {
      title: 'The Session',
      description: 'A relaxed, fun environment where we guide you through natural poses to capture authentic moments.',
      icon: <Shield className="h-6 w-6 text-stone-400" />
    },
    {
      title: 'Delivery',
      description: 'Within 4-6 weeks, you will receive your beautifully edited, high-resolution digital gallery.',
      icon: <Check className="h-6 w-6 text-stone-400" />
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-40 pb-20 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-sm uppercase tracking-[0.3em] text-stone-500 mb-6">Experience & Pricing</h2>
            <h1 className="text-5xl md:text-7xl font-serif text-stone-900 mb-8 leading-tight">
              Honest moments, <br />
              <span className="italic">timeless</span> artistry.
            </h1>
            <p className="text-stone-600 font-light text-lg mb-8 leading-relaxed">
              We believe that photography is more than just a service—it's an investment in your memories. Our approach is focused on storytelling, quality, and creating a comfortable experience for every client.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img src={displayStudioPhoto} alt="Maddie Rose Studio" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Pricing & Packages */}
      <section className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-sm uppercase tracking-[0.3em] text-stone-500 mb-4">The Investment</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-stone-900">Packages & Collections</h3>
            <p className="mt-6 text-stone-500 font-light max-w-2xl mx-auto">All prices are in AUD and include professional editing and a private online gallery.</p>
          </div>

          {/* Wedding Packages */}
          <div className="mb-32">
            <div className="flex items-center space-x-4 mb-12">
              <div className="h-px bg-stone-200 flex-grow"></div>
              <h4 className="text-2xl font-serif text-stone-800 uppercase tracking-widest px-4">Wedding Collections</h4>
              <div className="h-px bg-stone-200 flex-grow"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.weddings.map((pkg: any) => (
                <div key={pkg.name} className={`p-8 rounded-2xl border ${pkg.highlight ? 'border-stone-900 bg-stone-900 text-white shadow-2xl' : 'border-stone-100 bg-white'} transition-all hover:-translate-y-2`}>
                  <h5 className="text-xl font-serif mb-2">{pkg.name}</h5>
                  <p className={`text-2xl font-light mb-6 ${pkg.highlight ? 'text-stone-300' : 'text-stone-900'}`}>{pkg.price}</p>
                  <ul className="space-y-4 mb-8">
                    {pkg.features.split(',').map((f: string) => (
                      <li key={f} className="flex items-start text-sm">
                        <Check className={`h-4 w-4 mr-3 mt-1 ${pkg.highlight ? 'text-stone-400' : 'text-stone-300'}`} />
                        <span className={pkg.highlight ? 'text-stone-200' : 'text-stone-600'}>{f.trim()}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-full text-xs uppercase tracking-widest border transition-colors ${pkg.highlight ? 'bg-white text-stone-900 border-white hover:bg-stone-200' : 'border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white'}`}>Book This</button>
                </div>
              ))}
            </div>
          </div>

          {/* Newborn & Family */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Birth */}
            <div>
              <div className="flex items-center space-x-4 mb-12">
                <h4 className="text-2xl font-serif text-stone-800 uppercase tracking-widest pr-4">Birth</h4>
                <div className="h-px bg-stone-200 flex-grow"></div>
              </div>
              <div className="space-y-8">
                {packages.newborn.map((item: any) => (
                  <div key={item.name} className="flex justify-between items-start group">
                    <div className="max-w-[70%]">
                      <div className="flex items-center space-x-3">
                        <h5 className="text-lg font-serif text-stone-900">{item.name}</h5>
                        {item.deal && <span className="bg-stone-100 text-stone-500 text-[10px] uppercase tracking-tighter px-2 py-0.5 rounded-full font-bold">{item.deal}</span>}
                      </div>
                      <p className="text-stone-500 text-sm font-light mt-1">{item.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-light text-stone-900">{item.price}</p>
                      <button className="text-[10px] uppercase tracking-widest text-stone-400 border-b border-transparent hover:border-stone-400 mt-2 transition-all">Select</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Family */}
            <div>
              <div className="flex items-center space-x-4 mb-12">
                <h4 className="text-2xl font-serif text-stone-800 uppercase tracking-widest pr-4">Family</h4>
                <div className="h-px bg-stone-200 flex-grow"></div>
              </div>
              <div className="space-y-8">
                {packages.family.map((item: any) => (
                  <div key={item.name} className="flex justify-between items-start group">
                    <div className="max-w-[70%]">
                      <h5 className="text-lg font-serif text-stone-900">{item.name}</h5>
                      <p className="text-stone-500 text-sm font-light mt-1">{item.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-light text-stone-900">{item.price}</p>
                      <button className="text-[10px] uppercase tracking-widest text-stone-400 border-b border-transparent hover:border-stone-400 mt-2 transition-all">Select</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fine Art Products Section */}
          <div className="mt-32">
            <div className="text-center mb-16">
              <h4 className="text-sm uppercase tracking-[0.3em] text-stone-500 mb-4">Heirloom Collections</h4>
              <h3 className="text-4xl font-serif text-stone-900">Albums & Frames</h3>
              <p className="mt-4 text-stone-500 font-light max-w-xl mx-auto">Beautifully crafted, museum-quality products to preserve your memories for generations. Available for all shoot styles.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-stone-50 rounded-3xl p-10 border border-stone-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className="aspect-video rounded-2xl overflow-hidden mb-8 bg-stone-200">
                  <img src={displayStudioPhoto} alt="Fine Art Album" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <h4 className="text-2xl font-serif text-stone-900 mb-4">Fine Art Albums</h4>
                <p className="text-stone-600 font-light text-sm mb-8 leading-relaxed">Handcrafted with premium linens and archival papers. Each album is custom designed to tell the unique story of your day.</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-stone-100">
                    <span className="text-stone-800 text-sm">{studioSettings.album1}</span>
                    <span className="font-serif">{studioSettings.album1Price}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-stone-100">
                    <span className="text-stone-800 text-sm">{studioSettings.album2}</span>
                    <span className="font-serif">{studioSettings.album2Price}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-stone-100">
                    <span className="text-stone-800 text-sm">{studioSettings.album3}</span>
                    <span className="font-serif">{studioSettings.album3Price}</span>
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 rounded-3xl p-10 border border-stone-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className="aspect-video rounded-2xl overflow-hidden mb-8 bg-stone-200">
                  <img src={displayStudioPhoto} alt="Handcrafted Frames" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <h4 className="text-2xl font-serif text-stone-900 mb-4">Handcrafted Frames</h4>
                <p className="text-stone-600 font-light text-sm mb-8 leading-relaxed">Sustainable Australian hardwoods, museum-grade matting, and UV-protective glass. Ready to hang in your home.</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-stone-100">
                    <span className="text-stone-800 text-sm">{studioSettings.frame1}</span>
                    <span className="font-serif">{studioSettings.frame1Price}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-stone-100">
                    <span className="text-stone-800 text-sm">{studioSettings.frame2}</span>
                    <span className="font-serif">{studioSettings.frame2Price}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-stone-100">
                    <span className="text-stone-800 text-sm">{studioSettings.frame3}</span>
                    <span className="font-serif">{studioSettings.frame3Price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gift Card Section */}
          <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-stone-900 rounded-3xl p-12 text-center border border-stone-800 flex flex-col justify-center">
              <Sparkles className="h-8 w-8 text-stone-500 mx-auto mb-6" />
              <h4 className="text-2xl font-serif text-white mb-4">Give the Gift of Memories</h4>
              <p className="text-stone-400 font-light mb-8 max-w-xl mx-auto">Perfect for baby showers, weddings, or anniversaries. Our digital gift cards are the perfect way to help loved ones capture their most precious moments.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="https://maddierose.giftcard.app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white text-stone-900 px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-stone-200 transition-colors"
                >
                  Purchase Gift Card
                </a>
              </div>
              <p className="mt-4 text-[10px] text-stone-500 uppercase tracking-widest">Powered by GiftUp! or Square</p>
            </div>

            <div className="bg-stone-50 rounded-3xl p-12 text-center border border-stone-100 flex flex-col justify-center">
              <h4 className="text-2xl font-serif text-stone-900 mb-4">Seasonal Special</h4>
              <p className="text-stone-600 font-light mb-8 max-w-xl mx-auto">Book any 2025 wedding before the end of the month and receive a complimentary engagement session (valued at $450).</p>
              <Link to="/contact" className="inline-block border border-stone-900 text-stone-900 px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-colors">Claim this deal</Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-40 max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h4 className="text-sm uppercase tracking-[0.3em] text-stone-500 mb-4">Common Questions</h4>
              <h3 className="text-4xl font-serif text-stone-900">Your Questions, Answered</h3>
            </div>
            <div className="bg-stone-50/50 rounded-3xl p-8 md:p-12">
              {faqs.map((faq: any, idx: number) => (
                <FAQItem 
                  key={idx}
                  question={faq.question} 
                  answer={faq.answer} 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-32 bg-stone-900 text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-sm uppercase tracking-[0.3em] text-stone-400 mb-4 text-center md:text-left">Our Process</h2>
            <h3 className="text-4xl font-serif text-center md:text-left">From Booking to Delivery</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {processSteps.map((step) => (
              <div key={step.title} className="space-y-6">
                <div className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center">
                  {step.icon}
                </div>
                <h4 className="text-xl font-serif">{step.title}</h4>
                <p className="text-stone-400 font-light leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Info;
