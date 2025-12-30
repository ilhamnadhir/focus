# Focus App - Troubleshooting Guide

## 🔧 If the Login Screen Stops Responding

If the login screen loaded but then stopped working, try these steps:

### 1. Hard Refresh the Browser
Press `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac) to do a hard refresh and clear the browser cache.

### 2. Clear Browser Cache
1. Open browser DevTools (`F12`)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

### 3. Check Browser Console for Errors
1. Press `F12` to open DevTools
2. Click on the "Console" tab
3. Look for any red error messages
4. If you see errors, let me know what they say

### 4. Try a Different Browser
Sometimes browser extensions or settings can interfere. Try:
- Chrome
- Firefox
- Edge

### 5. Restart the Development Server
```powershell
# Stop the server (Ctrl + C in the terminal)
# Then run:
npm run dev
```

### 6. Clear All Caches and Restart
```powershell
# Stop the server first (Ctrl + C)
Remove-Item -Recurse -Force node_modules\.vite
npm run dev
```

## 🐛 Common Issues

### Issue: Page is blank or stuck on "Loading..."
**Solution**: Check if the server is running. You should see:
```
VITE v7.3.0  ready in XXX ms
➜  Local:   http://localhost:5173/
```

### Issue: "Sign in with Google" button doesn't work
**Solution**: 
1. Open browser console (F12)
2. Check for JavaScript errors
3. Make sure you're clicking the button (not just hovering)

### Issue: Page loads but nothing happens when clicking
**Solution**: This might be a CSS issue. Try:
1. Hard refresh (`Ctrl + Shift + R`)
2. Check if JavaScript is enabled in your browser
3. Disable browser extensions temporarily

## ✅ Expected Behavior

When working correctly:
1. You should see the login page with a 🎯 icon
2. The "Sign in with Google" button should be clickable
3. After clicking, you should be redirected to the Dashboard
4. The navbar should appear at the top

## 📞 Need More Help?

If none of these work, please provide:
1. What browser you're using
2. Any error messages from the console (F12)
3. What happens when you click the button (nothing, error, etc.)
