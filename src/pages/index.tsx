import { useEffect } from "react";
import { useRouter } from "next/router";

export const IndexPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  }, []);

  return <h1>Loading..</h1>;
};

export default IndexPage;
