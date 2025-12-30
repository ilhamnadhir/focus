# How to Get Your Firebase Config - Step by Step

## Step 1: Go to Firebase Console
1. Open your browser and go to: **https://console.firebase.google.com/**
2. Sign in with your Google account

## Step 2: Create a New Project
1. Click the **"Add project"** or **"Create a project"** button
2. Enter a project name (e.g., "focus-app")
3. Click **"Continue"**
4. Disable Google Analytics (optional, you can enable it later)
5. Click **"Create project"**
6. Wait for the project to be created (takes ~30 seconds)
7. Click **"Continue"** when ready

## Step 3: Register Your Web App
1. On the project overview page, look for **"Get started by adding Firebase to your app"**
2. Click the **Web icon** (looks like `</>`)
3. Enter an app nickname: **"focus-web"** (or any name you like)
4. **DO NOT** check "Also set up Firebase Hosting" (we'll deploy elsewhere)
5. Click **"Register app"**

## Step 4: Copy Your Firebase Configuration

You'll see a code snippet that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "focus-app-xxxxx.firebaseapp.com",
  projectId: "focus-app-xxxxx",
  storageBucket: "focus-app-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

**Copy these 6 values!**

### Alternative Way to Find Config (if you already created the app):
1. Click the **gear icon** ⚙️ next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. You'll see your web app listed
5. Scroll down to **"SDK setup and configuration"**
6. Select **"Config"** (not npm)
7. Copy the `firebaseConfig` object values

## Step 5: Create Your .env File

1. In your project folder (`focus`), create a new file named **`.env`** (yes, it starts with a dot)
2. Copy and paste this template:

```env
VITE_FIREBASE_API_KEY=paste_your_apiKey_here
VITE_FIREBASE_AUTH_DOMAIN=paste_your_authDomain_here
VITE_FIREBASE_PROJECT_ID=paste_your_projectId_here
VITE_FIREBASE_STORAGE_BUCKET=paste_your_storageBucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=paste_your_messagingSenderId_here
VITE_FIREBASE_APP_ID=paste_your_appId_here
```

3. Replace each value with your actual Firebase config values (remove quotes)

### Example:
If your Firebase config shows:
```javascript
apiKey: "AIzaSyC1234567890abcdefg"
```

Your .env should have:
```env
VITE_FIREBASE_API_KEY=AIzaSyC1234567890abcdefg
```

## Step 6: Enable Authentication

1. In Firebase Console, click **"Authentication"** in the left sidebar
2. Click **"Get started"**
3. Click on **"Google"** under "Sign-in providers"
4. Toggle the **"Enable"** switch
5. Select your **support email** from the dropdown
6. Click **"Save"**

## Step 7: Create Firestore Database

1. Click **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development)
   - This allows read/write access for 30 days
   - You can update security rules later
4. Choose a **Cloud Firestore location** (pick the closest to you)
5. Click **"Enable"**
6. Wait for the database to be created

## Step 8: Verify Your .env File

Your final `.env` file should look something like this:

```env
VITE_FIREBASE_API_KEY=AIzaSyC1234567890abcdefghijklmnop
VITE_FIREBASE_AUTH_DOMAIN=focus-app-12345.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=focus-app-12345
VITE_FIREBASE_STORAGE_BUCKET=focus-app-12345.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456789
```

**Important:**
- No quotes around values
- No spaces around the `=` sign
- Each value on its own line
- File must be named exactly `.env` (with the dot at the start)

## Step 9: Restart Your App

1. Stop the dev server if it's running (press `Ctrl+C` in the terminal)
2. Run:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000
4. You should see the login page!
5. Click "Sign in with Google" and test it out

## Troubleshooting

### "Can't find .env file"
- Make sure the file is in the root of your project (same folder as `package.json`)
- Make sure it's named `.env` exactly (not `.env.txt`)

### "Firebase: Error (auth/unauthorized-domain)"
- Go to Firebase Console → Authentication → Settings → Authorized domains
- Add `localhost` (it should already be there)

### "Missing or insufficient permissions"
- Make sure you created the Firestore database in test mode
- Check that all 6 environment variables are set correctly

### Still having issues?
- Double-check that there are no extra spaces in your `.env` file
- Make sure you copied all 6 values correctly
- Restart your terminal/dev server after creating `.env`

---

**That's it!** Once you complete these steps, your Focus app will be fully functional with authentication, database, and all features working! 🎉
