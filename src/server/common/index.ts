import { NEXTAUTH_SECRET } from "@/config/environments";
import { decode } from "next-auth/jwt";
import { cookies as nextCookies } from "next/headers";

export const getNextAuthSessionToken = async () => {
  const cookies = await nextCookies();
  const sessionToken = cookies.get("next-auth.session-token");
  if (sessionToken?.value) {
    const token = await decode({
      token: sessionToken.value,
      secret: NEXTAUTH_SECRET,
    });
    return token;
  }
};
