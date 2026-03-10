import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { getOAuth2Client } from "@/lib/google";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const { name, email, startTime, endTime } = await req.json();

    if (!name || !email || !startTime || !endTime) {
      return NextResponse.json(
        { error: "Name, email, start time, and end time are required" },
        { status: 400 }
      );
    }

    const session = await getSession();

    if (!session.googleAccessToken) {
      return NextResponse.json(
        { error: "Google Calendar not connected", authUrl: "/api/auth/google" },
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

    const event = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: `Dental Appointment - ${name}`,
        description: `Patient: ${name}\nEmail: ${email}\n\nBooked via Savvy Dental Clinic website.`,
        start: {
          dateTime: startTime,
          timeZone: "Asia/Riyadh",
        },
        end: {
          dateTime: endTime,
          timeZone: "Asia/Riyadh",
        },
        attendees: [{ email }],
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 60 },
            { method: "popup", minutes: 30 },
          ],
        },
      },
    });

    return NextResponse.json({
      success: true,
      eventId: event.data.id,
    });
  } catch (error) {
    console.error("Calendar booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
