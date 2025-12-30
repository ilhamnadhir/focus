# 🚨 CRITICAL: Application Won't Run Without Firebase Setup

## The app is failing because Firebase is not configured yet!

### Quick Fix (5 minutes):

1. **Create Firebase Project**
   - Go to https://console.firebase.google.com/
   - Click "Add project"
   - Name it "focus-app" (or anything you like)
   - Disable Google Analytics (optional)
   - Click "Create project"

2. **Enable Google Authentication**
   - In Firebase Console, click "Authentication" → "Get started"
   - Click on "Google" provider
   - Toggle "Enable"
   - Select your support email
   - Click "Save"

3. **Create Firestore Database**
   - Click "Firestore Database" → "Create database"
   - Select "Start in test mode"
   - Choose your region
   - Click "Enable"

4. **Get Your Firebase Config**
   - Click the gear icon ⚙️ → "Project settings"
   - Scroll to "Your apps"
   - Click the web icon `</>`
   - Register app with nickname "focus-web"
   - Copy the firebaseConfig object

5. **Create .env File**
   Create a file named `.env` in the project root with:
   
   ```env
   VITE_FIREBASE_API_KEY=your_actual_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

6. **Restart the Dev Server**
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

### Why It's Not Working:

The application requires Firebase for:
- ✅ Google OAuth authentication
- ✅ Firestore database for tasks, sessions, and leaderboard
- ✅ Real-time data synchronization

Without Firebase configuration, the app cannot:
- Sign in users
- Store any data
- Display leaderboard
- Save focus sessions

### After Setup:

Once you've added your Firebase config to `.env`:
1. The app will load at http://localhost:3000
2. You can sign in with Google
3. All features will work perfectly!

### Need Help?

See the detailed `SETUP.md` file for step-by-step screenshots and troubleshooting.
