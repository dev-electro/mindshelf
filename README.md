# MindShelf

> A 100% free, zero-hosting AI bookmark manager, tag organizer, and active knowledge library built purely on **Google Gemini**, **Google Sheets**, **Gemini Notebook (NotebookLM)**, and **Google Apps Script**.

Inspired by [Karakeep](https://github.com/karakeep-app/karakeep) and the broader wave of AI-powered bookmark keepers, memory managers, and PKM tools that either lock features behind monthly SaaS subscriptions, require self-hosting Docker stacks, or demand an active external AI API key—**MindShelf** gives you the full AI curation + visual web app experience using only the Google account you already have.

---

## Why MindShelf?

- **Zero Hosting, Zero Extra API Bills**: No VPS, no Docker containers, no database maintenance, and no separate OpenAI/Anthropic API subscription required.
- **No "Read-It-Later Graveyard"**: Classifies every save by intent (`To Read`, `To Try`, `To Study`, `Reference`) and includes a built-in **Active Recall Quiz** mode.
- **No AI Tag Sprawl**: Reuses your existing canonical tags (80% semantic match rule) instead of generating hundreds of noisy one-off labels.
- **Anti-Link-Rot Snapshots**: Saves key facts, commands, and takeaways directly into your Sheet so knowledge survives even if the original webpage goes offline.
- **Strict Bookmark-Only Grounding**: When you ask Gemini about your saved topics, it answers strictly from your library first without mixing in generic web noise.
- **Responsive Web & Mobile UI**: Clean dark/light card gallery with automatic OpenGraph/YouTube/SVG preview thumbnails, collapsible sidebar, instant search (`/`), and a native-style mobile bottom bar.

---

## Setup Guide

### Option A: 1-Prompt Gemini Auto-Setup (Easiest)
You don't have to configure anything manually—let Gemini do the setup for you:
1. Download this repository as a `.zip` file (or upload `skill/SKILL.md` / the repo `.zip` into a Gemini chat).
2. Prompt Gemini:
   > *"Set up MindShelf from this zip: install `skill/SKILL.md` as my skill, create my `MindShelf Bookmarks` Google Sheet with the required columns, and create my `MindShelf Library` Notebook."*
3. Once Gemini creates your Sheet, follow **Step 2** below to deploy the visual Web UI in 2 minutes.

### Option B: Manual Setup

#### Step 1: Import the Gemini Skill
1. Open **Gemini → Skills** (or Gems) and create a new skill.
2. Copy the contents of [`skill/SKILL.md`](skill/SKILL.md) into the skill instructions and save it.
3. Test it in any chat by pasting a link and saying: *"Bookmark this in MindShelf"*. Gemini will automatically create your `MindShelf Bookmarks` Google Sheet and `MindShelf Library` Notebook.

#### Step 2: Deploy the Visual Web UI (100% Free Forever)
1. Open your **MindShelf Bookmarks** Google Sheet in Google Drive.
2. Click **Extensions → Apps Script**.
3. Replace `Code.gs` with [`apps-script/Code.gs`](apps-script/Code.gs).
4. Click **+ → HTML**, name the file `index`, and paste the contents of [`apps-script/index.html`](apps-script/index.html).
5. Click **Deploy → New deployment → Web app**:
   - **Execute as**: `Me`
   - **Who has access**: `Only myself` (keeps your bookmarks 100% private behind your Google login)
6. Open the generated `/exec` URL on your laptop or tap **Add to Home Screen** on your phone to install it like a native app.

#### Step 3 (Optional): Add a Custom Domain via Cloudflare Pages
1. Open [`cloudflare-wrapper/index.html`](cloudflare-wrapper/index.html).
2. Replace `YOUR_DEPLOYMENT_ID` with your Google Apps Script `/exec` URL.
3. Upload the file to **Cloudflare Pages** (make sure the file is named `index.html`) and attach your custom domain.

---

## Keyboard Shortcuts (Desktop UI)
- `/` — Focus search bar
- `[` — Collapse / expand sidebar
- `Esc` — Close reader drawer or modal

## Contributing
Contributions, feature ideas, UI improvements, and importers are very welcome! Check out [CONTRIBUTING.md](CONTRIBUTING.md) and feel free to open an issue or submit a Pull Request.

## License
MIT License — free to use, modify, and share.
