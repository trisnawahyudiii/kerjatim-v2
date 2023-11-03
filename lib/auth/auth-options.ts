import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

// PRISMA_ADAPTER
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "lib";
import { AuthOptions } from "next-auth";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID ?? "",
      clientSecret: GOOGLE_CLIENT_SECRET ?? "",
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.picture,
        };
      }

      return session;
    },

    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      console.log("jwt callback || dbUser: ", dbUser);

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        console.log("user not found, returning token : ", token);
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
  pages: {
    signIn: "/authenticate",
    verifyRequest: "/authenticate?verify-request=true",
    newUser: "/onboarding",
    error: "/authenticate/error",
  },
};
