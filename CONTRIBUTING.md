# Contributing to MindShelf

Contributions are warmly welcomed! Whether it's a UI/UX improvement, a new bookmark importer (Chrome HTML, Pocket, Raindrop, Karakeep JSON), better thumbnail resolvers, or prompt refinements to `skill/SKILL.md`, we'd love your Pull Request.

## Ideas for Contributions
- **Importers**: Client-side Chrome/Firefox/Pocket/Karakeep bookmark import inside `apps-script/index.html`.
- **Keyboard & Bulk Actions**: Multi-select cards to bulk-tag, bulk-archive, or move folders.
- **More Thumbnail Resolvers**: Rich preview support for arXiv papers, Hacker News, or Substack.
- **Skill Enhancements**: Better deduplication heuristics, RSS-style digest prompts, or multi-language support.

## How to Submit a PR
1. Fork the repository and create a new branch (`git checkout -b feat/your-feature`).
2. Keep `apps-script/index.html` **zero-dependency** (pure HTML, CSS, Vanilla JS, inline SVGs) so it continues to run seamlessly inside Google Apps Script.
3. Ensure no personal Sheet IDs, Notebook IDs, or API keys are committed.
4. Open a Pull Request describing what you added or improved!
