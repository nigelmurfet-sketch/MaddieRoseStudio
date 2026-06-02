# Client Gallery Access Instructions

## 📍 Gallery URL

Your client gallery is located at:
```
https://yourdomain.com/login
```

(Or your local development URL: `http://localhost:5173/login`)

## 🔐 How to Access Your Gallery

1. **Go to the Client Portal Login page**
   - Navigate to: `https://yourdomain.com/login`
   - Make sure "Client Portal" is selected (not Admin Login)

2. **Enter your email address**
   - Use the email address you were authorized with
   - This must be the same email you provided for your session booking

3. **Enter your Gallery Access Code**
   - The access code will be provided to you in the gallery notification email
   - This is the master code set by the studio
   - Default: `MADDIE2024` (unless changed in Studio Settings)

4. **Click "Login"**
   - You'll be taken to your private gallery
   - All your photos are ready to view and download

## 📧 What to Include in Your Gallery Notification Emails

When you send clients a gallery notification from the Admin Dashboard, include this template:

---

### Email to Client:

**Subject:** Your Gallery is Ready to Download

**Body:**

Hi [Gallery Name],

✨ **Your gallery is ready!** 

You can access your private photos here:
**[Gallery Link Button/Link]**

**To access your gallery:**
- Go to: https://yourdomain.com/login
- Enter your email: `[client email]`
- Enter the access code: `MADDIE2024`
- Click "Login"

You'll be able to view all your photos and download them in full resolution.

If you have any questions or need assistance, just reply to this email!

Best,
Maddie Rose Studio

---

## 👨‍💼 Admin: Setting Up Client Access

### Step 1: Add Client to Authorized List
1. Go to **Admin Dashboard** → **Clients** tab
2. Enter the client's email
3. Enter gallery name (e.g., "Smith Wedding" or "Johnson Family Session")
4. Paste the Google Drive link where their photos are stored
5. Click "Authorize Access"

### Step 2: Send Gallery Notification
1. In the Clients list, find the client
2. Click the **"Notify"** button
3. An HTML email is automatically sent to the client with:
   - Beautiful gallery notification
   - Direct link to the gallery
   - Login instructions

### Step 3: Client Login
- Client visits `/login`
- Enters their authorized email
- Enters the master access code from Studio Settings
- Accesses their private gallery portal

## 🔑 Master Access Code

The master access code is configured in:
- **Admin Dashboard** → **Settings** tab
- **Master Gallery Code** field
- Default: `MADDIE2024`

**All clients use the same code** - the client verification happens via their email address being in the authorized list.

## 🔒 Security

- Client emails must be authorized before they can log in
- Only authorized emails can access the system
- Each client only sees their own gallery after login
- The master code acts as an additional security layer

## 💡 Tips

- You can change the master code anytime in Settings
- Clients can log out using the "Logout" button in their gallery
- If a client logs out, they'll need to log in again with their email and code
- Consider sending the login link in your gallery notification email for easy access
