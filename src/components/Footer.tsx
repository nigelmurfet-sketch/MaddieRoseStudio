import { Camera, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-stone-50 border-t border-stone-200 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <a 
            href="https://www.instagram.com/mannyandme__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
            target="_blank" 
            rel="noopener noreferrer" 
            referrerPolicy="no-referrer"
            className="flex items-center space-x-2 mb-6"
          >
            <Camera className="h-6 w-6 text-stone-800" />
            <span className="text-xl font-serif tracking-widest uppercase text-stone-900">
              Maddie Rose <span className="font-light">Studio</span>
            </span>
          </a>
          <p className="text-stone-500 font-light leading-relaxed">
            Capturing the most precious moments of your life with elegance and timeless artistry. Based in Melbourne, serving Victoria & Tasmania.
          </p>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest font-semibold text-stone-900 mb-6">Navigation</h4>
          <ul className="space-y-4 text-stone-600 font-light">
            <li><Link to="/" className="hover:text-stone-900 transition-colors">Home</Link></li>
            <li><Link to="/gallery/weddings" className="hover:text-stone-900 transition-colors">Weddings</Link></li>
            <li><Link to="/gallery/newborn" className="hover:text-stone-900 transition-colors">Birth</Link></li>
            <li><Link to="/gallery/family" className="hover:text-stone-900 transition-colors">Family</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest font-semibold text-stone-900 mb-6">Experience</h4>
          <ul className="space-y-4 text-stone-600 font-light">
            <li><Link to="/info" className="hover:text-stone-900 transition-colors">Studio Info</Link></li>
            <li><Link to="/contact" className="hover:text-stone-900 transition-colors">Contact</Link></li>
            <li><Link to="/login" className="hover:text-stone-900 transition-colors">Client Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest font-semibold text-stone-900 mb-6">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/mannyandme__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer" className="p-2 bg-white border border-stone-200 rounded-full hover:bg-stone-100 transition-colors flex items-center justify-center">
              <Share2 className="h-5 w-5 text-stone-600" />
              <span className="ml-2 text-xs uppercase tracking-widest text-stone-600 font-medium pr-2">Instagram</span>
            </a>
          </div>
          <p className="mt-8 text-xs text-stone-400 font-light">
            © 2024 Maddie Rose Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
