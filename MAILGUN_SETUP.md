# Mailgun Email Setup Guide for Maddie Rose Studio

## Overview
Your website now has a complete email system that sends:
- **Client inquiry confirmations** when someone fills out the Contact form
- **Gallery upload notifications** when you notify a client their gallery is ready
- **Admin notifications** to you when inquiries come in

## Mailgun Configuration

### Step 1: Get Your Mailgun Credentials

1. Go to [Mailgun.com](https://www.mailgun.com) and sign in
2. Navigate to **Sending** → **Domain Settings**
3. Find your sending domain (e.g., `mg.yourdomain.com`)
4. Locate your SMTP credentials:
   - **SMTP Host:** `smtp.mailgun.org`
   - **SMTP Port:** `587`
   - **Username:** `postmaster@yourdomain.mailgun.org`
   - **Password:** Your Mailgun API key (starts with `key-`)

### Step 2: Configure Your `.env` File

Create a `.env` file in the root directory with these values:

```bash
# Mailgun SMTP Configuration
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_SERVICE=
EMAIL_USER=postmaster@yourdomain.mailgun.org
EMAIL_PASS=your-mailgun-api-key-here
EMAIL_FROM="Maddie Rose Studio <noreply@yourdomain.mailgun.org>"

# Your studio email (receives admin notifications)
STUDIO_EMAIL=maddierosemac@gmail.com

# Admin authentication
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password
ADMIN_API_KEY=your-secure-api-key-token

# Server
SERVER_PORT=4000
```

### Step 3: Update Domain DNS Records

Since you mentioned DNS is already set up, verify you have these DNS records in your domain provider:

1. **MX Record** - Points to Mailgun
2. **TXT Record** - SPF record: `v=spf1 include:mailgun.org ~all`
3. **TXT Record** - DKIM record (provided by Mailgun)

## How It Works

### Contact Form Submission
When a client fills out the contact form:
1. Form data is sent to `/api/inquiry` endpoint
2. Server sends an **admin notification** to you at `STUDIO_EMAIL`
3. Server sends an **auto-reply confirmation** to the client

### Gallery Upload Notification
When you click "Notify" next to a client in the Admin Dashboard:
1. The server sends a beautifully formatted HTML email to the client
2. Email includes the gallery link and a "View Gallery" button
3. A copy of the notification is sent to your `STUDIO_EMAIL`

### Email Endpoints

**POST `/api/inquiry`** - Client inquiry (public)
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'd like to book a wedding session for June 2025..."
}
```

**POST `/api/notify-gallery`** - Gallery notification (admin only)
```json
{
  "email": "client@example.com",
  "galleryName": "Smith Family Session",
  "galleryLink": "https://drive.google.com/..."
}
```
Requires header: `X-Admin-Token: your-admin-api-key`

## Testing Your Setup

### Test 1: Fill out the Contact Form
- Go to your website's contact page
- Submit a test inquiry
- Check that you receive an email at `STUDIO_EMAIL`
- Check that the client receives a confirmation email

### Test 2: Send a Gallery Notification
- Log in to the Admin Dashboard
- Go to the **Clients** tab
- Click "Notify" next to a client
- Verify the client receives the gallery link email

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Emails not sending** | Check that EMAIL_HOST, EMAIL_USER, and EMAIL_PASS are correct in `.env` |
| **"Invalid credentials" error** | Verify your Mailgun API key is correct (should start with `key-`) |
| **Emails going to spam** | Ensure your DNS SPF and DKIM records are properly configured in your domain |
| **Unauthorized error on notify-gallery** | Check that X-Admin-Token header matches ADMIN_API_KEY in `.env` |

## Security Best Practices

- ✅ Never commit your `.env` file to version control
- ✅ Use strong passwords for ADMIN_PASSWORD and ADMIN_API_KEY
- ✅ Keep your Mailgun API key confidential
- ✅ Use different credentials for development vs production

## File Structure

The email system is implemented in these files:
- [server.js](../server.js) - Email endpoints and Mailgun configuration
- [Contact.tsx](../src/pages/Contact.tsx) - Inquiry form submission
- [AdminDashboard.tsx](../src/pages/AdminDashboard.tsx) - Gallery notification trigger
- [email.ts](../src/utils/email.ts) - Frontend email utility functions
