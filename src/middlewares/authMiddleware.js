import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function withAuth(Component) {
  return () => {
    const router = useRouter();

    useEffect(() => {
      // Check if the user is authenticated
      const isAuthenticated = Cookies.get("token") // Replace this with your actual authentication logic


      // If the user is not authenticated, redirect to the login page
      if (!isAuthenticated) {
        router.replace("/login");
      }
    }, []);

    return <Component />;
  };
}
