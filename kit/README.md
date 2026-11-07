# NLPP Localization Workbench (for translators)

**You do not need Python.** Open the hub one level up: **`../index.html`**.

| Open this | What it is |
|-----------|------------|
| **`../index.html`** | Tabbed hub (Scripts / Strings) |
| `NLPP_Translate.html` | Dialogue. Japanese on the left, the patcher's current English in the edit box |
| `NLPP_Translate_Strings.html` | SMS, plus TRB lines that are not already in the patcher's translation table |

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

**Needs translation** shows a script when Japanese is still in the edit box, or when that box is still the unreviewed Gemini pass. Switch **Show → All scripts** to open a finished Manaka, common, or community script. The edit box there is the English the patcher ships now.

Six Manaka scripts do not line up box-for-box with the Japanese, so the Japanese pane repeats the shipped English: `t061`, `t108`, `t116`, `t117`, `t142`, `t912`. The scene count matches. A few scenes are one text box short or long. `t912`'s last scene is a choice list with nine English rows and ten Japanese rows (`やめ` / `次へ` became Stop / Next). Leftover Japanese in the edit box can still be translated. This does not change how those scripts play.

### Strings — SMS + leftover system text

| Kind | Who / what | Jump example |
|------|------------|--------------|
| SMS | Manaka, Nene, and Rinko phone messages | `sms/manaka#12` |
| TRB | A menu string only while its exact Japanese is not already translated | `trb#2837` |

SMS has a length limit (tool warns). Keep `▲…▲`, `※`, and `▼`. Translate `●` as I / me / my. Left in, the game shows 俺 or 僕.

**Lyud** proofread Nene `a000` (first day at Dixie's). That script is integrated and no longer needs a pass.

---

Tabs keep each tool loaded in the background (unsaved edits stay until you close the window). You can still open any kit HTML in this folder directly if you prefer.

If Scripts stays empty after opening, grab a fresh `NLPP_Translate.html` and hard-refresh (`Ctrl+F5`).

---

Maintainers: `python tools/sync_workbench.py` in EngPatcher rebuilds these kits from the patcher. See EngPatcher `docs/technical.md` §20.
