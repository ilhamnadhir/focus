# 🚀 Quick Setup Guide

## Step 1: Firebase Setup (5 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `focus-app` (or your preferred name)
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In Firebase Console, click "Authentication" in the left sidebar
2. Click "Get started"
3. Click on "Google" sign-in provider
4. Toggle "Enable"
5. Select a support email
6. Click "Save"

## Step 3: Create Firestore Database

1. Click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Select "Start in **test mode**" (for development)
4. Choose a location (closest to you)
5. Click "Enable"

## Step 4: Get Firebase Configuration

1. Click the gear icon ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps"
4. Click the web icon `</>`
5. Register app with nickname: `focus-web`
6. Copy the `firebaseConfig` object values

## Step 5: Configure Environment Variables

1. In your project folder, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and paste your Firebase config:
   ```env
   VITE_FIREBASE_API_KEY=AIza...
   VITE_FIREBASE_AUTH_DOMAIN=focus-app-xxxxx.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=focus-app-xxxxx
   VITE_FIREBASE_STORAGE_BUCKET=focus-app-xxxxx.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```

## Step 6: Run the Application

```bash
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Step 7: Test the Application

1. Click "Sign in with Google"
2. Select your Google account
3. You'll be redirected to the Dashboard
4. Try creating a task
5. Start a focus session
6. Check the leaderboard

## 🎉 You're Done!

Your Focus app is now running locally with full functionality.

## Production Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Add environment variables from your `.env` file
6. Click "Deploy"

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `dist` folder
4. Add environment variables in Site settings
5. Redeploy

## Firestore Security Rules (Production)

Before going to production, update Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read all user profiles
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Users can only read/write their own tasks
    match /tasks/{taskId} {
      allow read, write: if request.auth != null && 
                            resource.data.userId == request.auth.uid;
      allow create: if request.auth != null;
    }
    
    // Users can only write their own focus sessions
    match /focusSessions/{sessionId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
                               resource.data.userId == request.auth.uid;
    }
  }
}
```

## Troubleshooting

### "Firebase: Error (auth/unauthorized-domain)"
- Go to Firebase Console > Authentication > Settings > Authorized domains
- Add your deployment domain (e.g., `your-app.vercel.app`)

### "Missing or insufficient permissions"
- Check Firestore rules
- Ensure you're signed in
- Verify userId matches in database

### Build errors
- Delete `node_modules` and run `npm install` again
- Clear cache: `npm cache clean --force`

## Need Help?

- Check the [README.md](README.md) for detailed documentation
- Review Firebase documentation: [firebase.google.com/docs](https://firebase.google.com/docs)
