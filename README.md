# publicIGamingPlaywright — Test Automation Framework

# 🎯 Public iGaming Playwright Project

This repository demonstrates a **Playwright automation framework** for testing iGaming web applications.  
The framework follows the **Page Object Model (POM)** pattern and organizes reusable logic into **tests, page objects, helpers, hooks, utils, and enums**.

---

## 📂 Project Structure

publicIGamingPlaywright/
│
├── playwright.config.ts # Playwright configuration
├── playwright-project/
│ ├── tests/ # Test spec files (*.spec.ts)
│ ├── page-objects-demo/ # Page Object classes (PascalCase)
│ ├── hooks/ # Environment & user detail hooks
│ ├── helpers/ # Scenario helpers (e.g., signUpFormHelper)
│ ├── utils/ # Generic utility functions
│ ├── enum-parameters/ # Enums for envs, brands, roles
│ └── fixtures/ # Test data fixtures
└── README.md


---

## 🧪 Tests
- Located in: `tests/`  
- Format: `*.spec.ts`  
- Purpose: Define high-level test scenarios.  

---

## 🏗️ Page Objects
- Located in: `page-objects-demo/`  
- Naming: PascalCase classes  
- Purpose: Encapsulate selectors and page actions for reusability.  

---

## 🔧 Helpers
- Located in: `helpers/`  
- Purpose: Orchestrate **scenario-level flows** by combining multiple page object calls.  
- Naming: camelCase functions.  

---

## ⚙️ Utilities (utils)
- Located in: `utils/`  
- Purpose: General-purpose reusable functions (navigation, waiting, logging, etc.).  
- Naming: camelCase.  

---

## 🪝 Hooks
- Located in: `hooks/`  
- Purpose: Provide reusable environment setup and user/brand configuration.  

---

## 🗂️ Enums
- Located in: `enum-parameters/`  
- Purpose: Centralized constants for environments, brands, and user roles.  

---

## 📊 Framework Model

The project follows the **Page Object Model (POM):**

- **Tests** → define high-level scenarios  
- **Page Objects** → encapsulate UI logic  
- **Helpers** → orchestrate test flows  
- **Hooks** → handle environment and user setup  
- **Utils** → provide generic reusable functions  
- **Enums** → store global constants  

### 🔄 Workflow Diagram (ASCII)

Tests
│
▼
Helpers / Scenario Orchestration
│
▼
Page Objects
│
├─> Utils
└─> Hooks
│
▼
Enums / Constants

