import { useEffect } from "react";
import { useRouter } from "next/router";

export default function IndexPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  }, []);

  return <h1>being redirected..</h1>;
}
