import Head from "next/head";

interface SeoProps {
  title: string;
  og: {
    title: string;
    image: string;
    description: string;
  };
}
const Seo = ({ title, og }: SeoProps) => {
  return (
    <Head>
      <title>{`${title} | Jindun Movie Web`}</title>
      <meta property="og:title" content={og.title} />
      <meta property="og:image" content={og.image} />
      <meta property="og:description" content={og.description} />
      <meta property="og:site_name" content="Jindun Movie Web" />
      <meta property="og:locale" content="ko_KR" />
    </Head>
  );
};

export default Seo;
