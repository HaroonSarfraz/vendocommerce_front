import { cookies } from "@/src/constants/cookies";
import { NextResponse } from "next/server";

const authorize =
  (action) =>
  async (req, res, { breakAll }) => {
    const url = req.nextUrl;
    const tokenCookie = req.cookies.get(cookies["TOKEN"])?.value;
    if (action === "reverse" && !!tokenCookie) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    const success = !!tokenCookie;
    if (success) {
      return res;
    } else {
      if (action === "reverse") {
        return res;
      } else {
        url.search = `?from=${url.pathname}`;
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
    }
  };

export default authorize;
