# Encore Me

> Turning listeners into participants, one song request at a time.

**Encore Me** is a platform designed for street performers, buskers, and live musicians to engage their audiences in a new way. Instead of just listening, your audience can actively participate by requesting songs from your setlist, creating a more interactive and memorable performance experience.

## Concept

Street performers and live musicians face a common challenge: keeping audiences engaged long enough to build a connection. While great music can make people stop to listen, we give them another reason to stay and interact.

## Features

<p align="center">
  <img src="frontend/public/images/busking_ensemble_1600w.webp" width="80%" />
</p>

### Interactive Setlists
Encore Me allows performers to create **curated setlists** that audiences can browse and request songs from in real-time. Musicians maintain creative control while giving their audience a voice in the performance.

### QR Code Integration
Each performer gets an **auto-generated QR code** linked to their setlist. Display it on a sign, music stand, or screen while busking, gigging, or livestreaming. Audience members simply scan to access your song menu.

### Song Management
Musicians can organize their repertoire into:
* **Songs:** Individual tracks with metadata (title, genre, tempo, description)
* **Sets:** Curated collections of songs for different venues or moods
* **Acts:** Band or group profiles that multiple musicians can collaborate on

### Request System
Audience members can:
* Browse available songs in your current setlist
* View song details (genre, tempo, description)
* Submit song requests directly to the performer
* Set suggested tips for their requests (coming soon)

## Tech Stack

### Frontend
* **Next.js 15** with App Router
* **React 19** with Server Components
* **TypeScript** for type safety
* **Tailwind CSS** for styling
* Deployed on **Vercel**

### Backend
* **Vercel Serverless Functions** for API endpoints
* **Vercel Postgres** for database
* **JWT authentication** for secure access
* **Joi validation** for request validation