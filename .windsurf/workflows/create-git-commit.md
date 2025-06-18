---
description: Automated git commit workflow that generates a git commit based on the content
---

Create a git commit based on the files that I have altered.

Develop an understanding of what files have changed in git, then produce a git commit message. Ask me if the commit message is good, and give me an opportunity to respond to it. If it's good perform a git commit message. 

- Start a commit buffer so the subject and body are naturally separated by a blank line. Use your editor: `git commit` (no `-m`) launches $EDITOR with the subject on line 1, an empty line, then the body.

- Keep the subject line ≤ 50 chars. After committing, check: `git log --oneline --no-decorate`

- Capitalize the subject line. Just type it: Git commit history is easy to scan when every subject starts with a capital.

- Don’t end the subject with a period. Visual check before saving the buffer (or amend later with `git commit --amend`).

- Write the subject in the imperative mood (“Fix typo” not “Fixed typo”). If you forget, correct it quickly: `git commit --amend -m "Add validation for empty input"`

- Wrap the body at 72 chars. Tell your editor once: `git config --global core.editor "vim -c 'set textwidth=72'"` (Adapt for nano/emacs/etc.)

- Use the body to explain what and why, not how. Open the commit for a richer edit: `git commit --verbose` shows the diff below the message so you can focus on rationale.

