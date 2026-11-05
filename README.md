# nlpp-localization-workbench

Volunteer localization workbench for **New Love Plus+** English patching.

**You do not need Python.** Open **`index.html`**.

| Open this | What it is |
|-----------|------------|
| **`index.html`** | Tabbed hub (Scripts / Strings) |
| `kit/NLPP_Translate.html` | Dialogue still needing English — **Nene `a*`**, **Rinko `k*`**, **Manaka `t*`**, **common `p*`** |
| `kit/NLPP_Translate_Strings.html` | **SMS** (all three heroines) + leftover **TRB** / menu strings |

1. Open **`index.html`**
2. Use the **Scripts / Strings** tabs
3. Translate → **Save progress**
4. Post the downloaded JSON in Discord

The page checks GitHub for a newer `version.json`. **Check for updates** runs the same check. When a newer build is published, the open page locks. Pull or re-download, then refresh before editing again. Save stays disabled on the old page so a pack is not written from a stale kit.  
   **[#translated-work-to-review](https://discord.com/channels/1536915629787840572/1545180296343715891)**

### Quick coverage

| Tab | Includes | Does not include |
|-----|----------|------------------|
| Scripts | Leftover JP dialogue for **all routes** (Nene/Rinko/Manaka/common) | Fully EN scripts; non-dialog assets |
| Strings | Leftover **SMS** + **TRB** lines still JP | Already-English mapped strings |

Keep game tokens unchanged: `▲高嶺＊＊▲` / `▲主人公＊▲`, `※`, `▼`, `●`.

More detail: [`kit/README.md`](kit/README.md).

**Maintainers:** `nlpp-localization-workbench-parser` + EngPatcher `tools/localization_workbench/`. See EngPatcher `README.md` / `technical.md` §17.
