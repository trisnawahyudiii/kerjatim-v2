import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const secret = process.env.NEXTAUTH_SECRET;

    console.log("secret: ", secret);
    const token = await getToken({ req, secret });

    console.log("token", token);

    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/authenticate");

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return null;
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/authenticate?from=${encodeURIComponent(from)}`, req.url),
      );
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  },
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/authenticate",
    "/onboarding",
    "/onboarding/:path*",
  ],
};
