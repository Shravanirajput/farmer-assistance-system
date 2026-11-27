# Setup — run the project on your laptop

This takes about 10 minutes the first time.

## 1. Install the tools (once)

| Tool | Why | Get it |
|------|-----|--------|
| **Node.js 20 or newer** (LTS) | Runs the build tools and the dev server | https://nodejs.org → download "LTS" → install with defaults |
| **Git** | Downloads the code and pushes changes | https://git-scm.com/downloads |
| **VS Code** (optional) | Code editor | https://code.visualstudio.com |

Check they work (open a new terminal / PowerShell):

```powershell
node -v
npm -v
git --version
```

## 2. Download the code and install packages

```powershell
git clone https://github.com/Shravanirajput/farmer-assistance-system.git
cd farmer-assistance-system
npm install
```

`npm install` downloads React, Vite, the fonts and other packages into `node_modules/` (this folder is not committed to Git).

## 3. (Optional but recommended) add the mandi API key

Live mandi prices come from the Government of India's Open Government Data platform. It needs a free API key.

1. Go to **https://data.gov.in** → click **Login | Register** (top right). Sign-in uses the Government's **Jan Parichay** login — register with your email/mobile and verify the OTP.
2. After login, open **My Account** and click **Generate API Key**. Copy the key.
3. In the project folder, create a file named **`.env.local`** with this one line:

   ```
   DATA_GOV_API_KEY=paste-your-key-here
   ```

4. Restart `npm run dev` if it was already running.

`.env.local` is ignored by Git, so the key is never uploaded to GitHub. The key is only read by the
server-side function (`api/mandi.js`); it never reaches the browser.

**No key?** The site still works. The Agri Market shows the last saved official rates (with the date
clearly displayed) and links to AGMARKNET. Every other feature works fully offline from the API.

## 4. Run it

```powershell
npm run dev
```

Open **http://localhost:5173**. The page reloads automatically when you save a file.

## 5. Other useful commands

| Command | Use it when |
|---------|-------------|
| `npm run build` | You want the production files (`dist/`) — Vercel runs this automatically |
| `npm run preview` | You want to test the production build locally (also serves `/api/mandi`) |
| `npm run lint` | Before committing — finds code mistakes |
| `npm run check:i18n` | After editing text — confirms Marathi exists for every English string |
| `npm run snapshot` | Before a presentation — saves today's official mandi rates as the offline fallback |

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `'npm' is not recognized` | Node.js is not installed or the terminal was opened before installing — reinstall Node and open a new terminal |
| Port 5173 already in use | Another dev server is running. Close it, or run `npm run dev -- --port 5174` |
| Agri Market says "Live rates are not connected yet" | `.env.local` is missing or the key line is wrong. Check spelling: `DATA_GOV_API_KEY=` and restart the dev server |
| Agri Market says "Could not load rates right now" | data.gov.in is slow or rate-limiting. Wait a minute and press *Try again*. The saved snapshot is shown meanwhile |
| `npm run snapshot` keeps retrying with HTTP 429 | You are using the shared public sample key. Add your own key to `.env.local` |
| Marathi text looks like boxes | Fonts failed to load — run `npm install` again |
