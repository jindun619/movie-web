import type { AppProps } from "next/app";

import { RecoilRoot } from "recoil";

import Layout from "@/components/Layout";

import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Layout data-theme="dark">
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
};

export default App;
