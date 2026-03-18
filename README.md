# Sub-Tracker (Backend)

A lightweight **Node.js + Express** backend for managing user accounts, subscriptions, and workflow-triggered email notifications.

This project is built around a simple subscription tracking use case and includes:

- **User authentication** (JWT-based login/registration)
- **Subscription management** (CRUD operations for user subscriptions)
- **Workflow triggers** (Upstash Workflow + QStash integration)
- **Email notifications** (Nodemailer templates for alerts and reminders)
- **MongoDB persistence** (Mongoose models + connection helpers)

## Key Features

- Modular controller/route structure for easy extension
- Middleware for auth validation and error handling
- Config-driven setup via environment variables
- Integration with Upstash for serverless workflow execution

## Getting Started

1. Copy `.env.development.local` to `.env` and configure your secrets (MongoDB URI, JWT secret, email credentials, etc.)
2. Install dependencies:

```bash
npm install
```

3. Run in development:

```bash
npm run dev
```

4. The server will start on the port specified in your environment config (default: `3000`).

---

For more details on the available routes and configuration options, check the code in the `routes/`, `controllers/`, and `config/` directories.
