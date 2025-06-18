---
description: A workflow that nukes the playwright environment
---

- run git reset head hard and git clean fd
- delete the tests folder, tests-examples, test-results and playwright-report and test-report if it exists
- delete the playwright.config.js
- Ensure there are no activities running on localhost 5000 port if there are kill th
