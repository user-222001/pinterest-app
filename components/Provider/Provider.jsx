import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserAuth } from "../UserAuthContext";

export default function Provider(Component) {
  return function Protect({ ...props }) {
    const router = useRouter();
    const { user } = useUserAuth();

    useEffect(() => {
      !user ? router.push("./") : null;
    }, [user, router]);

    return <Component {...props} />;
  };
}
