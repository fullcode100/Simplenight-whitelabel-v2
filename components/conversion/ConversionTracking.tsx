import Head from 'next/head';
import Script from 'next/script';

import useBog from 'hooks/bog/useBog';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGA4 } from 'hooks/ga4/useGA4';

export const ConversionTracking = (): JSX.Element | null => {
  const { isBog } = useBog();
  const { trackPageView, GA4_TRACKING_ID } = useGA4();

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, trackPageView]);

  if (!isBog) return null;

  return (
    <Head>
      <>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_TRACKING_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", "UA-41864771-1");
            gtag("config", ${GA4_TRACKING_ID});
          `}
        </Script>
        <Script id="microsoft-uet">
          {`
            (function(w,d,t,r,u){
              var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"211011887"};
              o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},
              n=d.createElement(t),
              n.src=r,
              n.async=1,
              n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},
              i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","//bat.bing.com/bat.js","uetq");
            `}
        </Script>
      </>
    </Head>
  );
};
