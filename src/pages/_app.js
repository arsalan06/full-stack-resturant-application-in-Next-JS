import Footer from "@/components/Footer/Bottombar";
import Topbar from "@/components/Topbar/Topbar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Topbar />
      <Component {...pageProps} />
      <Footer/>
    </>
  );
}
