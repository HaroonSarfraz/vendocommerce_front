import { Provider } from "react-redux";
import { Inter } from "next/font/google";
import store from "@/src/store";
import "@/styles/globals.css";
import "@/styles/style.css";
import Layout from "@/src/layouts/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <div className={inter.className}>
      <Layout>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Layout>
    </div>
  );
}
