---
description: Push to GitHub with AI-Generated Commit Messages (Cascade)
---

1. Initialize Git Repository in Windsurf
----------------------------------------
- Run:
    git status
2. Review Changes-- you must alaways suggest the use yes/no buttons to approve
-----------------
- Present the user with the output of `git status`.
- Ask for user input: "Review the above changes. Continue? (yes/no)"
- If 'no', exit the workflow.
- If 'yes', proceed.
3. Understand what you are pushing out 
---------------------------------------
- Create a commit message based on diffs
4. Review & Commit
------------------
- Review and edit the generated commit message if needed.
- Commit your changes:
      git commit -m "[generated-message]"
5. Push to GitHub
-----------------
- Push your commit to the main branch:
      git push -u origin main