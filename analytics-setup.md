## Google Analytics & Firebase Analytics Setup

This project contains **two apps**:

- **Web app (Vite + React)** in the root folder  
- **Mobile app (Expo + expo-router)** inside the `app` folder  

Follow the sections below to add analytics to both.

---

## 1. Web App – Google Analytics 4 (GA4)

### 1.1. Prerequisites in Google Analytics

1. Go to the Google Analytics admin panel and create a **GA4 property** (or open an existing one).
2. Create a **Web data stream** for your site domain.
3. Copy the **Measurement ID** (looks like `G-XXXXXXXXXX`).  
   You will use it as `G-XXXXXXX` in the steps below.

---

### 1.2. Add the GA ID to environment variables

1. In the **project root** (same level as `package.json`), create a file named `.env` if it does not exist.
2. Add this line (replace with your real Measurement ID):

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXX
```

3. Restart the dev server after changing env variables:

```bash
npm run dev
```

---

### 1.3. Inject the GA script into `index.html`

1. Open `index.html` in the **project root**.
2. Inside the `<head>` tag, add the GA script.  
   Replace `G-XXXXXXX` with **the same value** you used in `.env`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  // Disable automatic page_view; we'll send SPA views manually
  gtag('config', 'G-XXXXXXX', { send_page_view: false });
</script>
```

> If you prefer, you can inject the ID from `import.meta.env` at build time,
> but using the literal ID here is usually fine.

---

### 1.4. Create a small analytics helper for the web app

1. Create a new file `src/lib/analytics.ts`:

```ts
// src/lib/analytics.ts
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function trackPageView(path: string) {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
  });
}

export function trackEvent(
  action: string,
  params?: Record<string, any>
) {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  window.gtag('event', action, params);
}
```

---

### 1.5. Track page views with React Router

1. Open `src/App.tsx`.
2. Update it to listen to route changes and call `trackPageView`:

```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { trackPageView } from "./lib/analytics";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnalyticsListener = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnalyticsListener />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
```

Now every route change in the web app sends a **page_view** event to GA4.

---

## 2. Mobile App (Expo) – Firebase / Google Analytics

The Expo app in the `app` folder uses **React Native**.  
The usual approach is to use **Firebase Analytics**, which connects to **Google Analytics 4**.

You can use either:

- **`expo-firebase-analytics`** (simpler for managed Expo), or  
- **`@react-native-firebase/analytics`** (more advanced, more setup).

Below are high-level steps using `expo-firebase-analytics`.

---

### 2.1. Create a Firebase project & link to GA

1. Go to the Firebase console and create a **Firebase project**.
2. During setup, **enable Google Analytics** for the project.
3. In Firebase, add:
   - An **iOS app** if you build for iOS.
   - An **Android app** if you build for Android.
4. Download and add the required config files to the Expo app:
   - `GoogleService-Info.plist` for iOS.
   - `google-services.json` for Android.

Consult the official Expo docs for the exact paths and config:
`https://docs.expo.dev/guides/using-firebase/`

---

### 2.2. Install `expo-firebase-analytics`

From the **`app` folder** (where the Expo app lives):

```bash
cd app
npm install expo-firebase-analytics
```

---

### 2.3. Initialize analytics in the Expo app

1. Create a helper file, e.g. `app/src/lib/analytics.ts`:

```ts
// app/src/lib/analytics.ts
import * as Analytics from "expo-firebase-analytics";

export async function logScreenView(screenName: string) {
  try {
    await Analytics.logEvent("screen_view", {
      screen_name: screenName,
    });
  } catch (e) {
    // optionally handle/log error
  }
}

export async function logEvent(
  name: string,
  params?: Record<string, any>
) {
  try {
    await Analytics.logEvent(name, params);
  } catch (e) {
    // optionally handle/log error
  }
}
```

2. Make sure your Firebase / GA project is configured correctly so events appear in the GA4 dashboard.

---

### 2.4. Track screen views with `expo-router`

1. Open `app/app/_layout.tsx`.
2. You can hook into navigation state using `useRootNavigationState` and `useSegments`
   (see `expo-router` docs) or log a simple screen view in your main screens.

Example (basic usage inside a screen component):

```tsx
import { useEffect } from "react";
import { logScreenView } from "../src/lib/analytics";

export default function IndexScreen() {
  useEffect(() => {
    logScreenView("Home");
  }, []);

  // ...rest of your component
}
```

For more advanced integration with `expo-router`, see:
`https://expo.github.io/router/docs/guides/analytics/`

---

## 3. Verifying That Events Are Received

1. **Web app**:
   - Run `npm run dev`.
   - Open the site in your browser.
   - In GA4, go to **Admin → DebugView** or **Reports → Realtime** and verify `page_view` events.

2. **Expo app**:
   - Run `npm run start` (or `npm run android` / `npm run ios`) from the `app` folder.
   - Use a real device or emulator.
   - In GA4 / Firebase Analytics DebugView, confirm events like `screen_view` arrive.

If you share your **Measurement IDs** and Firebase configuration details, you can wire both apps exactly and test end to end.


