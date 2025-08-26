Product Requirements Document (PRD)

Product Name: Augment Flow
Version: MVP 1.0
Date: Aug 2025
Owner: Augment Team

1. Overview

Augment Flow is a workflow automation platform (clone of Bhindi.io).
It enables users to type natural prompts and trigger AI-powered “agents” to act on their behalf.

For the MVP:

We will build the full product structure (landing, dashboard, agent directory, workflow UI).

Only 3 agents will actually work:

Gmail Agent (send email)

Google Sheets Agent (add/update rows)

Calculator Agent (basic math)

Everything is powered by Firebase for speed and simplicity.

2. Objectives

Recreate Bhindi.io’s look and flow to show investors we can compete at that level.

Deliver a working demo with real Gmail & Sheets actions.

Make it extensible for future agents.

Ensure branding is consistent with Augment Suite.

3. Target Users

Investors – to showcase a tangible product vision.

Early adopters – to test Gmail/Sheets automation.

Businesses – to imagine scaling workflows with more agents.

4. Scope (MVP Features)
4.1 Landing Page

Clone Bhindi.io style (hero, sections, feature highlights).

Clear CTA: “Launch Flow”.

Consistent Augment branding.

4.2 Dashboard

Sidebar navigation: Agents, Workflows, Settings.

Overview cards for quick actions (e.g., “Send Gmail”, “Update Sheet”).

Agent usage stats (mocked for MVP).

4.3 Flow Interface (Text-to-Action)

Chat-style input box.

Parse user input → route to correct agent.

“Agent working…” loader before result.

Display agent output in chat history.

4.4 Agents

Gmail Agent (Integrated)

Connect Gmail via OAuth (Firebase + Google API).

User types: “Send an email to John: Meeting at 5.”

System sends Gmail draft or direct email.

Response in UI: “✅ Email sent.”

Google Sheets Agent (Integrated)

Connect Sheets via OAuth.

User types: “Add a row to Expenses sheet: Food, 20 USD.”

System updates target sheet.

Response in UI: “✅ Row added.”

Calculator Agent (Integrated)

Basic arithmetic (add, subtract, multiply, divide).

User types: “What is 12 × 7?”

Output: “84.”

4.5 Agent Directory

Full clone of Bhindi’s agent catalog page.

For MVP, only 3 agents will work; others are placeholder cards (future expansion).

4.6 Settings

Manage API connections (Gmail, Sheets).

Firebase auth (Google sign-in).

5. Out of Scope (for MVP)

Background/persistent agents.

50+ integrations.

Multi-step automation workflows.

Agent marketplace/custom agent builder.

6. Success Metrics

Fully cloned product interface that mirrors Bhindi.io.

3 working agents (Gmail, Sheets, Calculator).

Seamless Firebase-based login & integrations.

Demo runs smoothly for investors.

7. Tech Stack

Frontend: Next.js + Tailwind + shadcn/ui.

Backend: Firebase Functions.

Auth & DB: Firebase Auth (Google sign-in), Firestore.

Integrations: Google Workspace APIs (Gmail, Sheets).

8. Future Expansion

Add 20+ real integrations (Slack, Notion, Trello, GitHub).

Multi-agent workflows.

Marketplace for agents.

Background tasks & automation.

✅ Summary:
We’re cloning Bhindi.io’s full platform design but will only implement Gmail, Sheets, and Calculator agents for MVP. Everything will run on Firebase to keep it simple, fast, and scalable.