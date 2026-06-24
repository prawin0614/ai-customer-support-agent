# 🤖 AI Customer Support Agent

A production-ready AI-powered refund management system built with Next.js, TypeScript, and Tailwind CSS.

The application automates customer refund decisions using an agent-style workflow that validates refund requests against company policies, provides transparent reasoning logs, and supports manager approval workflows for high-value refunds.

---

# 🌐 Live Demo

https://ai-customer-support-agent-beige.vercel.app/

---

# 🚀 Features

## Customer Portal

- Modern AI customer support chat interface
- Refund request processing using Customer ID
- Instant approval or denial decisions
- Transparent reasoning logs
- Real-time refund status updates

## Admin Portal

- Secure admin login
- Manager approval dashboard
- Review pending refund requests
- Detailed reasoning logs
- Customer information viewer
- Approval and rejection workflow

## Refund Validation Engine

The system validates refund requests using the following rules:

### ✅ Refund Approved When

- Order is within 30 days
- Product is not damaged
- Product is physical
- Refund amount is below ₹10,000

### ❌ Refund Denied When

- Refund window expired
- Product is damaged
- Product is digital

### ⏳ Manager Approval Required

- Refund amount exceeds ₹10,000

---

# 🧠 Agent Workflow

The refund agent executes a sequence of validation tools:

1. getCustomer()
2. getRefundPolicy()
3. checkRefundWindow()
4. checkDamagedProduct()
5. checkDigitalProduct()
6. checkManagerApproval()

Every step generates reasoning logs that are visible to both customers and administrators.

---

# 📋 Demo Credentials

## Admin Login

Username:

```text
admin
```

PIN:

```text
1234
```

---

# 📊 Demo Scenarios

## Customer ID 1

Result:

```text
APPROVED
```

Reason:

- Valid refund window
- Physical product
- Not damaged
- Below approval threshold

---

## Customer ID 4

Result:

```text
DENIED
```

Reason:

- Digital product

---

## Customer ID 7

Result:

```text
DENIED
```

Reason:

- Damaged product

---

## Customer ID 10

Result:

```text
DENIED
```

Reason:

- Refund window expired

---

## Customer ID 14

Result:

```text
PENDING_MANAGER_APPROVAL
```

Reason:

- Refund amount exceeds ₹10,000

---

# 🏗️ Tech Stack

### Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js API Routes
- TypeScript

### Deployment

- Vercel

### Architecture

- Agent-based workflow
- Tool execution pipeline
- Clean architecture
- Reusable components

---

# 📁 Project Structure

```text
app/
├── page.tsx
├── chat/
├── admin/
│   ├── login/
│   └── approve/
├── api/
│   └── refund/
├── data/
│   ├── customers.json
│   └── refundPolicy.txt

components/
├── ui/
├── Navbar.tsx

context/
├── AuthContext.tsx

lib/
├── agent.ts

types/
├── index.ts
```

---

# 🔄 Refund Decision Flow

```text
Customer Request
       │
       ▼
Refund Agent
       │
       ▼
Customer Validation
       │
       ▼
Policy Validation
       │
       ▼
Refund Decision
       │
 ┌─────┼─────┐
 ▼     ▼     ▼

APPROVED
DENIED
PENDING_MANAGER_APPROVAL
```

---

# 🧪 Running Locally

## Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production Build

```bash
npm run build
npm run start
```

---

# 📸 Application Modules

### Landing Page

- Modern responsive UI
- Product overview
- Quick navigation

### Customer Chat

- Refund request interface
- AI-style interaction
- Decision reasoning logs

### Admin Dashboard

- Secure login
- Approval workflow
- Audit trail viewer

---

# 🎯 Assignment Requirements Covered

✅ Mock CRM Database (15 Customers)

✅ Refund Policy Document

✅ Agent-Based Validation Workflow

✅ Customer Chat Interface

✅ Admin Dashboard

✅ Real-Time Reasoning Logs

✅ Manager Approval System

✅ Responsive UI/UX

✅ TypeScript

✅ Next.js App Router

✅ REST API

✅ Vercel Deployment

---

# 📈 Future Enhancements

- OpenAI Integration
- LangGraph Workflow
- Voice Assistant Support
- Database Integration
- Email Notifications
- Multi-Level Approvals
- Analytics Dashboard

---

# 👨‍💻 Developer

Prawin A

Project developed as part of the Jobform Automator Next.js Developer Assignment.

---

# 🔗 Links

Live Demo:

https://ai-customer-support-agent-beige.vercel.app/


Demo Video:

https://drive.google.com/file/d/1jcxv3oT4khx0OEJU0kiP72_p2oCO0xr2/view?usp=drive_link
