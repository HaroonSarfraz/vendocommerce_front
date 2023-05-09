import { cookies } from "@/src/constants/cookies";
import { NextResponse } from "next/server";

const authorize =
  (action) =>
  async (req, res, { breakAll }) => {
    const url = req.nextUrl;
    const tokenPresent = !!req.cookies.get(cookies["TOKEN"])?.value;
    if (action === "reverse" && tokenPresent) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    if (tokenPresent) {
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
