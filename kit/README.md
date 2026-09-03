# NLPP Localization Workbench (for translators)

**You do not need Python.** Open the hub one level up: **`../index.html`**.

| Open this | What it is |
|-----------|------------|
| **`../index.html`** | Tabbed hub (Scripts / Strings / Images) |
| `NLPP_Translate.html` | Dialogue still needing English (~6 MB) |
| `NLPP_Translate_Strings.html` | SMS + leftover menu/system strings |
| `NLPP_Translate_Images/` | UI image audit — keep `media/` beside `index.html` |
| `NLPP_Translate_Images.zip` | Same Images kit as a zip (unzip here if needed) |

1. Unzip `NLPP_Translate_Images.zip` into this `kit/` folder if you only received the zip  
2. Open **`../index.html`**  
3. Use the **Scripts / Strings / Images** tabs  
4. Translate or audit → **Save progress**  
5. Post the downloaded JSON in Discord  
   **[#translated-work-to-review](https://discord.com/channels/1536915629787840572/1545180296343715891)**

---

## What’s in each kit (complete as of a full export)

Counts change when maintainers rebuild; a full kit is roughly **Scripts ~300+ files**, **Strings ~2k lines**, **Images ~1200 PNGs**.

### Scripts — all routes (see filter!)

| Stem | Route | Jump |
|------|-------|------|
| `a*` | Nene | `a042`, `a970` |
| `k*` | Rinko | `k100`, `k970` |
| `t*` | Manaka | `t151 - #775`, `t970` |
| `p*` | Common | `p060` |

**Needs translation** only shows scripts that still have Japanese left — often mostly Manaka. Switch **Show → All scripts** and jump to `a*` / `k*` for Nene/Rinko.

Many Nene/Rinko (and some post-game) files in the current data are already English or empty stubs, so they won’t appear under Needs work. True JP baselines need a Japanese game extract.

### Strings — SMS + leftover system text

| Kind | Who / what | Jump example |
|------|------------|--------------|
| SMS | Manaka, Nene, and Rinko phone messages still JP | `sms/manaka#12` |
| TRB | Menu / system strings still JP in the main text table | `trb#2837` |

SMS has a length limit (tool warns). Same token / `※` / `▼` rules as Scripts.

### Images — full UI PNG audit

Every EngPatcher UI texture folder in the image map (menus, softkeys, headers, mail, date editor, camera, title, popups, map, shop, …) — about **68 folders / ~1210 PNGs** in a full export.

| Do this | Notes |
|---------|--------|
| Browse by folder | Dropdown + list (`folder / stem`) |
| Mark **OK** / **Needs fix** | Or leave unchecked |
| **Upload PNG** | Must be **same width × height**; saved into JSON as `png_b64` |
| Preview background | Use **Light checker** (or white) if text looks invisible on transparency |

Keep `index.html` next to `media/`. Do not open the HTML alone without `media/`.

---

Tabs keep each tool loaded in the background (unsaved edits stay until you close the window). You can still open any kit HTML in this folder directly if you prefer.

If Scripts stays empty after opening, grab a fresh `NLPP_Translate.html` and hard-refresh (`Ctrl+F5`).

---

Maintainers: build/ingest in `nlpp-localization-workbench-parser`; templates in EngPatcher `tools/localization_workbench/`. See EngPatcher `technical.md` §17.
