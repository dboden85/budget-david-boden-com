
import "@/styles/globals.css";
import '../style.scss';
import {useState} from 'react';

export default function App({ Component, pageProps }) {

  return (
      <Component {...pageProps} />
  )
}
