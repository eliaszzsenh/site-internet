# 🧠 FRONTEND SCOPE & WIDGET ENGINE ARCHITECTURE

**CRITICAL:** This repo is for the MARKETING FRONTEND (`https://crackito.uk`).

## 🏛️ ARCHITECTURE
- **Widget & Preview Engine:** All logic for the chat widget and the 'Magic Preview' feature is handled by a separate Backend repository hosted at `https://widget.crackito.uk`.
- **Local Backend:** This repository may handle its own backend logic for site-specific features (like a local `/admin` for site leads), but it must NOT re-implement widget or preview logic.

## 🛰️ COMMUNICATION PROTOCOL
- **Agent-to-Agent:** I (Opencode) cannot talk directly to the Backend AI agent.
- **Protocol:** If I need a change to the **Preview API** or the **Widget behavior**, I must tell the User: *"Please ask the Backend agent to [do X in the Widget Engine]."*
- **Messenger:** The User is the bridge between the two repo agents.

## 🔗 WIDGET ENGINE ENDPOINTS
- **Base API:** `https://widget.crackito.uk/api/`
- **Preview Creation:** `POST https://widget.crackito.uk/api/demo-preview/create`
- **Auth:** Requires header `X-Demo-API-Key: ilnaj-demo-2024-secure`
