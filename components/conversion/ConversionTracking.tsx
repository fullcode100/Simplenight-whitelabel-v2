import Head from 'next/head';
import Script from 'next/script';

import useBog from 'hooks/bog/useBog';

export const ConversionTracking = (): JSX.Element | null => {
  const { isBog } = useBog();
  if (!isBog) return null;
  return (
    <Head>
      <>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-711765415"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", "UA-41864771-1");
            gtag("config", "AW-711765415");
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
