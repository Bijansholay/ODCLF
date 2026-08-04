# ODCLF Forum Website

A fast, content-focused portal for the ODCLF Forum built with **Astro** (frontend) and **Sanity CMS** (content dashboard), deployable to **Vercel** for free.

---

## 📋 Officer Guide (Non-Technical)
This section is for future forum officers and editors to manage site content without touching code.

### 1. Accessing the Content Dashboard
The dashboard is hosted in the cloud. You do not need to download anything.
* **URL**: [https://odclf-forum.sanity.studio](https://odclf-forum.sanity.studio) *(replace with your deployed URL)*
* **Login**: Log in using the credentials (Google, GitHub, or Email) provided by the web administrator.

### 2. How to Add & Edit Content

#### A. News Post
1. Click **News Post** in the dashboard sidebar, then click the **pencil icon** or **"Create new"** button.
2. Fill in the fields:
   * **Title**: Enter the headline.
   * **Slug**: Click **Generate** (creates the URL for the post).
   * **Published At**: Set publication date (defaults to current time).
   * **Cover Image**: Upload a header image.
   * **Excerpt**: Write a brief 1-2 sentence summary (shown on the list page).
   * **Body**: Write the main text. You can format it with headers, bold text, links, or inline images.
3. Click the green **Publish** button at the bottom right.

#### B. Member Profile
1. Click **Member Profile** in the sidebar, then click **"Create new"**.
2. Fill in the fields:
   * **Name**: The full name of the officer.
   * **Role**: e.g., *President*, *Secretary*, *Treasurer*.
   * **Photo**: Upload a square headshot.
   * **Biography**: A short paragraph about them.
   * **Display Order**: Assign a number. Lower numbers show first (e.g. `1` for President, `2` for Vice President, `3` for Treasurer).
   * **Active Officer**: Checked for current officers. Uncheck this for past officers (they will move to the archive section instead of deleting).
3. Click **Publish**.

#### C. Publication
1. Click **Publication** in the sidebar, then click **"Create new"**.
2. Fill in the fields:
   * **Title**: The research paper or document title.
   * **Authors**: Click **"Add item"** to input author names in order.
   * **Published Date**: Select publication month and year.
   * **Abstract**: Paste the executive summary.
   * **PDF File**: Upload the official PDF document.
   * **Cover Image**: (Optional) Upload the paper's thumbnail or cover page.
3. Click **Publish**.

#### D. Event
1. Click **Event** in the sidebar, then click **"Create new"**.
2. Fill in the fields:
   * **Title**: Name of the event.
   * **Slug**: Click **Generate** to create the URL.
   * **Start Date & Time**: Set the date and time of the event.
   * **End Date & Time**: (Optional) Set the conclusion date and time.
   * **Location**: Enter room details, building, or a Zoom link.
   * **Description**: Write a description of what will take place.
   * **Event Image**: (Optional) Upload a flyer or graphic.
   * **Registration Link**: (Optional) If RSVPs are needed, paste your Google Form or Eventbrite URL.
3. Click **Publish**.

### 3. How the Site Updates (Auto-Deploy)
* When you click **Publish**, the site **does not** update instantly.
* A background webhook notifies **Vercel** that content has changed.
* Vercel automatically recreates the static pages.
* **Timeline**: Your updates will go live on the website in about **1 to 2 minutes**.

---

## 🛠️ Developer Setup & Deployment Guide

This section is for web administrators hosting or developing the site.

### 1. Local Development
Because of sandboxing limitations during initial project creation, you must run commands in your local computer terminal:

1. Clone or navigate to the workspace directory:
   ```bash
   cd /Users/Natech/Downloads/development/ODCLF
   ```
2. Install Astro frontend dependencies:
   ```bash
   npm install
   ```
3. Open another terminal window, navigate to the `studio` folder, and install Sanity Studio dependencies:
   ```bash
   cd studio
   │ npm install
   ```
4. Start local development servers:
   * **Astro Frontend**: Run `npm run dev` at the root directory. Accessible at `http://localhost:4321`.
   * **Sanity Studio**: Run `npm run dev` inside the `studio/` directory. Accessible at `http://localhost:3333`.

### 2. Environment Variables (`.env`)
Create a `.env` file in the root directory (based on `.env.template`):
```env
PUBLIC_SANITY_PROJECT_ID="your_sanity_project_id"
PUBLIC_SANITY_DATASET="production"
PUBLIC_SANITY_API_VERSION="2026-08-03"
```
To run the CMS locally, create `studio/.env`:
```env
SANITY_STUDIO_PROJECT_ID="your_sanity_project_id"
SANITY_STUDIO_DATASET="production"
```

### 3. Deploying Sanity Studio
Deploy Sanity Studio to their free hosting tier:
```bash
cd studio
npx sanity deploy
```
This yields a hosted dashboard URL where officers can log in.

### 4. Deploying Frontend to Vercel
1. Push this project folder to your GitHub repository.
2. Log into the **Vercel Dashboard** and click **Add New Project**.
3. Select your repository. Vercel will auto-detect Astro.
4. Add the following **Environment Variables** in the Vercel dashboard:
   * `PUBLIC_SANITY_PROJECT_ID`
   * `PUBLIC_SANITY_DATASET`
   * `PUBLIC_SANITY_API_VERSION` (use `2026-08-03`)
5. Click **Deploy**.

### 5. Hooking up Sanity Auto-Rebuild (Webhooks)
To rebuild the Astro site when officers publish changes:
1. Go to the **Vercel Project Dashboard** → **Settings** → **Git** → **Deploy Hooks**.
2. Create a new deploy hook named `Sanity CMS Rebuild` (pointing to the `main` branch). Copy the generated URL.
3. Go to the **Sanity Management Console** ([https://manage.sanity.io](https://manage.sanity.io)).
4. Select your project → Go to **API** tab → Scroll to **Webhooks** → click **Create Webhook**.
5. Configure the Webhook:
   * **Name**: Vercel Deploy Hook
   * **URL**: Paste the Vercel Deploy Hook URL copied in step 2.
   * **Dataset**: `production`
   * **Filter**: *Leave empty or use `_type in ["news", "member", "publication", "event"]`*
   * **Projections**: `_id`
   * **Trigger on**: `Create`, `Update`, `Delete`
6. Click **Save**. Now, every publish action triggers a fresh Vercel build.
