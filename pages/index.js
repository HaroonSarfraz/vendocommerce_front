import { useEffect } from "react";
import { useRouter } from "next/router";
import { isClient } from "@/src/helpers/isClient";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(isClient ? localStorage.getItem("user") : {});

    user?.access_token
      ? user.role === "User"
        ? router.push("/dashboard")
        : router.push("/brands")
      : router.push("/login");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
