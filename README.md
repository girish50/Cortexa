# ⚡ Cortexa — AI-Powered Industrial Energy Intelligence

**🌐 [Click Here to Test Cortexa Demo!](https://cortexa-ai.vercel.app/)**

---

Cortexa is a real-time dashboard for industrial facilities. It helps factory operators and energy managers monitor machine health, track energy consumption, get AI-generated maintenance alerts, and reduce operational costs — all from one unified interface.

> Built for factories. Designed for operators. Driven by AI.

---

## 🔍 How It Works

Cortexa simulates a live industrial environment with six interconnected modules. Here's exactly what each module does and how they all connect:

### 1. 🔐 Login & Authentication

When you open the app, you land on a login screen. Enter your credentials (or click **"Use Demo Credentials"**) to access the dashboard. Your session is saved in `localStorage` so you stay logged in on refresh. Logging out clears the session.

```
Email    →  admin@cortexa.ai
Password →  cortexa2024
```

---

### 2. 🖥️ Command Center _(Press `1`)_

This is the **home screen** — the first thing operators see when they log in.

- A **Health Score gauge** shows the overall system health as a percentage (e.g., 87%), updated every few seconds to simulate a live feed.
- **KPI Cards** show four key metrics in real time: Critical Alerts, Energy Usage (in MW), Daily Cost (in ₹), and Active Machines.
- A **System Status bar** at the top always shows whether all systems are operational, how many machines are active, and today's running cost and efficiency.
- A **"Pause Live Updates"** button lets operators freeze the dashboard when they need to take notes or review data without numbers changing.
- Scrolling down reveals more cards such as recent system activity and quick-action shortcuts to navigate deeper.

---

### 3. 📊 Analytics Hub _(Press `2`)_

This module is for **data analysts and energy managers** who want to study patterns.

- An interactive **dual-axis line chart** plots Cost (₹) against Energy (kWh) over time — letting you see exactly when energy spikes and what it costs.
- You can switch between **Daily, Weekly, Monthly, and Yearly** views.
- A **Simulation Mode** lets you experiment with different machine configurations and see how your cost and energy curves would change — without affecting real data.
- The chart is built with Recharts and responds to hover, showing exact values at any point in time.

---

### 4. 🚨 Action Center _(Press `3`)_

This is the **alert management hub** — where operators respond to machine issues.

- Alerts are sorted into three severity levels: **Critical** (red), **Warning** (yellow), and **Info** (green).
- Each alert card shows the machine name, what the issue is, when it was detected, and a detailed explanation of the predicted cause.
- Operators can **Mark as Resolved** to remove an alert, or **View Machine** to jump directly to that machine's profile.
- The system supports **browser notifications**, **vibration** (on supported devices), and **sound alerts** — all toggleable from the Alert Settings panel at the top.
- A **"NEW" badge** highlights alerts that just came in and haven't been seen yet.
- The alert list **auto-refreshes every 30 seconds** (can be disabled).

---

### 5. 🔧 Machines _(Press `4`)_

A full inventory of every machine in the facility.

- Each machine is displayed as a card showing its **name, type, health score, status (Online / Maintenance), energy usage, and last service date**.
- Machine status is color-coded: 🟢 Online, 🟡 Maintenance, 🔴 Offline.
- You can **search** machines by name or type, and **filter** by status (All / Online / Maintenance).
- Clicking any machine card opens its **Digital Twin Profile** — a detailed view with:
  - A large health gauge
  - Full specifications (model, serial number, location)
  - A live simulated sensor readings panel (vibration, temperature, pressure)
  - A heartbeat-style activity chart
  - Maintenance history and AI-generated prediction for next failure
- A **Fleet Overview** at the bottom summarizes total machines, online count, machines in maintenance, and average fleet health score.

---

### 6. 🤖 AI Assistant _(Press `5`)_

A conversational AI interface for operators to ask questions about their facility.

- Type any question (e.g., _"Check machine health"_, _"Show energy trends"_, _"What's the failure prediction?"_) and the AI responds with contextual, structured answers.
- The assistant performs **keyword analysis on every message**. If your message contains critical words like _"failure"_, _"overheating"_, _"bearing"_, or _"emergency"_ — it automatically triggers a **critical alert response** with immediate action recommendations.
- **Quick Action buttons** at the top let you ask common questions in one click: Energy Status, Critical Alerts, AI Predictions, Optimization Tips.
- After critical responses, the AI icon **pulses red** and the mood changes to "alert" for 8 seconds.
- Supports **browser push notifications** when a critical condition is detected in your message (requires permission).

---

### 7. 👥 My Team _(Press `6`)_

A gamified team performance tracker for the operations team.

- Shows the **total monthly impact** — combined energy savings and cost reductions achieved by the team.
- Four stat cards display: **Energy Saved (kWh)**, **Alerts Resolved**, **System Uptime**, and **Efficiency Score**.
- A **Team Leaderboard** ranks team members by their contribution score.
- An **Achievements section** shows unlocked badges (e.g., Energy Champion, Alert Responder) that motivate team engagement.

---

## 🔗 How the Modules Connect

```
Login ──► Command Center (overview)
               │
               ├──► Action Center (when alerts need attention)
               │         └──► Machines (to view the affected machine)
               │
               ├──► Analytics Hub (to investigate energy patterns)
               │
               ├──► AI Assistant (to get AI guidance on any issue)
               │
               └──► My Team (to track team performance)
```

Every screen shares the same **top header** (shows live time, connection status, notification count) and the same **system status bar** (shows active machines, daily cost, efficiency %). The hamburger menu opens a **navigation drawer** to switch between any screen instantly.

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/your-username/cortexa.git
cd cortexa

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Start the development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Available Scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start local dev server at localhost:3000 |
| `npm run build` | Build optimized production bundle        |
| `npm run start` | Run the production build locally         |
| `npm run lint`  | Check for lint errors                    |

---

## 🛠️ Tech Stack

| Technology            | Role                                  |
| --------------------- | ------------------------------------- |
| **Next.js 14**        | App framework (App Router)            |
| **TypeScript 5**      | Type safety across the codebase       |
| **Tailwind CSS v4**   | Utility-first styling                 |
| **Recharts**          | Chart rendering (line charts, gauges) |
| **Radix UI / shadcn** | Accessible, unstyled component base   |
| **Lucide React**      | Icon system                           |

---

## ⌨️ Keyboard Shortcuts

| Key | Screen         |
| --- | -------------- |
| `1` | Command Center |
| `2` | Analytics Hub  |
| `3` | Action Center  |
| `4` | Machines       |
| `5` | AI Assistant   |
| `6` | My Team        |

---

## 📄 License

Distributed under the **BSD 3-Clause License** — see [`LICENSE`](./LICENSE) for details.

---

<div align="center">
<strong>© 2024 P Girish Varma · Built for smarter industrial operations</strong>
</div>
