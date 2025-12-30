# Focus - Productivity Timer Web App

A modern, production-ready focus and productivity tracking application built with React, featuring a beautiful neumorphic UI design. Track your focus sessions with Pomodoro timers, manage tasks, and compete on the global leaderboard.

## Features

- 🎯 **Pomodoro Timer** - Focus sessions with 25:5 or 50:10 presets
- ✅ **Task Management** - Create, complete, and organize your to-dos
- 🏆 **Global Leaderboard** - Compete with users worldwide
- 🔐 **Mock Authentication** - Demo sign-in for local development
- 💾 **Data Persistence** - All data stored in browser localStorage
- 🎨 **Neumorphic Design** - Beautiful, modern UI with smooth animations

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom neumorphic design system
- **Animations**: Framer Motion
- **Storage**: Browser localStorage (no backend required)
- **Routing**: React Router v6

## Getting Started

### Prerequisites

- Node.js 18+ or 20+ (LTS recommended) and npm
- **Note**: Node.js v24 may have compatibility issues with Vite

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd focus
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Troubleshooting

### Server Crashes on Startup

If you encounter a crash with error `BK3b2jBa.js:25915:23`, try:

1. **Use Node.js LTS version** (v20.x or v18.x instead of v24.x)
2. Clear cache and reinstall:
   ```bash
   Remove-Item -Recurse -Force node_modules, node_modules\.vite
   npm install
   ```

## Data Storage

All data is stored in browser localStorage with the following keys:

**focusUser** - Current user information
```javascript
{
  uid: string,
  email: string,
  displayName: string,
  photoURL: string,
  totalFocusTime: number, // in seconds
  createdAt: string
}
```

**focusSessions** - Array of focus sessions
```javascript
[{
  userId: string,
  duration: number, // in seconds
  date: string, // YYYY-MM-DD
  timestamp: string
}]
```

**focusTasks** - Array of tasks
```javascript
[{
  id: string,
  userId: string,
  title: string,
  completed: boolean,
  createdAt: string
}]
```

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables in Vercel dashboard

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify

3. Add environment variables in Netlify dashboard

## Project Structure

```
focus/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable neumorphic components
│   │   ├── auth/            # Authentication components
│   │   └── layout/          # Layout components (Navbar)
│   ├── pages/               # Main application pages
│   ├── contexts/            # React Context providers
│   ├── hooks/               # Custom React hooks
│   ├── config/              # Configuration files
│   ├── styles/              # Global styles
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── public/                  # Static assets
└── package.json
```

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
