/**
 * MADDIE ROSE STUDIO - CLIENT ACCESS CONFIG
 * 
 * To add a new client portal:
 * 1. Add their email and a unique password to the list below.
 * 2. They will then be able to log in and see their private gallery.
 */

// Give this one code to all your clients!
export const MASTER_CLIENT_CODE = 'MADDIE2024'; 

// This list connects an email to a specific gallery name or folder
export const CLIENT_GALLERIES = [
  { email: 'client@example.com', galleryName: 'The Smith Family', folder: 'smith-family' },
  { email: 'bride@example.com', galleryName: 'Sarah & James Wedding', folder: 'wedding-1' },
];

// Admin credentials are now handled by the backend via environment variables.
