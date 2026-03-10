import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { getOAuth2Client } from "@/lib/google";
import { getSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  try {
    const dateParam = req.nextUrl.searchParams.get("date");

    if (!dateParam) {
      return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 }
      );
    }

    const session = await getSession();

    if (!session.googleAccessToken) {
      return NextResponse.json(
        {
          error: "Google Calendar not connected",
          authUrl: "/api/auth/google",
        },
        { status: 401 }
      );
    }

    const client = getOAuth2Client();
    client.setCredentials({
      access_token: session.googleAccessToken,
      refresh_token: session.googleRefreshToken,
    });

    // Refresh token if expired
    if (session.googleTokenExpiry && Date.now() >= session.googleTokenExpiry) {
      const { credentials } = await client.refreshAccessToken();
      session.googleAccessToken = credentials.access_token || undefined;
      session.googleTokenExpiry = credentials.expiry_date || undefined;
      await session.save();
      client.setCredentials(credentials);
    }

    const calendar = google.calendar({ version: "v3", auth: client });
    const calendarId =
      process.env.GOOGLE_CALENDAR_ID || "primary";

    const startOfDay = new Date(`${dateParam}T08:00:00`);
    const endOfDay = new Date(`${dateParam}T18:00:00`);

    // Get free/busy information
    const freeBusy = await calendar.freebusy.query({
      requestBody: {
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        items: [{ id: calendarId }],
      },
    });

    const busySlots =
      freeBusy.data.calendars?.[calendarId]?.busy || [];

    // Generate 1-hour slots from 8 AM to 5 PM
    const slots = [];
    for (let hour = 8; hour < 17; hour++) {
      const slotStart = new Date(`${dateParam}T${hour.toString().padStart(2, "0")}:00:00`);
      const slotEnd = new Date(`${dateParam}T${(hour + 1).toString().padStart(2, "0")}:00:00`);

      // Skip slots in the past
      if (slotStart < new Date()) continue;

      // Check if slot conflicts with busy times
      const isBusy = busySlots.some((busy) => {
        const busyStart = new Date(busy.start!);
        const busyEnd = new Date(busy.end!);
        return slotStart < busyEnd && slotEnd > busyStart;
      });

      if (!isBusy) {
        const displayStart = slotStart.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        const displayEnd = slotEnd.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

        slots.push({
          start: slotStart.toISOString(),
          end: slotEnd.toISOString(),
          display: `${displayStart} - ${displayEnd}`,
        });
      }
    }

    return NextResponse.json({ slots });
  } catch (error) {
    console.error("Calendar slots error:", error);
    return NextResponse.json(
      { error: "Failed to fetch available slots" },
      { status: 500 }
    );
  }
}
