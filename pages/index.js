import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    user?.auth_token
      ? user.user_data.u_type === 1
        ? router.push("/users")
        : router.push("/sales-analytics/sales")
      : router.push("/login");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
