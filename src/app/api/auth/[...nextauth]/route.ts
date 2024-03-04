import {
  SALESFORCE_CLIENT_ID,
  SALESFORCE_CLIENT_SECRET,
} from "@/config/environments";
import NextAuth from "next-auth";
import SalesforceProvider from "next-auth/providers/salesforce";

const handler = NextAuth({
  providers: [
    SalesforceProvider({
      clientId: SALESFORCE_CLIENT_ID,
      clientSecret: SALESFORCE_CLIENT_SECRET,
      idToken: false,
      authorization: {
        params: {
          scope: "",
        },
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return { ...session, access_token: token.access_token };
    },
    jwt: ({ token, account }) => {
      return account || token;
    },
  },
});

export { handler as GET, handler as POST };
