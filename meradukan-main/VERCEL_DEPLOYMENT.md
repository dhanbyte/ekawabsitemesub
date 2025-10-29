# Vercel Deployment Guide

## Quick Deployment Steps

### 1. Push to GitHub (Already Done ✅)
```bash
git add .
git commit -m "Add Google Auth and clean checkout page"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository: `dhanbyte/meradukan`
4. Configure settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

#### Option B: Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

### 3. Environment Variables Setup

Add these in Vercel Dashboard → Settings → Environment Variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YWR2YW5jZWQta29pLTU4LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_79pbdZWPLcN5GtX0mUgC6WD6eyzWGOSqkKHGmgP5gg

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=598906497945-hpnk38kbgk1qtdlo8novf6faaurcckn2.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

# Database
MONGODB_URI=mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/photos-test?retryWrites=true&w=majority&appName=photos-test
MONGODB_DB_NAME=photos-test

# Payment Gateway
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_RKxeb99FKfrsKF
RAZORPAY_KEY_SECRET=XQOBMTYbX9fRJt6xnkftcNcT

# Image Storage
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=public_wkRNuym4bz+0R6wuAYTQfiaWi90=
IMAGEKIT_PRIVATE_KEY=private_CbNfu0pqv6SGi5szq+HCP01WZUc=
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/b5qewhvhb

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
ADMIN_PASSWORD=704331
ADMIN_USER_IDS=user_2qK8vQ9X2Z3Y4W5V6U7T8S9R0P1Q2R3S,user_admin_default
NEXT_PUBLIC_ADMIN_EMAIL=admin@shopwave.social
```

### 4. Domain Configuration (Optional)

If you want custom domain:
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain: `shopwave.social`
3. Configure DNS records as shown

### 5. Enable Google Auth in Clerk

1. Go to https://dashboard.clerk.com
2. Select your project
3. Navigate to: **User & Authentication** → **Social Connections**
4. Enable **Google**:
   - Toggle "Enable for sign-up and sign-in"
   - Add Client ID: `598906497945-hpnk38kbgk1qtdlo8novf6faaurcckn2.apps.googleusercontent.com`
   - Add Client Secret: `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`

### 6. Update Redirect URIs

In Google Cloud Console:
1. Go to APIs & Services → Credentials
2. Edit your OAuth 2.0 Client ID
3. Add authorized redirect URIs:
   ```
   https://your-app.vercel.app/api/auth/callback/google
   https://advanced-koi-58.clerk.accounts.dev/v1/oauth_callback
   ```

## Features Included ✅

- ✅ **Clean Checkout Page** - Simple and mobile-friendly
- ✅ **Google Authentication** - One-click sign-in
- ✅ **Image Display Fixed** - All product images show properly
- ✅ **Sticky Gift Banner** - Shows during checkout scroll
- ✅ **Simple Address Form** - Easy to understand and fill
- ✅ **Payment Integration** - Razorpay with UPI/Cards/COD
- ✅ **Mobile Optimized** - Works perfectly on phones
- ✅ **Admin Panel** - Order management system
- ✅ **Spin Wheel** - Gamification after orders

## Post-Deployment Testing

1. **Test Google Sign-in**: Visit `/sign-in` and try Google login
2. **Test Checkout Flow**: Add items to cart and complete checkout
3. **Test Mobile Experience**: Check on phone browser
4. **Test Payment**: Try UPI/Card payments (use test mode first)
5. **Test Admin Panel**: Check order management

## Troubleshooting

### Common Issues:
1. **Google Auth not showing**: Check Clerk dashboard settings
2. **Payment failing**: Verify Razorpay keys in environment variables
3. **Images not loading**: Check ImageKit configuration
4. **Database errors**: Verify MongoDB connection string

### Support:
- **Vercel Docs**: https://vercel.com/docs
- **Clerk Docs**: https://clerk.com/docs
- **Next.js Docs**: https://nextjs.org/docs

Your app is ready for production! 🚀