# Savvy Dental Clinic

A production-ready Next.js 14 business website for Savvy Dental Clinic, featuring a Google Calendar booking system, AI-powered chatbot, 3D animations, and a fully responsive design.

## Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **3D/Animations:** Three.js, @react-three/fiber, @react-three/drei, GSAP + ScrollTrigger, Framer Motion
- **AI Chatbot:** Anthropic SDK (Claude claude-haiku-4-5-20251001)
- **Booking:** Google Calendar API + iron-session
- **UI:** react-hot-toast, react-datepicker

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Anthropic API key for the AI chatbot
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Google OAuth credentials (for Calendar booking)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# The Google Calendar ID to create bookings in
GOOGLE_CALENDAR_ID=your_calendar_id@group.calendar.google.com

# Secret for iron-session cookie encryption (generate a random 32+ char string)
NEXTAUTH_SECRET=your_random_secret_string_here

# Your app URL (update when deploying to Vercel)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### How to get each key

1. **ANTHROPIC_API_KEY**: Sign up at [console.anthropic.com](https://console.anthropic.com/) and create an API key.

2. **GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a project, enable the Google Calendar API
   - Create OAuth 2.0 credentials (Web application type)
   - Add `http://localhost:3000/api/auth/callback` as an authorized redirect URI
   - For production, add your Vercel URL as well

3. **GOOGLE_CALENDAR_ID**: Found in Google Calendar settings under the specific calendar's "Integrate calendar" section.

4. **NEXTAUTH_SECRET**: Generate with `openssl rand -base64 32`

5. **NEXT_PUBLIC_APP_URL**: Set to `http://localhost:3000` for local dev, update to your Vercel deployment URL for production.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Single-page scrollable homepage** with sticky navigation
- **3D animated hero** with particle field and floating geometry (disabled on mobile for performance)
- **GSAP ScrollTrigger** animations on all sections
- **Framer Motion** micro-interactions on buttons and links
- **Google Calendar booking** with date picker, time slot grid, and confirmation modal
- **AI chatbot** powered by Claude claude-haiku-4-5-20251001 with streaming responses
- **Dark/light mode** toggle with localStorage persistence
- **Contact form** with client-side validation
- **FAQ accordion** section
- **Testimonials carousel** with auto-play
- **Custom animated cursor** on desktop
- **Scroll progress bar** and back-to-top button
- **SEO optimized** with meta tags, Open Graph, and JSON-LD schema
- **Custom 404 page**

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Import the repository in Vercel
3. Add all environment variables in Vercel project settings
4. Update `NEXT_PUBLIC_APP_URL` to your Vercel deployment URL
5. Update Google OAuth redirect URIs to include the Vercel URL
