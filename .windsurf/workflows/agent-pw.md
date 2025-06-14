---
description: This workflow starts the game, installs an npm package and runs the test
---

# Install playwright

# npm init playwright@latest

# Start my flask application app.py

Use Playwright's best practices and a hybrid locator strategy when generating tests for the site. Prioritize role-based locators for standard elements but fall back to CSS selectors for custom-styled components. Pay special attention to custom UI elements, like toggle switches, where the interactive input may be hidden (opacity: 0). In such cases, interact with visible containers or labels instead.

Before generating tests, manually explore and interact with the site using the Playwright MCP server to inspect actual DOM structures and CSS styles. Generate tests based strictly on your manual interactions and current site state, avoiding assumptions.

Ensure interactions with dynamic panels (e.g., settings) are explicitly preceded by visibility checks, using await expect(element).toBeVisible(). Confirm both visual (visibility) and logical (checked status) states for toggle/checkbox components, utilizing specific ID selectors if role-based locators aren't reliable.

Employ Playwright’s auto-waiting assertions (expect(locator).toHaveText(), toHaveCount(), etc.) and leverage the .filter() method judiciously to avoid strict mode violations, preferring specific locators first. Avoid adding arbitrary timeout, if a timeout is necessary it should not be longer than 3 seconds; only include explicit waits when essential to ensure visibility or loading completion.

Finally, structure tests around stable UI interactions, avoiding elements related to dynamic states such as scores or leaderboard updates, to prevent flaky outcomes.