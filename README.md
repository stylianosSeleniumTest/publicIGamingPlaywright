# publicIGamingPlaywright — Test Automation Framework

## Overview  
This project is a web UI test automation framework using **Playwright + TypeScript** aimed at iGaming or similar web-apps. The goal remains: modular, maintainable, reusable end-to-end tests.

Core principles:

- Abstract repeated behaviors into **reusable custom commands / helper functions**
- Environment-based configuration
- Clear folder structure (tests, helpers, fixtures, etc.)
- Scalability and ease of adding new workflows

---

## Project Structure

| Path | Purpose / role |
|---|---|
| `playwright.config.ts` | Main Playwright configuration (base URL, timeouts, browsers, etc.) |
| `env.config.ts` or similar | Environment-specific configuration (dev, staging, prod) |
| `fixtures/` | Test data or environment fixtures |
| `helpers/` or `utils/` | Shared utility functions, abstractions, wrappers |
| `commands/` (optional) | Custom commands / wrappers around common flows |
| `tests/` / `e2e/` | Test specs / scenario files |
| `package.json` | Dependencies and scripts |

---

## What We’re Doing

1. **Reusability & DRY**  
   Common flows (login, navigation, setup) are moved into shared functions or custom wrappers.

2. **Environment-agnostic tests**  
   Use environment config so tests can run in different deployment environments without code changes.

3. **Focused test specs**  
   Tests emphasize asserting the business logic/flows rather than setup.

4. **TypeScript + Playwright features**  
   Leverage Playwright’s API (page, browser, contexts) and TypeScript tooling for safety and maintainability.

5. **Scalable architecture**  
   As new features or flows come, we can grow helpers/commands rather than rewriting similar logic.

---

## Coding Conventions

| Item | Convention | Example |
|------|------------|---------|
| Variables & functions | `camelCase` | `const orderId = 123;` <br> `function getUserInfo() {}` |
| Classes & interfaces | `PascalCase` | `interface UserAccount { ... }` <br> `class OrderService { ... }` |
| Constants | `UPPER_CASE` | `const MAX_RETRIES = 3;` |
| File names | `kebab-case` | `login-service.ts` <br> `user-profile.ts` |

---

## Example: Helper / Command Wrapper

```ts
// helpers/auth.ts (or commands/login.ts)
export async function login(page: Page, user: string, pass: string) {
  await page.goto('/login');
  await page.fill('#username', user);
  await page.fill('#password', pass);
  await page.click('button[type=submit]');
  // maybe wait for navigation or some guard
}
