import "@/styles/globals.css";
import '../style.scss';
import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script>
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
      </Script>
      <Component {...pageProps} />
    </>
  )
}
