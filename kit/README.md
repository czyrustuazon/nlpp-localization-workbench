# NLPP Localization Workbench (for translators)

**You do not need Python.** Open the hub one level up: **`../index.html`**.

| Open this | What it is |
|-----------|------------|
| **`../index.html`** | Tabbed hub (Scripts / Strings) |
| `NLPP_Translate.html` | Dialogue still needing English (~6 MB) |
| `NLPP_Translate_Strings.html` | SMS + leftover menu/system strings |

1. Open **`../index.html`**  
2. Use the **Scripts / Strings** tabs  
3. Translate → **Save progress**  
4. Post the downloaded JSON in Discord  
   **[#translated-work-to-review](https://discord.com/channels/1536915629787840572/1545180296343715891)**

---

## What’s in each kit (complete as of a full export)

Counts change when maintainers rebuild; a full kit is roughly **Scripts ~300+ files**, **Strings ~2k lines**.

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

---

Tabs keep each tool loaded in the background (unsaved edits stay until you close the window). You can still open any kit HTML in this folder directly if you prefer.

If Scripts stays empty after opening, grab a fresh `NLPP_Translate.html` and hard-refresh (`Ctrl+F5`).

---

Maintainers: build/ingest in `nlpp-localization-workbench-parser`; templates in EngPatcher `tools/localization_workbench/`. See EngPatcher `technical.md` §17.
