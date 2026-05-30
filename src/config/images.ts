/**
 * MADDIE ROSE STUDIO - IMAGE CONFIGURATION
 * 
 * To change an image on the website:
 * 1. Upload your new photo to the 'public/' folder.
 * 2. Update the file name in the paths below to match your new file.
 * 
 * Suggestion: Use high-quality .jpg or .webp files.
 */

export const IMAGES = {
  // Home Page
  homeHero: '/hero-new.jpg', // Currently a solid color in code, but path kept for reference
  
  // Categories (Used on Home and Gallery Pages)
  weddings: {
    hero: '/wedding-hero.jpg', 
    gallery: [
      '/wedding-hero.jpg',
      '/wedding-2.jpg',
    ]
  },
  
  newborn: {
    hero: '/newborn-hero.jpg',
    gallery: [
      '/newborn-hero.jpg',
      '/newborn-2.jpg',
    ]
  },
  
  family: {
    hero: '/family-hero.jpg',
    gallery: [
      '/family-hero.jpg',
      '/family-2.jpg',
    ]
  },

  // About / Info Page
  aboutStudio: '/about-studio.jpg',

  // Client Portal Placeholders
  clientPlaceholder: '/about-studio.jpg'
};
