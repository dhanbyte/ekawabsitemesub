# Set environment variables
$env:MONGODB_URI = "mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test"
$env:MONGODB_DB_NAME = "photos-test"
$env:NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = "pk_test_YWR2YW5jZWQta29pLTU4LmNsZXJrLmFjY291bnRzLmRldiQ"
$env:CLERK_SECRET_KEY = "sk_test_79pbdZWPLcN5GtX0mUgC6WD6eyzWGOSqkKHGmgP5gg"
$env:NEXT_PUBLIC_RAZORPAY_KEY_ID = "rzp_test_RDS7GUfIddVKwK"
$env:RAZORPAY_KEY_SECRET = "Sk0lz17w2Hz328cgvSs9WsVR"
$env:NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY = "public_wkRNuym4bz+0R6wuAYTQfiaWi90="
$env:IMAGEKIT_PRIVATE_KEY = "private_CbNfu0pqv6SGi5szq+HCP01WZUc="
$env:NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT = "https://ik.imagekit.io/b5qewhvhb"

# Run Vercel deployment
Write-Host "🚀 Starting Vercel deployment..." -ForegroundColor Green
npx vercel --prod
