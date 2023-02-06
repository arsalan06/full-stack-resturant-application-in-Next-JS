import Footer from "@/components/Footer/Bottombar";
import Topbar from "@/components/Topbar/Topbar";
import "@/styles/globals.css";
import store from "redux/store";
import { Provider } from "react-redux";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Topbar />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </>
  );
}
