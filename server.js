import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.SERVER_PORT || 4000;
const configFilePath = path.join(__dirname, 'site-config.json');

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const defaultSiteConfig = {
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
    aboutStudio: ''
  }
};

const ensureConfigFile = async () => {
  try {
    await fs.access(configFilePath);
  } catch {
    await fs.writeFile(configFilePath, JSON.stringify(defaultSiteConfig, null, 2));
  }
};

const readSiteConfig = async () => {
  try {
    await ensureConfigFile();
    const json = await fs.readFile(configFilePath, 'utf-8');
    return JSON.parse(json);
  } catch (error) {
    console.error('Could not read site config:', error);
    return defaultSiteConfig;
  }
};

const saveSiteConfig = async (config) => {
  try {
    await fs.writeFile(configFilePath, JSON.stringify(config, null, 2));
    return true;
  } catch (error) {
    console.error('Could not save site config:', error);
    return false;
  }
};

if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn('Warning: EMAIL_HOST, EMAIL_USER, and EMAIL_PASS must be set to send email.');
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;

    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({ error: 'Missing required email fields.' });
    }

    const message = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(message);
    res.json({ ok: true, messageId: info.messageId });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ ok: false, error: 'Email service error.' });
  }
});

app.get('/api/config', async (req, res) => {
  const config = await readSiteConfig();
  res.json(config);
});

app.post('/api/config', async (req, res) => {
  const config = req.body;
  if (!config || typeof config !== 'object') {
    return res.status(400).json({ error: 'Invalid configuration payload.' });
  }

  const success = await saveSiteConfig(config);
  if (!success) {
    return res.status(500).json({ error: 'Failed to persist configuration.' });
  }

  res.json({ ok: true });
});

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
