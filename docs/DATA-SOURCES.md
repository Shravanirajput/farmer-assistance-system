# Data sources

**Rule we followed:** use official or institutional sources only (Government of India / Government of Maharashtra
portals, Government Resolutions, PIB, ICAR institutes and State agricultural universities). News was used only to
spot that something had changed, and then confirmed on an official page. Nothing on the site is invented.
Where an official order could not be found, the site says so in the scheme's status.

| Data | Where it comes from | Checked | Notes |
|------|---------------------|---------|-------|
| **Live mandi prices** | Ministry of Agriculture & Farmers Welfare, AGMARKNET, via [data.gov.in](https://data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi) API, resource `9ef84268-d588-465a-a308-a864a43d0070` | Live (verified working 26 Nov 2026) | Fields: state, district, market, commodity, variety, grade, arrival_date, min/max/modal price (₹/quintal). Daily data; early in the day fewer mandis may have reported |
| **Saved mandi snapshot** | Same API, saved by `npm run snapshot` | 26 Nov 2026 (129 Maharashtra records) | Shown only when live data fails, always with its date |
| **MSP — Kharif 2026-27** | [PIB release, 13 May 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2260617) (CCEA decision) | 26 Nov 2026 | 14 crops, 17 rows |
| **MSP — Rabi 2027-28** | [PIB release, 30 Sep 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2316941) (CCEA decision) | 26 Nov 2026 | 6 crops |
| **Crop guide** (18 crops) | ICAR institutes (IIMR, IIPR, IIOR, IIWBR, NRRI, DGR, CICR, DOGR), MPKV Rahuri, PDKV Akola, VNMKV Parbhani, Dr. BSKKV Dapoli, Vasantdada Sugar Institute | Key facts spot-checked 26 Nov 2026 against MPKV crop pages, the ICAR Kharif Agro-Advisory 2025 and Krishi Vibhag's Kharif 2026 sowing report | General agronomic guidance; durations and sowing windows are approximate and vary by variety and weather. Not yet checked: watermelon details and Rabi/summer regions |
| **Disease guide** (20 diseases) | PDKV Akola Plant Disease Guide, ICAR-NCIPM, ICAR-CICR, ICAR-IIPR, ICAR-IIMR, ICAR-IIWBR, ICAR-IIOR, ICAR-NRRI, ICAR-DGR, ICAR-DOGR | The 4 new diseases spot-checked 26 Nov 2026 (IIMR, ICRISAT); the original 16 kept from v1 | Chemical names and doses deliberately not given. Some Marathi disease names should be confirmed with the local Krishi Sahayak |
| **Central schemes** (13) | pmkisan.gov.in, pmfby.gov.in, rbi.org.in, soilhealth.dac.gov.in, pdmc.da.gov.in, pmkusum.mnre.gov.in, agrimachinery.nic.in, pgsindia-ncof.gov.in, naturalfarming.dac.gov.in, enam.gov.in, pulsesmission.da.gov.in, agriinfra.dac.gov.in, PIB releases | 26 Nov 2026 | Each scheme lists its own source links on its page |
| **Maharashtra schemes** (10) | nsmny.mahait.org, mahadiscom.in, energy.maharashtra.gov.in, mahadbt.maharashtra.gov.in, krishi.maharashtra.gov.in (GRs), mahapocra.gov.in, sahakarayukta.maharashtra.gov.in, mahasamvad.in (DGIPR) | 26 Nov 2026 | e.g. ₹1 crop insurance ended after Rabi 2024-25 (GR 24 June 2025); MahaDBT moved to first-come-first-served in 2025-26 |
| **Helplines** | Kisan Call Centre 1800-180-1551; PM-KISAN 155261; PMFBY 14447; e-NAM 1800-270-0224; MahaDBT 022-61316429; Mahavitaran 1800-212-3435 | 26 Nov 2026 | From the official portals / PIB |
| **Equipment listings** | **Sample data** for demonstrating the booking flow | — | Labelled "Sample listings" on screen. Real rentals: Custom Hiring Centres (FARMS app) |

## Known limitations (say these honestly if asked)

- Crop recommendation covers **Maharashtra only** and 18 major crops; it does not use soil-test values, rainfall
  forecasts or market prices.
- Mandi data depends on mandis reporting to AGMARKNET; some days some mandis do not report.
- Scheme rules change. The site shows the date it was checked and always links to the official portal.
- Equipment listings are samples; a real version needs owner registration and verification.
- The Marathi translation should be reviewed by a native speaker / agriculture officer before real-world use.

## Keeping data fresh

| What | How often | How |
|------|-----------|-----|
| Mandi snapshot | Before each demo | `npm run snapshot` |
| MSP | Twice a year (Kharif ~May/June, Rabi ~Sep/Oct) | Update `src/data/msp.js` from the new PIB release |
| Schemes | Every few months | Re-check each official link; update `src/data/schemes.js` and `SCHEMES_VERIFIED_ON` |
