# nlpp-localization-workbench

Volunteer localization workbench for **New Love Plus+** English patching.

**You do not need Python or a download.** Open the **[online workbench](https://czyrustuazon.github.io/nlpp-localization-workbench/)**. It always has the newest build.

Prefer a local copy? Download the [zip](https://github.com/czyrustuazon/nlpp-localization-workbench/archive/refs/heads/main.zip), unzip all of it, and open **`index.html`**.

| Open this | What it is |
|-----------|------------|
| **`index.html`** | Tabbed hub (Scripts / Strings) |
| `kit/NLPP_Translate.html` | Dialogue for **Nene `a*`**, **Rinko `k*`**, **Manaka `t*`**, **common `p*`**. The edit box is the patcher's current English |
| `kit/NLPP_Translate_Strings.html` | **SMS** (all three heroines). TRB rows appear only when that Japanese string is not already translated |

1. Open the [online workbench](https://czyrustuazon.github.io/nlpp-localization-workbench/) or your local **`index.html`**
2. Use the **Scripts / Strings** tabs
3. Translate → **Save progress**
4. Post the downloaded JSON in Discord

The page checks for a newer `version.json`. **Check for updates** runs the same check. When a newer build is published, the page locks. Online, press **Reload**. A local copy links to the online workbench instead. If you have unsaved edits, a warning appears and the lock waits until you **Save progress**. To carry on from a saved JSON, load it from **Advanced** in the Scripts or Strings tab.

**"File not found" in the browser?** That local copy was moved or deleted, so the page cannot run or show the update prompt. Open the [online workbench](https://czyrustuazon.github.io/nlpp-localization-workbench/). Saved JSON files still work.

Post saved JSON in
   **[#translated-work-to-review](https://discord.com/channels/1536915629787840572/1545180296343715891)**

### Quick coverage

| Tab | Includes | Does not include |
|-----|----------|------------------|
| Scripts | Every contentful script. **Needs translation** is Japanese still in the edit box, plus an unedited Gemini pass | Empty stubs |
| Strings | **SMS**, and a TRB line only while the patcher has no translation for that exact Japanese | Strings already in the patcher's translation table |

Keep game tokens unchanged: `▲高嶺＊＊▲` / `▲主人公＊▲`, `※`, `▼`. Translate `●` as I / me / my. Left in, the game shows 俺 or 僕.

Reviewed scripts leave the work queue once they are integrated. **Lyud** proofread Nene's first day at Dixie's (`a000`); that script is done.

More detail: [`kit/README.md`](kit/README.md).

**Maintainers:** `python tools/sync_workbench.py` in EngPatcher. See `docs/technical.md` §20.
