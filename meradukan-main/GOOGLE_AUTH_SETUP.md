# Google Authentication Setup for Vercel Deployment

## Current Configuration Status ✅

Your project already has Google OAuth configured! Here's what's already set up:

### Environment Variables (Already Added)
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=598906497945-hpnk38kbgk1qtdlo8novf6faaurcckn2.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
```

### Clerk Configuration Required

1. **Go to Clerk Dashboard**: https://dashboard.clerk.com
2. **Select your project**: meradukan
3. **Navigate to**: User & Authentication → Social Connections
4. **Enable Google OAuth**:
   - Click on "Google" provider
   - Toggle "Enable for sign-up and sign-in"
   - Add your credentials:
     - **Client ID**: `598906497945-hpnk38kbgk1qtdlo8novf6faaurcckn2.apps.googleusercontent.com`
     - **Client Secret**: `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`

### Vercel Environment Variables Setup

Add these to your Vercel project settings:

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add these variables:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YWR2YW5jZWQta29pLTU4LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_79pbdZWPLcN5GtX0mUgC6WD6eyzWGOSqkKHGmgP5gg
NEXT_PUBLIC_GOOGLE_CLIENT_ID=598906497945-hpnk38kbgk1qtdlo8novf6faaurcckn2.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
MONGODB_URI=mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/photos-test?retryWrites=true&w=majority&appName=photos-test
MONGODB_DB_NAME=photos-test
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_RKxeb99FKfrsKF
RAZORPAY_KEY_SECRET=XQOBMTYbX9fRJt6xnkftcNcT
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=public_wkRNuym4bz+0R6wuAYTQfiaWi90=
IMAGEKIT_PRIVATE_KEY=private_CbNfu0pqv6SGi5szq+HCP01WZUc=
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/b5qewhvhb
NEXT_PUBLIC_APP_URL=https://shopwave.social
ADMIN_PASSWORD=704331
ADMIN_USER_IDS=user_2qK8vQ9X2Z3Y4W5V6U7T8S9R0P1Q2R3S,user_admin_default
NEXT_PUBLIC_ADMIN_EMAIL=admin@shopwave.social
```

### Google Cloud Console Setup (If needed)

If you need to update redirect URIs:

1. Go to: https://console.cloud.google.com
2. Select your project
3. Go to APIs & Services → Credentials
4. Click on your OAuth 2.0 Client ID
5. Add these Authorized redirect URIs:
   ```
   https://your-domain.vercel.app/api/auth/callback/google
   https://shopwave.social/api/auth/callback/google
   https://advanced-koi-58.clerk.accounts.dev/v1/oauth_callback
   ```

### Testing Google Auth

After deployment:
1. Visit your Vercel app
2. Click "Sign In"
3. You should see Google as an option
4. Test the Google sign-in flow

## Current Components Already Configured ✅

- ✅ GoogleOneTap component exists
- ✅ Clerk authentication setup
- ✅ Environment variables configured
- ✅ Middleware configured for auth routes

## Next Steps

1. **Enable Google in Clerk Dashboard** (most important)
2. **Add environment variables to Vercel**
3. **Deploy and test**

Your Google Authentication should work perfectly after these steps!