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