import { NextRequest, NextResponse } from "next/server";
import { getOAuth2Client } from "@/lib/google";
import { getSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "Authorization code is missing" },
        { status: 400 }
      );
    }

    const client = getOAuth2Client();
    const { tokens } = await client.getToken(code);

    const session = await getSession();
    session.googleAccessToken = tokens.access_token || undefined;
    session.googleRefreshToken = tokens.refresh_token || undefined;
    session.googleTokenExpiry = tokens.expiry_date || undefined;
    await session.save();

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return NextResponse.redirect(`${appUrl}/#booking`);
  } catch (error) {
    console.error("OAuth callback error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
