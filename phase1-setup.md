# Phase 1: Project Setup and Environment Configuration

This guide will walk you through setting up the development environment for the ADHD Executive Function Skills app.

## Prerequisites
You'll need to install a few tools on your computer:

1. **Node.js and npm** - The JavaScript runtime and package manager
2. **Visual Studio Code** - A user-friendly code editor
3. **Git** - For version control (optional but recommended)

## Step 1: Install Node.js and npm

1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the LTS (Long Term Support) version
3. Run the installer and follow the prompts
4. To verify installation, open a command prompt or terminal and type:
   ```
   node -v
   npm -v
   ```
   Both commands should display version numbers if installation was successful.

## Step 2: Install Visual Studio Code

1. Go to [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Download the version for your operating system
3. Run the installer and follow the prompts
4. Recommended extensions to install in VS Code:
   - Arabic Language Pack (if needed)
   - ES7+ React/Redux/React-Native snippets
   - Prettier - Code formatter
   - ESLint

## Step 3: Set Up Firebase Account

1. Go to [https://firebase.google.com/](https://firebase.google.com/)
2. Click "Get Started" and sign in with a Google account
3. Click "Add project" and give it a name (e.g., "adhd-efs-app")
4. Disable Google Analytics for this project (simpler for now) and click "Create project"
5. Wait for the project to be created and click "Continue"

## Step 4: Create a New React Project

1. Open a command prompt or terminal
2. Navigate to the folder where you want to create your project
3. Run the following commands:

```bash
npx create-react-app adhd-efs-app --template pwa-typescript
cd adhd-efs-app
```

This creates a new React application with Progressive Web App features and TypeScript for better code reliability.

## Step 5: Install Required Packages

In the project directory, run:

```bash
npm install firebase @mui/material @mui/icons-material @emotion/react @emotion/styled @mui/lab @mui/x-date-pickers react-router-dom i18next react-i18next
```

This installs:
- Firebase for backend services
- Material UI for accessible user interface components
- React Router for navigation
- i18next for Arabic language support

## Step 6: Configure Firebase in Your Project

1. In the Firebase console, click on the gear icon next to "Project Overview" and select "Project settings"
2. Scroll down to "Your apps" section and click the web icon (</>) 
3. Register your app with a nickname (e.g., "adhd-efs-web-app")
4. Copy the Firebase configuration code
5. In your project, create a new file at `src/firebase.ts` with the following content:

```typescript
// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Replace the placeholders with your Firebase configuration values

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

export default app;
```

## Step 7: Set Up Arabic Language Support

1. Create a new folder: `src/locales`
2. Create two files in this folder:
   - `ar.json` for Arabic translations
   - `en.json` for English translations (as a fallback)

3. In `src/locales/ar.json`, add:

```json
{
  "app": {
    "title": "تطبيق مهارات الوظائف التنفيذية"
  },
  "dashboard": {
    "title": "لوحة التحكم",
    "tasks": "المهام",
    "upcomingTasks": "المهام القادمة",
    "focus": "حصة تركيز"
  },
  "taskManagement": {
    "title": "إدارة المهام",
    "newTask": "مهمة جديدة",
    "priority": "الأولوية",
    "dueDate": "تاريخ الاستحقاق"
  },
  "navigation": {
    "dashboard": "لوحة التحكم",
    "tasks": "إدارة المهام",
    "taskDetails": "تفاصيل المهمة",
    "calendar": "المفكرة",
    "focusSession": "حصة تركيز",
    "courses": "مدونة المقررات",
    "achievements": "مؤشرات إنجازاتي"
  }
}
```

4. Create a new file: `src/i18n.ts` with the following content:

```typescript
// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import arTranslation from './locales/ar.json';
import enTranslation from './locales/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        translation: arTranslation
      },
      en: {
        translation: enTranslation
      }
    },
    lng: 'ar', // Set Arabic as the default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already safes from XSS
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
```

## Step 8: Create the Basic App Structure

1. In `src/index.tsx`, update the file to include the i18n configuration:

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n'; // Import language configuration

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

2. Create a basic app layout in `src/App.tsx`:

```typescript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, rtlCache } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import CssBaseline from '@mui/material/CssBaseline';
import { useTranslation } from 'react-i18next';

// Import pages (will create these next)
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

// Create RTL cache for Arabic
const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// Create theme with RTL direction
const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Tajawal, Roboto, "Helvetica Neue", sans-serif',
  },
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  const { t } = useTranslation();

  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            {/* We'll add more routes as we develop other pages */}
          </Routes>
        </Router>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
```

3. Create basic page components structure:

```bash
mkdir -p src/pages src/components src/hooks src/contexts
```

4. Create a placeholder login page at `src/pages/Login.tsx`:

```typescript
import React from 'react';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('login.title', 'تسجيل الدخول')}</h1>
      {/* We'll implement the login form later */}
    </div>
  );
};

export default Login;
```

5. Create a placeholder dashboard page at `src/pages/Dashboard.tsx`:

```typescript
import React from 'react';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('dashboard.title', 'لوحة التحكم')}</h1>
      {/* We'll implement the dashboard later */}
    </div>
  );
};

export default Dashboard;
```

## Step 9: Start the Development Server

Run the following command in your project directory:

```bash
npm start
```

This will start the development server and open your app in your default browser at [http://localhost:3000](http://localhost:3000).

## Next Steps

Once you have the project environment set up, we'll move on to:
1. Creating the user authentication system
2. Building the app layout and navigation
3. Implementing the first feature: لوحة التحكم (Dashboard)
