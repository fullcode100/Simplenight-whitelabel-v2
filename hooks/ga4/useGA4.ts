import { useCallback } from 'react';

export const useGA4 = () => {
  const GA4_TRACKING_ID: string = process.env.NEXT_PUBLIC_GA_ID ?? '';

  // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
  const trackPageView = useCallback((url: string) => {
    if (window?.gtag) {
      window.gtag('config', GA4_TRACKING_ID, {
        page_path: url,
      });
    } else {
      console.warn('Gtag is not ready');
    }
  }, []);

  // https://developers.google.com/analytics/devguides/collection/gtagjs/events
  const trackEvent = useCallback(
    ({
      action,
      category,
      label,
      value,
    }: {
      action: string;
      category: string;
      label: string;
      value: string;
    }) => {
      if (window?.gtag) {
        window.gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value,
        });
      } else {
        console.warn('Gtag is not ready');
      }
    },
    [],
  );

  return { trackPageView, trackEvent, GA4_TRACKING_ID };
};
