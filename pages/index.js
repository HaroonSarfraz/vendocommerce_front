import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    user?.access_token
      ? router.push("/dashboard")
      : router.push("/login");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
