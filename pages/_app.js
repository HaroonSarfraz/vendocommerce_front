import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import Layout from "@/src/layouts/Layout";
import store from "@/src/store";
import "@/styles/globals.css";

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
