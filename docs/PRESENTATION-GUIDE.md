# Presentation guide

Everything your team needs for the final presentation: who says what, a timed demo script,
a backup plan, and answers to the questions examiners are most likely to ask.

---

## 1. Suggested split for the team (≈12 minutes + questions)

Team: **Shravani Rajput (52), Prachi Sagvekar (54), Drishti Rathi (53)** · Guide: **Dr. Sanjay Shitole** ·
Information Technology, Semester 3 · UMIT, SNDT.

The deck is in [`docs/presentation/`](presentation/) as PowerPoint (`.pptx`, with speaker notes on every slide)
and PDF, and online at https://farmer-assistance-v2.vercel.app/docs/presentation.html.

| Speaker | Slides | Topic | Time |
|---------|--------|-------|------|
| Shravani Rajput | 1–5 | Introduction, the problem, the five features, the Maharashtra-rooted design, Crop Recommendation | 4 min |
| Prachi Sagvekar | 6–11 | Disease Guide, Equipment Rental, Agri Market (live data, the maize example), Government Schemes | 4 min |
| Drishti Rathi | 12–17 | Marathi support, the phone app, architecture, hosting, data sources, limitations and future scope | 4 min |
| All three | 18–19 | Live demo (one drives, one narrates), thank you and questions | 5–7 min |

This is only a suggestion — swap rows as you like. Everyone should be able to answer the Q&A below.

---

## 2. Live demo script (≈6 minutes)

Open https://farmer-assistance-v2.vercel.app (or your local `npm run preview`). Start in English.

1. **Home (30 s)** — point out the Warli art: *"Warli is Maharashtra's own folk art from Palghar; it shows farming and the tarpa dance."*
   Show the season banner (*"it knows it's Rabi season right now"*). **Click मराठी** — the whole site switches. Keep Marathi on for a minute, then switch back.
2. **Crop Recommendation (1 min)** — choose **Rabi · Black soil · Moderate water · Marathwada** → *Show suitable crops*.
   Explain the ✓ marks and points (*"season 3, soil 2, water 2, region 1"*). Point at the MSP on the card.
3. **Connected features (30 s)** — on the **Chickpea** card click *Diseases to watch* → open **Fusarium Wilt** → show
   "Confirm before you spray" and the Kisan Call Centre number.
4. **Agri Market (1.5 min)** — open **Mandi rates** → choose a field crop with an MSP, e.g. **Maize**
   (on 26 Nov 2026 some Jalgaon mandis paid ₹2,100 against the ₹2,410 MSP — a real "below MSP" example).
   Show best mandi, average, lowest; the **below-MSP warning**; type a quantity in the calculator.
   Scroll to the **Bajarbhav board** — *"styled like the chalk boards in APMC mandis; data is live from the Government's AGMARKNET"*.
   Open the **MSP** tab — *"from the official PIB release, with last year's price."*
5. **Government Schemes (1.5 min)** — in *Find schemes for me*: Maharashtra · Yes, own land · Up to 1 ha · age 34 · SC ·
   needs: Irrigation + Income support → *Show my schemes*. Point out the reasons on each card. Open
   **Dr. Babasaheb Ambedkar Krishi Swavalamban Yojana** → tick two documents in the checklist → show the official link,
   status and "Last checked" date.
6. **Equipment Rental (1 min)** — open **45 HP Tractor** → *Request booking* → press *Send* empty to show validation →
   fill name, mobile `9876543210`, village, a date, 2 days → watch the estimated rent → send → *View my bookings*.
   Mention: *"sample listings, clearly labelled; your data never leaves the phone."*
7. **It's also an app (30 s)** — on a phone where the app is installed, open **शेतकरी सहाय्य** from the home screen:
   it opens full-screen with the Warli splash and the bottom tab bar. Turn on airplane mode and reopen it —
   *"it still works offline and shows the saved official prices with their date."*

**Before the demo:** install the app on the presenting phone once (Chrome → ⋮ → *Install app*, or the *Install app*
button on the home page). Clear old bookings (or use a fresh browser profile), set language to English, and close other tabs.

### If something goes wrong

| Problem | What to do / say |
|---------|------------------|
| Internet is slow or down | The market page automatically shows the **saved official snapshot** with its date — say *"this is our offline fallback, never made-up data."* For a full offline demo run `npm run build` then `npm run preview` on the laptop |
| data.gov.in is down | Same — the snapshot appears. Explain the fallback design (it is a strength) |
| Projector is low-resolution | Use browser zoom (Ctrl + / Ctrl −); the site is responsive |
| Anything else | Switch to the screenshots in the slide deck |

---

## 3. Likely questions and short answers

### About the idea

**Q: What problem are you solving?**
Farm information is scattered across many portals (AGMARKNET, PIB, MahaDBT, pmkisan, university PDFs), mostly in English,
and often hard to use on a phone. We put the five most common needs — what to grow, crop health, equipment, today's
price and government schemes — in one simple, Marathi-first place.

**Q: Who is the user?**
Small and marginal farmers in Maharashtra with a smartphone, and the people who help them (family members,
Krishi Sahayaks, CSC operators).

**Q: How is this different from existing apps?**
Existing apps each do one job (e-NAM for trade, MahaDBT for applications, Kisan Suvidha for information).
Ours connects them — a crop recommendation links to that crop's diseases, today's mandi price and its MSP — and every
result explains *why*. It needs no login and keeps personal data on the phone.

### About the technology

**Q: What is your tech stack?** React 19 with Vite for the interface, plain CSS, hosted on Vercel, with one Vercel
serverless function that calls the Government's data.gov.in API.

**Q: Where is your database?** We deliberately don't need one. Reference data (crops, diseases, MSP, schemes) changes
a few times a year and must be reviewed by a person, so it lives in version-controlled files. Live prices come from the
Government API. Bookings are stored in the browser's localStorage, so no personal data leaves the phone.
A real launch would add a backend for bookings (see future scope).

**Q: How do you protect the API key?** The browser never sees it. The browser calls our own `/api/mandi`; that
server function adds the key (stored as a Vercel environment variable) and calls data.gov.in.

**Q: What if the Government API is down?** Three levels: live data → the last saved official snapshot with its date
clearly shown → a message with a link to AGMARKNET. We never display invented prices.

**Q: How does caching work?** The function tells Vercel's CDN to cache each answer for 15 minutes
(`s-maxage=900`), and also keeps a 15-minute in-memory cache. Mandi data changes once a day, so this is safe and keeps
us well within API limits.

**Q: How does routing work without a router library?** The page is chosen from the URL hash (`#market/onion`).
A 30-line hook listens to the `hashchange` event. It works on any static host, and the back button works.

**Q: How did you make it bilingual?** All interface text is in `en.js` and `mr.js` with identical keys; a React Context
provides `t('key')`. Data stores `{en, mr}` pairs and `tx()` picks one. The choice is saved in localStorage and sets the
page's `lang` attribute. A script (`npm run check:i18n`) fails the build check if any Marathi text is missing.

**Q: Why these fonts?** Mukta and Rozha One both include Latin and Devanagari, so English and Marathi look consistent.
They are bundled with the site, so Marathi renders correctly even on phones without Marathi fonts.

**Q: Is it mobile friendly / accessible?** Yes — designed mobile-first, 48px+ touch targets, tables turn into cards on
small screens, keyboard focus is visible, form errors are announced, and animation stops for users who prefer reduced motion.

**Q: Is it a mobile app?** Yes — it is a **Progressive Web App (PWA)**. In Chrome, *Install app* (or our own *Install app*
button) adds it to the phone's home screen with its own icon. It then opens full-screen like a native app, with a bottom
tab bar, and long-pressing the icon gives shortcuts to Crops, Mandi rates, Schemes and Diseases. No Play Store needed,
and every update we deploy reaches the app automatically.

**Q: How does it work offline?** A *service worker* (a small script the browser runs in the background) saves the app's
own files when it is first opened. Offline, the app still opens; crop, disease and scheme information works fully, and
the mandi page shows the saved official prices with their date. Live prices are never cached, so they are never stale
without saying so.

**Q: What validation is there in the booking form?** Name required; Indian mobile number (10 digits, starting 6–9);
date today or later; 1–30 days. Errors are shown next to each field in the chosen language.

### About the features

**Q: How does crop recommendation work? Why not machine learning?**
A transparent points system: season must match (+3), soil (+2), water (+2), region (+1); at least 5 of 8 to show.
We had no large, labelled dataset of Maharashtra farm outcomes, so an ML model would only look clever. Rules can be
checked against ICAR / university guidance and explained to a farmer.

**Q: Where does the crop and disease data come from?** ICAR institutes and Maharashtra's agricultural universities
(MPKV Rahuri, PDKV Akola, VNMKV Parbhani, Dr. BSKKV Dapoli). Each card shows its source.

**Q: Why don't you recommend pesticides?** Wrong chemical advice can harm crops, people and soil, and symptoms of
different diseases can look alike. We guide farmers to confirm with a Krishi Sahayak, KVK or the Kisan Call Centre.

**Q: What is the modal price?** The price at which the largest quantity of that commodity was traded in the mandi that
day. It is the most useful single number for a farmer.

**Q: What is MSP and who decides it?** Minimum Support Price — the price at which the Government procures notified
crops. CACP (Commission for Agricultural Costs and Prices) recommends it; the Union Cabinet (CCEA) approves it before
each season. We show the Kharif 2026-27 and Rabi 2027-28 MSPs from the official PIB releases.

**Q: Why the below-MSP warning?** If mandis are paying below MSP, the farmer may get more by selling to a
Government procurement centre (NAFED/CCI/State federation) — the app tells them to ask about it.

**Q: Are the equipment listings real?** No — they are sample listings to demonstrate the rental and booking flow, and
the page says so. A real version would let owners register machines (with verification) or pull Government Custom
Hiring Centre data (the FARMS app).

**Q: Are the schemes real? How did you check?** Yes — 23 schemes (13 central, 10 Maharashtra), each checked on official
sources (.gov.in portals, Government Resolutions, PIB, DGIPR) on 26 Nov 2026. Every scheme page shows its sources and
the date checked. Where something was announced but no order was found, we say so (e.g. Namo Shetkari ₹9,000).

**Q: How does the scheme finder decide?** Each scheme has rules (state, land in own name, age range, land limit, social
category). A scheme is shown only if the answers pass all its rules; schemes matching the farmer's needs come first.
The final decision is the department's, and the page says that.

**Q: What is Farmer ID / Agristack?** A digital ID linking a farmer's Aadhaar to land records, under the Government's
Digital Agriculture Mission. In Maharashtra it is needed to apply on MahaDBT and for crop insurance.

**Q: What changed with Maharashtra's ₹1 crop insurance?** It ran from Kharif 2023 to Rabi 2024-25. From Kharif 2025
(GR of 24 June 2025) farmers pay the normal PMFBY share again: 2% Kharif, 1.5% Rabi, 5% cash crops.

**Q: What is MahaDBT "first-come-first-served"?** From 2025-26 MahaDBT selects applicants in order of application
instead of a lottery, so applying early matters — the site advises this.

### About hosting

**Q: How is it hosted and what does it cost?** On Vercel's free plan: static files on its CDN plus one serverless
function, and the same site also serves our documentation and slides at `/docs`. data.gov.in is free. Total cost: ₹0.

**Q: How do you deploy a change?** We push to the `main` branch on GitHub. Vercel is connected to the repository, so it
automatically runs `npm run build` and publishes the new version in about a minute. Other branches get a preview link
for testing first, and rollback is one click in the Vercel dashboard.

**Q: Why does the function run in Mumbai?** Vercel runs functions in the USA by default, and data.gov.in refused
requests from there — we saw it fail. Setting the region to Mumbai (`bom1` in `vercel.json`) fixed it and makes it
faster for Indian users.

### Limitations and future scope

**Q: What are the limitations?** Maharashtra only; 18 crops; crop advice doesn't use soil-test values or weather;
equipment listings are samples; bookings live on one device; Marathi should be reviewed by an agriculture officer.

**Q: What would you add next?**
1. **Hindi** (the i18n system is ready for it) and **voice / audio** for farmers who find reading hard.
2. **Weather** from IMD for sowing and spraying advice.
3. **Real equipment marketplace** with a backend, owner verification and OTP login.
4. **Soil Health Card input** to refine crop and fertiliser advice.
5. **Price trends** (past 30 days) and **notifications** when a crop crosses MSP (the installed app can receive them).
6. More states and more crops.

**Q: What was the hardest part?**
Verifying scheme and price data from official sources (several schemes changed in 2025–26), rendering Marathi
correctly, handling the Government API's rate limits safely, and translating farming terms into natural Marathi.
