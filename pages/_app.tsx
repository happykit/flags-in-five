import "../styles/globals.css";
import "../flags.config";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
