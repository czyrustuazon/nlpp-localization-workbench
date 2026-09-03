# nlpp-localization-workbench

Volunteer localization workbench for **New Love Plus+** English patching.

**You do not need Python.** Open **`index.html`**.

| Open this | What it is |
|-----------|------------|
| **`index.html`** | Tabbed hub (Scripts / Strings / Images) |
| `kit/NLPP_Translate.html` | Dialogue still needing English — **Nene `a*`**, **Rinko `k*`**, **Manaka `t*`**, **common `p*`** |
| `kit/NLPP_Translate_Strings.html` | **SMS** (all three heroines) + leftover **TRB** / menu strings |
| `kit/NLPP_Translate_Images/` | **Full UI PNG audit** (~1200 images / ~68 folders; keep `media/` beside `index.html`) |

1. Open **`index.html`**
2. Use the **Scripts / Strings / Images** tabs
3. Translate or audit → **Save progress**
4. Post the downloaded JSON in Discord  
   **[#translated-work-to-review](https://discord.com/channels/1536915629787840572/1545180296343715891)**

### Quick coverage

| Tab | Includes | Does not include |
|-----|----------|------------------|
| Scripts | Leftover JP dialogue for **all routes** (Nene/Rinko/Manaka/common) | Fully EN scripts; non-dialog assets |
| Strings | Leftover **SMS** + **TRB** lines still JP | Already-English mapped strings |
| Images | **All** mapped UI PNG masters (chrome, softkeys, headers, mail, date-edit, camera, title, …) | Fonts, script XML, TRB binaries |

Keep game tokens unchanged: `▲高嶺＊＊▲` / `▲主人公＊▲`, `※`, `▼`, `●`.  
Image uploads must be the **same pixel size** as the original.

More detail: [`kit/README.md`](kit/README.md).

**Maintainers:** `nlpp-localization-workbench-parser` + EngPatcher `tools/localization_workbench/`. See EngPatcher `README.md` / `technical.md` §17.
