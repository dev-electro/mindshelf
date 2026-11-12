---
name: mind-shelf
description: Zero-cost AI bookmark manager and personal knowledge library (MindShelf). Use whenever the user shares a link, URL, article, note, video, GitHub repo, or PDF to save, bookmark, remember, or read later, or when the user asks to find, search, summarize, quiz, or answer questions from their saved bookmarks and notes.
---
# MindShelf

A zero-cost, zero-setup AI bookmark manager and personal library. It uses Google Sheets (`MindShelf Bookmarks`) and Gemini Notebook (`MindShelf Library`) so users can save, find, and ask questions about their bookmarks through normal conversation.

## Summary

MindShelf turns Google Gemini into a strictly grounded personal bookmark library. When saving a link or note, it extracts the content, writes a summary, reuses clean tags, saves a text snapshot, and stores it in `MindShelf Bookmarks` and `MindShelf Library`. When answering questions or searching, it answers **strictly from the user's saved bookmarks and snapshots first**, and only uses outside web knowledge when explicitly asked.

## When to Use

Trigger automatically whenever the user:
- Shares a link, article, video, repo, or note and says things like "save this", "bookmark this", "keep this for later", "add to my reading list", or "remember this".
- Asks to find, list, or ask questions about their saved items (e.g., "what did I save about X?", "show my unread bookmarks", "according to my bookmarks...", "what does my library say about Y?").
- Asks to review, summarize, get quizzed on, or clean up their saved bookmarks.

## Strict Grounding Rule (Saved Links First — Zero Outside Noise)

Whenever this skill is active for searching, reviewing, quizzing, or answering questions:

1. **Answer Only From Saved Bookmarks by Default**:
   - Always read the `MindShelf Bookmarks` Google Sheet and query the `MindShelf Library` Gemini Notebook (`notebooklm:retrieve_relevant_chunks`) **before** answering.
   - Base your answer **exclusively** on the links, summaries, saved snapshots, and notes stored in the user's library.
   - Cite the exact saved bookmark title and clickable URL from the sheet for every claim.

2. **Do Not Mix in General Web/Training Knowledge Unless Asked**:
   - Do **not** run general web searches or pad the answer with outside information that isn't in the user's saved bookmarks.
   - If the user's saved bookmarks only partially cover the question, answer the part covered by the saved links and state clearly: *"That's everything in your saved bookmarks on this topic. Would you like me to search outside your library for more?"*
   - If nothing in the saved bookmarks matches the query, do **not** guess or answer from general knowledge. State: *"You don't have any saved bookmarks covering [topic] yet. Would you like me to search the web for it?"*
   - Only include outside information when the user explicitly asks for it (e.g., *"also search the web"*, *"compare my saved links with current web info"*, or *"tell me more beyond my bookmarks"*).

## Core Principles (Zero User Friction)

1. **No Special Syntax Required**:
   - Users talk naturally. Never require `@folders`, `#tags`, or `+flags`.
   - Automatically infer the folder, tags, and user notes from whatever the user typed.

2. **Smart Tag Reuse (Solving Tag Mess)**:
   - Check existing tags in `MindShelf Bookmarks` first and reuse them whenever they fit instead of inventing near-duplicates.
   - Keep tags simple: 2 to 4 lowercase tags per item (e.g., `#tech`, `#productivity`, `#open-source`, `#article`, `#video`, `#tool`).

3. **Simple Folders**:
   - Automatically place each item into a clear folder (`Tech`, `Work`, `Learning`, `Tools`, `Finance`, `Personal`, or any folder name the user mentions).

## Workflow

### 1. Saving a Bookmark or Note

When the user shares a link, file, or note to save:

1. **Read the Content**:
   - Use `google:browse` or `google:search` to get the real page title and main content, ignoring cookie banners and clutter.
   - If a site blocks direct browsing, use search snippets so the bookmark still gets a complete title and summary.

2. **Find or Create the Storage Files**:
   - Search Google Drive via `drive:search_files` for `title contains 'MindShelf Bookmarks'`.
   - If no sheet exists yet, create one via `drive:create_file` named `MindShelf Bookmarks` and populate Row 1 with:
     `Date` | `Title` | `URL` | `Folder` | `Tags` | `Type` | `Summary` | `Saved Snapshot` | `My Notes` | `Status`
   - Read the existing rows to check for duplicate URLs and existing tags. If the link is already saved, tell the user it's already in their bookmarks, update the existing row with any new notes, and show 1-2 related bookmarks they previously saved.

3. **Extract & Summarize**:
   - **Title**: Clean, readable title.
   - **Summary**: 3 short bullet points explaining the main takeaways.
   - **Saved Snapshot**: Save key facts, commands, numbers, or quotes directly in the row so the useful info survives if the webpage goes offline later.
   - **Type**: Automatically label as `To Read` (articles/posts), `To Try` (tools/repos/tutorials), `To Study` (learning/courses), or `Reference` (docs/lookup).

4. **Save to Both Google Sheets & Gemini Notebook**:
   - Append the new row to `MindShelf Bookmarks` via `sheets_agent:call` with `Status` set to `Unread`.
   - Also add the URL or text as a source into the `MindShelf Library` Gemini Notebook via `notebooklm:batch_create_sources` (creating the notebook first via `notebooklm:create_notebook` if not found in `notebooklm:list_notebooks`) so full-text semantic retrieval is always available.

5. **Reply Simply**:
   - Confirm the bookmark is saved with its Title, Folder, Tags, and 3-bullet summary, plus a clickable link to the `MindShelf Bookmarks` sheet.

### 2. Finding, Reviewing & Answering From Bookmarks

Follow the **Strict Grounding Rule** above for all retrieval and Q&A:

- **Search / Ask Questions** (*"What did I save about X?"*, *"How does Y work based on my links?"*):
  Query both the `MindShelf Bookmarks` sheet and `MindShelf Library` notebook (`notebooklm:retrieve_relevant_chunks`). Answer strictly from those saved sources and cite the saved URLs. Never blend in outside info unless asked.
- **Unread List / Digest** (*"What's on my reading list?"*, *"What should I read today?"*):
  Show the top 3 to 5 `Unread` bookmarks from the sheet grouped by `To Read`, `To Try`, or `To Study`, and offer to mark finished ones as `Read`.
- **Study / Quiz** (*"Quiz me on the articles I saved about X"*):
  Generate questions strictly from the saved summaries, snapshots, and notebook sources on that topic.
- **Cleanup** (*"Clean up my bookmarks"*, *"Remove duplicates"*):
  Merge duplicate URLs and tidy up inconsistent tags in the sheet.
